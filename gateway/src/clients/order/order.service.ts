import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ClientTCP } from "@nestjs/microservices"
import { ConfigService } from "@nestjs/config"
import { firstValueFrom, timeout } from "rxjs"
import { OrderCommand } from "./enums"
import type { OrderCreateRequest, OrderDeleteRequest, OrderGetAllRequest, OrderGetAllResponse, OrderGetOneRequest, OrderGetOneResponse, OrderUpdateRequest } from "./interfaces"

@Injectable()
export class OrderService {
    readonly #_client: ClientTCP
    readonly #_timeout: number

    constructor(config: ConfigService) {
        this.#_client = new ClientTCP({
            host: config.getOrThrow<string>('category.host'),
            port: config.getOrThrow<number>('category.port'),
        })

        this.#_timeout = config.getOrThrow<number>('category.timeout')
    }

    async getAllOrders(payload: OrderGetAllRequest): Promise<OrderGetAllResponse> {
        return this.#_send<OrderGetAllResponse, OrderGetAllRequest>(OrderCommand.ORDER_GET_ALL, payload)
    }

    async getOneOrder(payload: OrderGetOneRequest): Promise<OrderGetOneResponse> {
        return this.#_send<OrderGetOneResponse, OrderGetOneRequest>(OrderCommand.ORDER_GET_ONE, payload)
    }

    async createOrder(payload: OrderCreateRequest): Promise<null> {        
        return this.#_send<null, OrderCreateRequest>(OrderCommand.ORDER_CREATE, payload)
    }

    async updateOrder(payload: OrderUpdateRequest): Promise<null> {                    
        return this.#_send<null, OrderUpdateRequest>(OrderCommand.ORDER_UPDATE, payload)
    }

    async deleteOrder(payload: OrderDeleteRequest): Promise<null> {
        return this.#_send<null, OrderDeleteRequest>(OrderCommand.ORDER_DELETE, payload)
    }

    async #_connect(): Promise<void> {
        await this.#_client.connect()
    }

    #_disConnect(): void {
        this.#_client.close()
    }

    async #_send<TResponse, TRequest>(pattern: string, payload: TRequest): Promise<TResponse> {
        try {
            return await firstValueFrom(
                this.#_client.send<TResponse, TRequest>(pattern, payload)
                .pipe(timeout(this.#_timeout))
            )
        } catch(error: unknown) {
            throw new InternalServerErrorException(error)
        }
    }
}
