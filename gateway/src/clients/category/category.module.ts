import { Global, Module } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Global()
@Module({
    exports: [CategoryService],
    providers: [CategoryService]
})
export class CategoryModule {}