import type { Category } from "@prisma/client";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CategoryService } from "./category.service";
import { PAGE_LIMIT, PAGE_OFFSET } from "./constants";
import { Command } from "./enums";
import { CategoryCreateDto, CategoryDeleteDto, CategoryGetAllDto, CategoryUpdateDto, getCategoryWithSubCategoryRequestDto, getCategoryWithSubCategoryResponseDto } from "./dtos";
import { getCategoryWithSubCategoryResponse } from "./interfaces";

@Controller()
export class CategoryController {
    readonly #_service: CategoryService

    constructor(service: CategoryService) {
        this.#_service = service
    }

    @MessagePattern(Command.CATEGORY_GET_ALL)
    getAllCategories(
        @Payload() payload: CategoryGetAllDto
    ): Promise<Pick<Category, 'id' | 'title'>[]> {
        return this.#_service.getAllCategories({
            pageLimit: payload.pageLimit ?? PAGE_LIMIT,
            pageOffset: payload.pageOffset ?? PAGE_OFFSET
        })
    }

    @MessagePattern(Command.CATEGORY_GET_ONE)
    getCategoryWithSubcategory(@Payload() payload: getCategoryWithSubCategoryRequestDto): Promise<getCategoryWithSubCategoryResponse[]> {
        return this.#_service.getCategoryWithSubcategory(payload)
    }

    @MessagePattern(Command.CATEGORY_CREATE)
    createCategory(@Payload() payload: CategoryCreateDto): Promise<null> {
        return this.#_service.createCategory(payload)
    }

    @MessagePattern(Command.CATEGORY_UPDATE)
    updateCategory(@Payload() payload: CategoryUpdateDto): Promise<null> {        
        return this.#_service.updateCategory(payload)
    }

    @MessagePattern(Command.CATEGORY_DELETE)
    deleteCategory(@Payload() payload: CategoryDeleteDto): Promise<null> {
        return this.#_service.deleteCategory(payload)
    }

}