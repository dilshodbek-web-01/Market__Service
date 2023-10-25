export declare interface getCategoryWithSubCategoryRequest {
    id: string
}

export declare interface getCategoryWithSubCategoryResponse {
    id: string
    title: string
    sub_category: getSubCategoryRequest[]
}

export declare interface getSubCategoryRequest {
    id: string
    title: string
}