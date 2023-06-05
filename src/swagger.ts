import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nest API Demo')
    .setDescription('Nest API Demo POC')
    .setVersion('1.0')
    .addServer('/dev')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document, {
    customSiteTitle: 'Sample',
    swaggerOptions: {
      docExpansion: 'none',
      operationSorter: 'alpha',
      tagSorter: 'alpha',
    },
  });
}
