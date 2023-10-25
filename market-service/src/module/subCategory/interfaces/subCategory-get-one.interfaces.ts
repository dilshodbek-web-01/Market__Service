export declare interface getSubCategoryWithProductsRequest {
    id: string
}

export declare interface getSubCategoryWithProductsResponse {
    id: string
    title: string
    product: getProducts[]
}

export declare interface getProducts {
    id: string
    title: string
    price: number
    image: string
    status: string
}