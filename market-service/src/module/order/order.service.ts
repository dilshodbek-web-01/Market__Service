import type { Order } from "@prisma/client";    
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma";
import { verify } from "@helpers";
import type { OrderCreateRequest, OrderDeleteRequest, OrderGetAllRequest, OrderGetOneRequest, OrderUpdateRequest } from "./interfaces";

@Injectable()
export class OrderService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async getAllOrders(payload: OrderGetAllRequest): Promise<Pick<Order, 'id' | 'productId' | 'token'>[]> {
        const allOrders = await this.#_prisma.order.findMany({
            take: payload.pageLimit,
            skip: (payload.pageOffset - 1) * payload.pageLimit,
            select: {
                id: true,
                productId: true,
                token: true 
            },
            where: {
                deletedAt: null
            }
        })

        return allOrders
    }

    async getOneOrder(payload: OrderGetOneRequest): Promise<Pick<Order, 'id' | 'productId' | 'token'>> {
        await this.#_checkOrder(payload.id)

        const order = await this.#_prisma.order.findFirst({
            where: {
                id: payload.id,
                deletedAt: null
            }
        })

        return order
    }

    async createOrder(payload: OrderCreateRequest): Promise<null> {
        
        await this.#_prisma.order.create({
            data: {
                productId: payload.productId,
                token: JSON.parse(verify(payload.token)).id
            }
        })

        return null
    }

    async updateOrder(payload: OrderUpdateRequest): Promise<null> {             
        await this.#_checkOrder(payload.id)

        await this.#_prisma.order.update({
            data: {
                productId: payload.productId,
                token: JSON.parse(verify(payload.token)).id,
            },
            where: {
                id: payload.id,
            }
        })

        return null
    }

    async deleteOrder(payload: OrderDeleteRequest): Promise<null> {
        await this.#_checkOrder(payload.id)

        await this.#_prisma.order.delete({
            where: {
                id: payload.id
            }
        })

        return null
    }

    async #_checkOrder(id: string ): Promise<void> {
        const order = await this.#_prisma.order.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        })

        if (!order) {
            throw new NotFoundException('Order not found !')
        }
    }
}