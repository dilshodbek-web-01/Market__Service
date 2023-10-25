import { Module } from "@nestjs/common";
import { PrismaService } from "@prisma";
import { SubCategoryService } from "./subCategory.service";
import { SubCategoryController } from "./subCategory.controller";

@Module({
    providers: [SubCategoryService, PrismaService],
    controllers: [SubCategoryController]
})
export class SubCategoryModule {}