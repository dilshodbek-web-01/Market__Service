import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ClientTCP } from "@nestjs/microservices"
import { ConfigService } from "@nestjs/config"
import { firstValueFrom, timeout } from "rxjs"
import { ProductCommand } from "./enums"
import type { ProductCreateRequest, ProductDeleteRequest, ProductGetAllRequest, ProductGetAllResponse, ProductGetOneRequest, ProductGetOneResponse, ProductUpdateRequest } from "./interfaces"

@Injectable()
export class ProductService {
    readonly #_client: ClientTCP
    readonly #_timeout: number

    constructor(config: ConfigService) {
        this.#_client = new ClientTCP({
            host: config.getOrThrow<string>('category.host'),
            port: config.getOrThrow<number>('category.port'),
        })

        this.#_timeout = config.getOrThrow<number>('category.timeout')
    }

    async getAllProducts(payload: ProductGetAllRequest): Promise<ProductGetAllResponse> {
        return this.#_send<ProductGetAllResponse, ProductGetAllRequest>(ProductCommand.PRODUCT_GET_ALL, payload)
    }

    async getOneProduct(payload: ProductGetOneRequest): Promise<ProductGetOneResponse> {
        return this.#_send<ProductGetOneResponse, ProductGetOneRequest>(ProductCommand.PRODUCT_GET_ONE, payload)
    }

    async createProduct(payload: ProductCreateRequest): Promise<null> {
        return this.#_send<null, ProductCreateRequest>(ProductCommand.PRODUCT_CREATE, payload)
    }

    async updateProduct(payload: ProductUpdateRequest): Promise<null> {             
        return this.#_send<null, ProductUpdateRequest>(ProductCommand.PRODUCT_UPDATE, payload)
    }

    async deleteProduct(payload: ProductDeleteRequest): Promise<null> {
        return this.#_send<null, ProductDeleteRequest>(ProductCommand.PRODUCT_DELETE, payload)
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
