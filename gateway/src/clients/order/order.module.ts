import { Global, Module } from "@nestjs/common";
import { OrderService } from "./order.service";

@Global()
@Module({
    exports: [OrderService],
    providers: [OrderService]
})
export class OrderModule {}