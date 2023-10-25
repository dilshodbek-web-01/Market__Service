export declare interface getCategoryWithSubCategoryRequest {
    id: string
}

export declare interface getCategoryWithSubCategoryResponse {
    id: string
    title: string
    sub_category: getSubCategoryResponse[]
}

export declare interface getSubCategoryResponse {
    id: string
    title: string
}