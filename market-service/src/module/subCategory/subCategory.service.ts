import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { subCategory } from "@prisma/client";
import { PrismaService } from "@prisma";
import { getSubCategoryWithProductsRequest, getSubCategoryWithProductsResponse, subCategoryCreateRequest, subCategoryDeleteRequest, subCategoryGetAllRequest, subCategoryUpdateRequest } from "./interfaces";


@Injectable()
export class SubCategoryService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async getAllSubCategories(payload: subCategoryGetAllRequest): Promise<Pick<subCategory, 'id' | 'title'>[]> {
        const allSubCategories = await this.#_prisma.subCategory.findMany({
            take: payload.pageLimit,
            skip: (payload.pageOffset - 1) * payload.pageLimit,
            select: {
                id: true,
                title: true,
            },
            where: {
                deletedAt: null
            }
        })

        return allSubCategories
    }

    async getSubCategoryWithProducts(payload: getSubCategoryWithProductsRequest): Promise<getSubCategoryWithProductsResponse[]> {
        await this.#_checkSubCategory(payload.id)        

        const subCategoryWithProducts = await this.#_prisma.subCategory.findMany({
            select: {
                id: true,
                title: true,
                product: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                        image: true,
                        status: true,
                    }
                }
            },
            where: {
                deletedAt: null,
                id: payload.id
            }
        })

        return subCategoryWithProducts
    }

    async createSubCategory(payload: subCategoryCreateRequest): Promise<null> {
        await this.#_checkExistingSubCategory({ title: payload.title })

        await this.#_prisma.subCategory.create({
            data: {
                title: payload.title,
                categoryId: payload.categoryId
            }, 
        })

        return null
    }

    async updateSubCategory(payload: subCategoryUpdateRequest): Promise<null> {     
        await this.#_checkSubCategory(payload.id)        
        
        await this.#_prisma.subCategory.updateMany({
            data: {
                title: payload.title,
                categoryId: payload.categoryId,
            },
            where: {
                id: payload.id
            }
        })

        return null
    }

    async deleteSubCategory(payload: subCategoryDeleteRequest): Promise<null> {
        await this.#_checkSubCategory(payload.id)

        const products = await this.#_prisma.product.findMany({
            where: {
                subCategoryId: payload.id
            }
        })

        products.map(async (prod) => {
            await this.#_prisma.product.update({
                where: {
                    id: prod.id
                },
                data: {
                    deletedAt: new Date().toISOString()
                }
            })

            const orders = await this.#_prisma.order.findMany({
                where: {
                    productId: prod.id
                }
            })

            orders.map(async (orde) => {
                await this.#_prisma.order.update({
                    where: {
                        id: orde.id
                    },
                    data: {
                        deletedAt: new Date().toISOString()
                    }
                })
            }) 
        })

        await this.#_prisma.subCategory.update({
            data: {
                deletedAt: new Date().toISOString(),
            },
            where: {
                id: payload.id
            }
        })

        return null
    }

    async #_checkExistingSubCategory(payload: { title: string }): Promise<void> {        
        const subCategory = await this.#_prisma.subCategory.findFirst({
            where: {
                title: payload.title
            },
            select: {
                id: true
            }
        })

        if(subCategory) {
            throw new ConflictException('SubCategory already exists')
        }
    }

    async #_checkSubCategory(id: string ): Promise<void> {
        const subCategory = await this.#_prisma.subCategory.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        })

        if (!subCategory) {
            throw new NotFoundException('SubCategory not found !')
        }
    }

}