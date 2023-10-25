import type { TcpOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common';
import { App } from './app';
import { appConfig } from '@config';
import { AllExceptionsFilter } from '@filters';
 
setImmediate(async(): Promise<void> => {
  const app = await NestFactory.createMicroservice<TcpOptions>(App, {
    transport: Transport.TCP,
    options: appConfig.options
  });

  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen();
})
