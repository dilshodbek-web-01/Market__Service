import type { Product } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma";
import type { ProductCreateRequest, ProductDeleteRequest, ProductGetAllRequest, ProductGetOneRequest, ProductUpdateRequest } from "./interfaces";

@Injectable()
export class ProductService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async getAllProducts(payload: ProductGetAllRequest): Promise<Omit<Product, 'createdAt' | 'deletedAt' | 'updatedAt'>[]> {
        const products = await this.#_prisma.product.findMany({
            take: payload.pageLimit,
            skip: (payload.pageOffset - 1) * payload.pageLimit,
            select: {
                id: true,
                title: true,
                price: true,
                image: true,
                status: true,
                subCategoryId: true
            },
            where: {
                deletedAt: null
            }
        })

        return products
    }

    async getOneProduct(payload: ProductGetOneRequest): Promise<Product> {        
        await this.#_checkProduct(payload.id)

        let product = await this.#_prisma.product.findFirst({
            where: {
                id: payload.id,
                deletedAt: null
            }
        })
        
        return product
    }

    async createProduct(payload: ProductCreateRequest): Promise<null> {
        await this.#_prisma.product.create({
            data: {
                title: payload.title,
                price: payload.price,
                image: payload.image,
                status: payload.status,
                subCategoryId: payload.subCategoryId
            }
        })

        return null
    }

    async updateProduct(payload: ProductUpdateRequest): Promise<null> {             
        await this.#_checkProduct(payload.id)

        await this.#_prisma.product.update({
            data: {
                title: payload.title,
                price: payload.price,
                image: payload.image,
                status: payload.status,
                subCategoryId: payload.subCategoryId
            },
            where: {
                id: payload.id
            }
        })

        return null
    }

    async deleteProduct(payload: ProductDeleteRequest): Promise<null> {
        await this.#_checkProduct(payload.id)

        const orders = await this.#_prisma.order.findMany({
            where: {
                productId: payload.id
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

        await this.#_prisma.product.update({
            data: {
                deletedAt: new Date().toISOString()
            },
            where: {
                id: payload.id
            }
        })

        return null
    }

    async #_checkProduct(id: string ): Promise<void> {
        const product = await this.#_prisma.product.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        })

        if (!product) {
            throw new NotFoundException('Product not found !')
        }
    }

}