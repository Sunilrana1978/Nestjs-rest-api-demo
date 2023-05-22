// import { NestFactory } from '@nestjs/core';
// import serverlessExpress from '@vendia/serverless-express';
// import { Callback, Context, Handler } from 'aws-lambda';
// import { AppModule } from './app.module';

// let server: Handler;

// function asyncTask () {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve('connected to database'), 1000)
//   })
// }

// async function bootstrap(): Promise<Handler> {
//   const app = await NestFactory.create(AppModule);
//   await app.init();

//   const expressApp = app.getHttpAdapter().getInstance();

//   const asyncValue = await asyncTask()
//   console.log(asyncValue)

//   return serverlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());

//   return server(event, context, callback);
// };

import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

let serverlessExpressInstance: any;

function asyncTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('connected to database'), 1500);
  });
}

async function setup(event: any, context: Context) {
  const asyncValue = await asyncTask();
  console.log(asyncValue);
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  serverlessExpressInstance = serverlessExpress({ app: expressApp });
  return serverlessExpressInstance(event, context);
}

function handler(event: any, context: Context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
}

exports.handler = handler;

// import { APIGatewayProxyHandler } from 'aws-lambda';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Server } from 'http';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as awsServerlessExpress from 'aws-serverless-express';
// import express from 'express';

// let cachedServer: Server;

// const bootstrapServer = async (): Promise<Server> => {
//   const expressApp = express();
//   const adapter = new ExpressAdapter(expressApp);
//   const app = await NestFactory.create(AppModule, adapter);
//   app.enableCors();
//   await app.init();
//   return awsServerlessExpress.createServer(expressApp);
// }

// export const handler: APIGatewayProxyHandler = async (event, context) => {
//   if (!cachedServer) {
//     cachedServer = await bootstrapServer()
//   }
//   return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
//       .promise;
// };
