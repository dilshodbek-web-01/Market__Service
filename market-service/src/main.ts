import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { App } from './app';
import { appConfig } from '@config';
import { ExceptionFilter } from 'filters';

setImmediate(async(): Promise<void> => {
  const app = await NestFactory.createMicroservice<TcpOptions>(App, {
    transport: Transport.TCP,
    options: appConfig.options
  });

  app.useGlobalFilters(new ExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  )

  await app.listen();
})