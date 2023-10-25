import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from '@config';
import { CategoryModule, OrderModule, ProductModule, SubCategoryModule } from '@module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true
    }),
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    OrderModule
  ],
})
export class App {}
