import { Transport } from "@nestjs/microservices";

declare interface AppConfigOptions {
  transport: Transport
  options: {
    host: string;
    port: number;
  }
}

export const appConfig: AppConfigOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.APP_HOST ?? '0.0.0.0',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 7002,
  }
};
