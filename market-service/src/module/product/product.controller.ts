import type { Product } from "@prisma/client";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductService } from "./product.service";
import { ProductCommand } from "./enums";
import { PRODUCT_PAGE_LIMIT, PRODUCT_PAGE_OFFSET } from "./constants";
import { ProductCreateDto, ProductDeleteDto, ProductGetAllDto, ProductGetOneDto, ProductUpdateDto } from "./dtos";

@Controller()
export class ProductController {
    readonly #_service: ProductService

    constructor(service: ProductService) {
        this.#_service = service
    }

    @MessagePattern(ProductCommand.PRODUCT_GET_ALL)
    getAllProducts(
        @Payload() payload: ProductGetAllDto
    ): Promise<Omit<Product, 'createdAt' | 'updatedAt' | 'deletedAt'>[]> {
        return this.#_service.getAllProducts({
            pageLimit: payload.pageLimit ?? PRODUCT_PAGE_LIMIT,
            pageOffset: payload.pageOffset ?? PRODUCT_PAGE_OFFSET
        })
    }

    @MessagePattern(ProductCommand.PRODUCT_GET_ONE)
    getOneProduct(@Payload() payload: ProductGetOneDto): Promise<Product> {
        return this.#_service.getOneProduct(payload)
    }

    @MessagePattern(ProductCommand.PRODUCT_CREATE)
    createProduct(@Payload() payload: ProductCreateDto): Promise<null> {
        return this.#_service.createProduct(payload)
    }

    @MessagePattern(ProductCommand.PRODUCT_UPDATE)
    updateProduct(@Payload() payload: ProductUpdateDto): Promise<null> {        
        return this.#_service.updateProduct(payload)
    }

    @MessagePattern(ProductCommand.PRODUCT_DELETE)
    deleteProduct(@Payload() payload: ProductDeleteDto): Promise<null> {
        return this.#_service.deleteProduct(payload)
    }

}