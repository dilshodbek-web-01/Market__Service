export declare interface OrderGetAllRequest {
    pageOffset?: number
    pageLimit?: number
}

export declare interface OrderGetAllResponse {
    id: string
    productId: string
    token: string
}