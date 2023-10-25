import { Controller, HttpCode, HttpStatus, Get, Query, Post, Body, Delete, Param, 
  Put,
} from '@nestjs/common';
import { ApiTags, ApiHeaders, ApiQuery, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {  ProductService } from '@clients'
import { ProductCreateRequestDto, ProductDeleteRequestDto, ProductGetAllResponseDto, ProductGetOneRequestDto, ProductGetOneResponseDto, ProductUpdateRequestBodyDto, ProductUpdateRequestIdDto, } from './dtos';
import type { ProductGetAllRequest, ProductGetAllResponse, } from '@clients'

@ApiTags('Product')
@ApiHeaders([
  {
    name: 'Authorization',
    example: 'Bearer token...',
    required: false,
  },
])
@Controller({
  path: 'product-service',
  version: '1',
})
export class ProductController {
  readonly #_service: ProductService;

  constructor(service: ProductService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  @ApiQuery({ name: 'pageOffset', example: 1, required: false })
  @ApiQuery({ name: 'pageLimit', example: 10, required: false })
  @ApiOkResponse({ type: ProductGetAllResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getAllProducts(
    @Query() query: ProductGetAllRequest,
  ): Promise<ProductGetAllResponse> {
    return this.#_service.getAllProducts(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiQuery({ name: 'pageOffset', example: 1, required: false })
  @ApiQuery({ name: 'pageLimit', example: 10, required: false })
  @ApiOkResponse({ type: ProductGetOneResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getOneProduct(
    @Param() param: ProductGetOneRequestDto,
  ) {
    return this.#_service.getOneProduct(param);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('create')
  createProduct(
    @Body() body: ProductCreateRequestDto,
  ): Promise<null> {
    return this.#_service.createProduct(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('update/:id')
  updateProduct(
    @Param() id: ProductUpdateRequestIdDto,
    @Body() body: ProductUpdateRequestBodyDto): Promise<null> {
    return this.#_service.updateProduct({ ...id, ...body })
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('delete/:id')
  deleteProduct(
    @Param() query: ProductDeleteRequestDto,
  ): Promise<null> {
    return this.#_service.deleteProduct(query);
  }

}
