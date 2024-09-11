// @file: src/core/dynamic-module-loader.ts

import { DynamicModule, Module, Type } from '@nestjs/common';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * A dynamic module loader for NestJS that loads modules from a specified directory.
 */
@Module({})
export class DynamicModuleLoader {
  /**
   * Creates a dynamic module that imports all modules found in the 'api' directory.
   *
   * @returns {DynamicModule} The dynamic module containing the loaded modules.
   */
  static forRoot(): DynamicModule {
    const modules = this.loadModules();
    return {
      module: DynamicModuleLoader,
      imports: modules,
    };
  }

  /**
   * Loads all modules from the 'api' directory.
   *
   * @returns {Type<any>[]} An array of module classes loaded from the directory.
   */
  private static loadModules(): Type<any>[] {
    const modulesDir = join(__dirname, '../api');
    // console.log('modulesDir::', modulesDir); // Prints the directory of the modules

    // Iterates over each directory inside modulesDir
    const moduleFiles = readdirSync(modulesDir).flatMap((dir) => {
      const fullDirPath = join(modulesDir, dir);
      // console.log('Checking directory::', fullDirPath); // Checks if it is a directory

      // Verifies if it is a directory before attempting to read files within
      if (statSync(fullDirPath).isDirectory()) {
        // Reads files inside the specific directory
        return readdirSync(fullDirPath)
          .filter((file) => {
            // console.log('file::', file); // Prints the name of each found file
            return file.endsWith('.module.js'); // Checks for .module.js files
          })
          .map((file) => {
            const modulePath = join(fullDirPath, file);
            // console.log(`Loading module: ${modulePath}`); // Prints the full path of the module

            // Imports the module and tries to get the module class correctly
            const module = require(modulePath);
            const moduleClass = module.default || Object.values(module)[0]; // Corrects loading to get the class properly

            // Checks if the imported module is a function (class) and not an object
            if (typeof moduleClass !== 'function') {
              throw new Error(
                `Failed to load module: ${modulePath} is not a valid NestJS module.`,
              );
            }

            return moduleClass; // Returns the module class
          })
          .filter(Boolean); // Removes null values
      }
      return [];
    });

    // console.log('moduleFiles::', moduleFiles); // Prints the loaded modules
    return moduleFiles;
  }
}
