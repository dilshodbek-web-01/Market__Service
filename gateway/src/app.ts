import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { categoryConfig, userConfig } from '@config';
import { CategoryGatewayModule, OrderGatewayModule, ProductGatewayModule, SubCategoryGatewayModule, UserGatewayModule } from '@module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [userConfig, categoryConfig],
      isGlobal: true
    }),
    UserGatewayModule,
    CategoryGatewayModule,
    SubCategoryGatewayModule,
    ProductGatewayModule,
    OrderGatewayModule
  ],
})
export class App {}
