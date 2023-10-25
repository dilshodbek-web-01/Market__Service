export declare interface ProductGetAllRequest {
  pageOffset?: number
  pageLimit?: number
}

export declare interface ProductGetAllResponse {
  id: string
  title: string
  price: number
  image: string
  status: string
  subCategoryId: string
}
