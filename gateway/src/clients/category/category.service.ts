import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ClientTCP } from "@nestjs/microservices"
import { ConfigService } from "@nestjs/config"
import { firstValueFrom, timeout } from "rxjs"
import { CategoryCommand } from "./enums"
import type { CategoryCreateRequest, CategoryDeleteRequest, CategoryGetAllRequest, CategoryGetAllResponse, CategoryUpdateRequest, getCategoryWithSubCategoryRequest, getCategoryWithSubCategoryResponse } from "./interfaces"

@Injectable()
export class CategoryService {
    readonly #_client: ClientTCP
    readonly #_timeout: number

    constructor(config: ConfigService) {
        this.#_client = new ClientTCP({
            host: config.getOrThrow<string>('category.host'),
            port: config.getOrThrow<number>('category.port'),
        })

        this.#_timeout = config.getOrThrow<number>('category.timeout')
    }

    async getAllCategories(payload: CategoryGetAllRequest): Promise<CategoryGetAllResponse> {
        return this.#_send<CategoryGetAllResponse, CategoryGetAllRequest>(CategoryCommand.CATEGORY_GET_ALL, payload)
    }

    async getCategoryWithSubCategory(payload: getCategoryWithSubCategoryRequest): Promise<getCategoryWithSubCategoryResponse> {
        return this.#_send<getCategoryWithSubCategoryResponse, getCategoryWithSubCategoryRequest>(CategoryCommand.CATEGORY_GET_ONE, payload)
    }

    async createCategory(payload: CategoryCreateRequest): 
    Promise<null> {
        return this.#_send<null, CategoryCreateRequest>(CategoryCommand.CATEGORY_CREATE, payload)
    }

    async updateCategory(payload: CategoryUpdateRequest): Promise<null> {             
        return this.#_send<null, CategoryUpdateRequest>(CategoryCommand.CATEGORY_UPDATE, payload)
    }

    async deleteCategory(payload: CategoryDeleteRequest): Promise<null> {
        return this.#_send<null, CategoryDeleteRequest>(CategoryCommand.CATEGORY_DELETE, payload)
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
