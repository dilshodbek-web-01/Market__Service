import type { Order } from "@prisma/client";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { OrderService } from "./order.service";
import { OrderCommand } from "./enums";
import { ORDER_PAGE_LIMIT, ORDER_PAGE_OFFSET } from "./constants";
import { OrderCreateRequestDto, OrderDeleteRequestDto, OrderGetAllRequestDto, OrderGetOneRequestDto, OrderUpdateRequestDto } from "./dtos";

@Controller()
export class OrderController {
    readonly #_service: OrderService

    constructor(service: OrderService) {
        this.#_service = service
    }

    @MessagePattern(OrderCommand.ORDER_GET_ALL)
    getAllOrders(
        @Payload() payload: OrderGetAllRequestDto
    ):Promise<Pick<Order, 'id' | 'productId' | 'token'>[]> {
        return this.#_service.getAllOrders({
            pageLimit: payload.pageLimit ?? ORDER_PAGE_LIMIT,
            pageOffset: payload.pageOffset ?? ORDER_PAGE_OFFSET
        })
    }

    @MessagePattern(OrderCommand.ORDER_GET_ONE)
    getOneOrder(@Payload() payload: OrderGetOneRequestDto): Promise<Pick<Order, 'id' | 'productId' | 'token'>> {
        return this.#_service.getOneOrder(payload)
    }

    @MessagePattern(OrderCommand.ORDER_CREATE)
    createOrder(@Payload() payload: OrderCreateRequestDto): Promise<null> {
        return this.#_service.createOrder(payload)
    }

    @MessagePattern(OrderCommand.ORDER_UPDATE)
    updateOrder(@Payload() payload: OrderUpdateRequestDto): Promise<null> {         
        return this.#_service.updateOrder(payload)
    }

    @MessagePattern(OrderCommand.ORDER_DELETE)
    deleteOrder(@Payload() payload: OrderDeleteRequestDto): Promise<null> {
        return this.#_service.deleteOrder(payload)
    }
}