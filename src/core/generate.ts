// @file: src/core/generate.ts

import { PrismaClient, Prisma } from '@prisma/client';
import fs, { writeFileSync } from 'fs';
import path, { join } from 'path';

// Path to the Prisma schema file
const prismaSchemaPath = path.resolve('prisma', 'schema.prisma');
// Path to the TypeScript file for Prisma model types
const modelsFilePath = path.resolve('src', 'types', 'prisma.ts');
// Path to the directory containing template files
const templatesPath = path.resolve('src', 'core', 'defaults');

// Initialize Prisma Client
const prisma = new PrismaClient();
// List of tables to ignore when generating files
const ignoreTables = ['File', 'Auth', 'User'];

/**
 * Generates CRUD files for each model defined in the Prisma schema.
 * It creates controllers, services, and modules for each model.
 */
async function generateCRUD() {
  // Fetch the list of table names from the database
  const models = await prisma.$queryRaw<Array<{ tablename: string }>>(
    Prisma.sql`SELECT tablename FROM pg_tables WHERE schemaname='public';`,
  );

  // Generate TypeScript interfaces for each model
  const modelsList = models
    .map((a) => a?.tablename)
    .filter(Boolean)
    .filter((tableName) => !tableName.startsWith('_')) as string[];
  generateModelTypes(modelsList);

  // Load template files for controllers, services, and modules
  const controllerTemplate = fs.readFileSync(
    path.join(templatesPath, 'model.controller.ts'),
    'utf-8',
  );
  const serviceTemplate = fs.readFileSync(
    path.join(templatesPath, 'model.service.ts'),
    'utf-8',
  );
  const moduleTemplate = fs.readFileSync(
    path.join(templatesPath, 'model.module.ts'),
    'utf-8',
  );

  // Generate files for each model
  models.forEach(({ tablename }) => {
    if (!ignoreTables?.includes(tablename) && !tablename.startsWith('_')) {
      const ModelName = tablename.charAt(0).toUpperCase() + tablename.slice(1); // Example output: 'User'
      const modelName = tablename.charAt(0).toLowerCase() + tablename.slice(1); // Example output: 'user'

      const apiDir = path.join(__dirname, '../api', modelName);

      // Replacements for the templates
      const replacements = {
        Model: ModelName,
        model: modelName,
        'src/core/defaults': `src/api/${modelName}`,
        '//@ts-ignore\n': '',
      };

      // Generate the content for each file
      const controllerContent = replaceMultiple(
        controllerTemplate,
        replacements,
      );
      const serviceContent = replaceMultiple(serviceTemplate, replacements);
      const moduleContent = replaceMultiple(moduleTemplate, replacements);

      // Define file paths for the generated files
      const modelController = path.join(apiDir, `${modelName}.controller.ts`);
      const modelModule = path.join(apiDir, `${modelName}.module.ts`);
      const modelService = path.join(apiDir, `${modelName}.service.ts`);

      // Create directories if they do not exist
      if (!fs.existsSync(apiDir)) {
        fs.mkdirSync(apiDir, { recursive: true });
      }

      // Write the generated content to files
      writeFileSync(modelController, controllerContent);
      writeFileSync(modelService, serviceContent);
      writeFileSync(modelModule, moduleContent);
    }
  });
}

/**
 * Replaces multiple placeholders in a text with corresponding values.
 *
 * @param text - The text with placeholders.
 * @param replacements - An object with placeholder values.
 * @returns The text with placeholders replaced.
 */
function replaceMultiple(
  text: string,
  replacements: { [key: string]: string },
): string {
  return Object.entries(replacements).reduce((acc, [find, replace]) => {
    const regex = new RegExp(find, 'g'); // Create a global regular expression for the pattern
    return acc.replace(regex, replace);
  }, text);
}

/**
 * Generates TypeScript types based on the Prisma schema models.
 *
 * @param models - The list of model names.
 */
function generateModelTypes(models: string[]) {
  let imports = '';
  imports += `// @file: src/types/prisma.ts\n`;
  imports += `// Automatically generated, do not edit manually please!\n\n`;
  imports += `import { Prisma } from '@prisma/client';\n\n`;

  const types = models
    .map((model) => `export type ${model}Type = Prisma.${model}GetPayload<{}>;`)
    .join('\n');

  const content = `${imports}${types}\n`;

  fs.writeFileSync(modelsFilePath, content, 'utf-8');
  console.log(`Updated ${modelsFilePath}`);
}

/**
 * Generates Data Transfer Objects (DTOs) based on the Prisma schema.
 *
 * @param schema - The Prisma schema content.
 */
function generateDTOsFromSchema(schema: string) {
  const modelPattern = /model\s+(\w+)\s+{([^}]*)}/g;
  let match;

  while ((match = modelPattern.exec(schema)) !== null) {
    const modelName = match[1];
    const fields = match[2];

    const dtoContent = generateDTOContent(modelName, fields);
    const dtoPath = path.join(
      __dirname,
      '../api',
      modelName.toLowerCase(),
      `${modelName}.dto.ts`,
    );

    if (!fs.existsSync(path.dirname(dtoPath))) {
      fs.mkdirSync(path.dirname(dtoPath), { recursive: true });
    }

    writeFileSync(dtoPath, dtoContent);
  }
}

/**
 * Generates the content for a DTO based on the model name and fields.
 *
 * @param modelName - The name of the model.
 * @param fields - The fields of the model.
 * @returns The DTO content as a string.
 */
function generateDTOContent(modelName: string, fields: string): string {
  const fieldLines = fields
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('@'))
    .map((line) => {
      const [field, type] = line.split(' ');
      return `  ${field}: ${type};`;
    })
    .join('\n');

  return (
    `// @file: src/api/${modelName.toLowerCase()}/${modelName}.dto.ts\n` +
    `// Automatically generated, do not edit manually please!\n\n` +
    `export interface ${modelName}DTO {\n` +
    `${fieldLines}\n` +
    `}\n`
  );
}

// Execute the CRUD generation process and handle any errors
generateCRUD()
  .then(() => {
    console.log('Documentation & Types generated');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
