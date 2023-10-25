import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ClientTCP } from "@nestjs/microservices"
import { ConfigService } from "@nestjs/config"
import { firstValueFrom, timeout } from "rxjs"
import { SubCategoryCommand } from "./enums"
import type { getSubCategoryWithProductsRequest, getSubCategoryWithProductsResponse, subCategoryCreateRequest, subCategoryDeleteRequest, subCategoryGetAllRequest, subCategoryGetAllResponse, subCategoryUpdateRequest } from "./interfaces"

@Injectable()
export class SubCategoryService {
    readonly #_client: ClientTCP
    readonly #_timeout: number

    constructor(config: ConfigService) {
        this.#_client = new ClientTCP({
            host: config.getOrThrow<string>('category.host'),
            port: config.getOrThrow<number>('category.port'),
        })

        this.#_timeout = config.getOrThrow<number>('category.timeout')
    }

    async getAllSubCategories(payload: subCategoryGetAllRequest): Promise<subCategoryGetAllResponse> {
        return this.#_send<subCategoryGetAllResponse, subCategoryGetAllRequest>(SubCategoryCommand.SUB_CATEGORY_GET_ALL, payload)
    }

    async getSubCategoryWithProducts(payload: getSubCategoryWithProductsRequest): Promise<getSubCategoryWithProductsResponse> {
        return this.#_send<getSubCategoryWithProductsResponse, getSubCategoryWithProductsRequest>(SubCategoryCommand.SUB_CATEGORY_GET_ONE, payload)
    }

    async createSubCategory(payload: subCategoryCreateRequest): 
    Promise<null> {
        return this.#_send<null, subCategoryCreateRequest>(SubCategoryCommand.SUB_CATEGORY_CREATE, payload)
    }

    async updateSubCategory(payload: subCategoryUpdateRequest): Promise<null> {                     
        return this.#_send<null, subCategoryUpdateRequest>(SubCategoryCommand.SUB_CATEGORY_UPDATE, payload)
    }

    async deleteSubCategory(payload: subCategoryDeleteRequest): Promise<null> {
        return this.#_send<null, subCategoryDeleteRequest>(SubCategoryCommand.SUB_CATEGORY_DELETE, payload)
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
