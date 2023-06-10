import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from './config/config.service';

export function setupSwagger(app: INestApplication) {

  const config = new ConfigService(`${process.env.NODE_ENV || ''}.env`);

  const options = new DocumentBuilder()
    .setTitle('Nest API Demo')
    .setDescription('Nest API Demo POC')
    .setVersion('1.0')
    // .addServer(config.get('ENV'))
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document, {
    customSiteTitle: 'Sample',
    swaggerOptions: {
      docExpansion: 'none',
      operationSorter: 'alpha',
      tagSorter: 'alpha',
    },
  });
}
