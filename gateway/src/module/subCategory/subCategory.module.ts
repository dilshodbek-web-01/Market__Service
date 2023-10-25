import { Module } from "@nestjs/common";
import { SubCategoryModule } from "@clients";
import { SubCategoryController } from "./subCategory.controller";

@Module({
    imports: [SubCategoryModule],
    controllers: [SubCategoryController]
})
export class SubCategoryGatewayModule {}
