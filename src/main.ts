// @file: src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { XPoweredByMiddleware } from '@/src/common/middleware/x-powered-by.middleware';
import { env } from '@/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env('PORT', 4004);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(env('SWAGGER_TITLE', 'NestJS Prisma API'))
    .setDescription(env('SWAGGER_DESC', 'The NestJS Prisma API description'))
    .setVersion(env('SWAGGER_VERSION', '1.0'))
    .setTermsOfService(env('SWAGGER_TOSLINK', '#'))
    .setContact(
      env('SWAGGER_API_EMAIL_TEXT', ''),
      '',
      env('SWAGGER_API_EMAIL_EMAIL', ''),
    )
    .setLicense(
      env('SWAGGER_LICENSE_TEXT', 'Apache 2.0'),
      env(
        'SWAGGER_LICENSE_LINK',
        'http://www.apache.org/licenses/LICENSE-2.0.html',
      ),
    )
    .addServer(
      env('SWAGGER_SERVER_PROD', `http://localhost:${port}`),
      'Production',
    )
    .addServer(
      env('SWAGGER_SERVER_SANDBOX', `http://localhost:${port}`),
      'Sandbox',
    )
    .addServer(
      env('SWAGGER_SERVER_LOCAL', `http://localhost:${port}`),
      'Localhost',
    )
    .addBearerAuth()
    .addTag('Auth', 'Authentication management and account recovery.', {
      description: 'Documentation',
      url: 'https://mydocumentation.com/auth',
    })
    .addTag(
      'Users',
      'User management, including creation, update, and removal.',
      { description: 'Documentation', url: 'https://mydocumentation.com/user' },
    )
    .addTag('Files', 'File management, including uploading and downloading.', {
      description: 'Documentation',
      url: 'https://mydocumentation.com/file',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(env('SWAGGER_URL_DOCS', 'docs'), app, document, {
    customCss: `
      .swagger-ui .topbar { background-color: #333; }
      .swagger-ui .topbar img { content: url(${env('SWAGGER_FAVICON', 'favicon.png')}); }`,
    customSiteTitle: env('SWAGGER_SITE_TITLE', 'Swagger UI'),
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: -1,
      docExpansion: 'none',
    },
  });

  // Settings CORS
  // app.enableCors({
  //   origin: ['https://example.com', 'https://another-domain.com'],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });
  app.use(new XPoweredByMiddleware().use);

  console.log(`http://localhost:${port}`);

  await app.listen(port);
}
bootstrap();
