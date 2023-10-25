export declare interface getSubCategoryWithProductsRequest {
    id: string
}

export declare interface getSubCategoryWithProductsResponse {
    id: string
    title: string
    product: getProductsResponse[]
}

export declare interface getProductsResponse {
    id: string
    title: string
    price: number
    image: string
    status: string
}