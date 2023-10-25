import { Global, Module } from "@nestjs/common";
import { ProductService } from "./product.service";

@Global()
@Module({
    exports: [ProductService],
    providers: [ProductService]
})
export class ProductModule {}