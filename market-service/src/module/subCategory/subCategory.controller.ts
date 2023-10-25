import type { subCategory } from "@prisma/client";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SubCategoryService } from "./subCategory.service";
import { SUB_PAGE_LIMIT, SUB_PAGE_OFFSET } from "./constants";
import { SubCategoryCommand } from "./enums";
import { getSubCategoryWithProductsRequestDto, subCategoryCreateDto, subCategoryDeleteDto, subCategoryGetAllDto, subCategoryUpdateDto } from "./dtos";
import { getSubCategoryWithProductsResponse } from "./interfaces";

@Controller()
export class SubCategoryController {
    readonly #_service: SubCategoryService

    constructor(service: SubCategoryService) {
        this.#_service = service
    }

    @MessagePattern(SubCategoryCommand.SUB_CATEGORY_GET_ALL)
    getAllSubCategories(
        @Payload() payload: subCategoryGetAllDto
    ): Promise<Pick<subCategory, 'id' | 'title'>[]> {
        return this.#_service.getAllSubCategories({
            pageLimit: payload.pageLimit ?? SUB_PAGE_LIMIT,
            pageOffset: payload.pageOffset ?? SUB_PAGE_OFFSET
        })
    }

    @MessagePattern(SubCategoryCommand.SUB_CATEGORY_GET_ONE)
    getSubCategoryWithProducts(
        @Payload() payload: getSubCategoryWithProductsRequestDto
    ): Promise<getSubCategoryWithProductsResponse[]> {
        return this.#_service.getSubCategoryWithProducts(payload)
    }

    @MessagePattern(SubCategoryCommand.SUB_CATEGORY_CREATE)
    createSubCategory(@Payload() payload: subCategoryCreateDto): Promise<null> {
        return this.#_service.createSubCategory(payload)
    }

    @MessagePattern(SubCategoryCommand.SUB_CATEGORY_UPDATE)
    updateSubCategory(@Payload() payload: subCategoryUpdateDto): Promise<null> {   
        return this.#_service.updateSubCategory(payload)
    }

    @MessagePattern(SubCategoryCommand.SUB_CATEGORY_DELETE)
    deleteSubCategory(@Payload() payload: subCategoryDeleteDto): Promise<null> {
        return this.#_service.deleteSubCategory(payload)
    }

}