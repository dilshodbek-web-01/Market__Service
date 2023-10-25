import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "@prisma";
import { CategoryCreateRequest, CategoryDeleteResponse, CategoryGetAllRequest, CategoryUpdateRequest, getCategoryWithSubCategoryRequest, getCategoryWithSubCategoryResponse } from "./interfaces";

@Injectable()
export class CategoryService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async getAllCategories(payload: CategoryGetAllRequest): Promise<Pick<Category, 'id' | 'title'>[]> {
        const allCategories = await this.#_prisma.category.findMany({
            take: payload.pageLimit,
            skip: (payload.pageOffset - 1) * payload.pageLimit,
            select: {
                id: true,
                title: true
            },
            where: {
                deletedAt: null
            }
        })

        return allCategories
    }

    async getCategoryWithSubcategory(payload: getCategoryWithSubCategoryRequest): Promise<getCategoryWithSubCategoryResponse[]> {
        const categoryWithSubCategory = await this.#_prisma.category.findMany({
            select: {
                id: true,
                title: true,
                sub_category: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
            where: {
                id: payload.id,
                deletedAt: null
            }
        })

        return categoryWithSubCategory
    }

    async createCategory(payload: CategoryCreateRequest): Promise<null> {
        await this.#_checkExistingCategory({ title: payload.title })

        await this.#_prisma.category.create({
            data: {
                title: payload.title
            }
        })

        return null
    }

    async updateCategory(payload: CategoryUpdateRequest): Promise<null> {             
        await this.#_checkCategory(payload.id)

        await this.#_prisma.category.update({
            data: {
                title: payload.title
            },
            where: {
                id: payload.id
            }
        })

        return null
    }

    async deleteCategory(payload: CategoryDeleteResponse): Promise<null> {
        await this.#_checkCategory(payload.id)

        const subCategories = await this.#_prisma.subCategory.findMany({
            where: {
                categoryId: payload.id
            }
        })

        subCategories.map(async (subc) => {
            await this.#_prisma.subCategory.update({
                data: {
                    deletedAt: new Date().toISOString()
                },
                where: {
                    id: subc.id
                }
            })

            const products = await this.#_prisma.product.findMany({
                where: {
                    subCategoryId: subc.id
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
        })

        await this.#_prisma.category.update({
            where: {
                id: payload.id
            },
            data: {
                deletedAt: new Date().toISOString()
            }
        })

        return null
    }

    async #_checkExistingCategory(payload: { title: string }): Promise<void> {        
        const category = await this.#_prisma.category.findFirst({
            where: {
                title: payload.title
            },
            select: {
                id: true
            }
        })

        if(category) {
            throw new ConflictException('Category already exists')
        }
    }

    async #_checkCategory(id: string ): Promise<void> {
        const category = await this.#_prisma.category.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        })

        if (!category) {
            throw new NotFoundException('Category not found !')
        }
    }

}