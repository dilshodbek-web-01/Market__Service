import { Controller, HttpCode, HttpStatus, Get, Query, Post, Body, Delete, Param, 
  Put,
} from '@nestjs/common';
import { ApiTags, ApiHeaders, ApiParam, ApiQuery, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { SubCategoryService } from '@clients'
import { getSubCategoryWithProductsRequestDto, getSubCategoryWithProductsResponseDto, subCategoryCreateRequestDto, subCategoryDeleteResponseDto, subCategoryGetAllResponseDto, subCategoryUpdateRequestBodyDto, subCategoryUpdateRequestIdDto, } from './dtos';
import type { subCategoryGetAllRequest, subCategoryGetAllResponse  } from '@clients';

@ApiTags('SubCategory')
@ApiHeaders([
  {
    name: 'Authorization',
    example: 'Bearer token...',
    required: false,
  },
])
@Controller({
  path: 'subcategory-service',
  version: '1',
})
export class SubCategoryController {
  readonly #_service: SubCategoryService;

  constructor(service: SubCategoryService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  @ApiQuery({ name: 'pageOffset', example: 1, required: false })
  @ApiQuery({ name: 'pageLimit', example: 10, required: false })
  @ApiOkResponse({ type: subCategoryGetAllResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getAllSubCategories(
    @Query() query: subCategoryGetAllRequest,
  ): Promise<subCategoryGetAllResponse> {
    return this.#_service.getAllSubCategories(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiParam({
    name: 'id',
    example: 'c8ad4bfb-4231-478a-a368-29fd28aa519a',
    required: true
  })
  @ApiOkResponse({ type: getSubCategoryWithProductsResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getSubCategoryWithProducts(
    @Param() param: getSubCategoryWithProductsRequestDto
  ): Promise<getSubCategoryWithProductsResponseDto> {
    return this.#_service.getSubCategoryWithProducts(param)
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('create')
  createSubCategory(
    @Body() body: subCategoryCreateRequestDto,
  ): Promise<null> {
    return this.#_service.createSubCategory(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('update/:id')
  updateSubCategory(
    @Param() id: subCategoryUpdateRequestIdDto,
    @Body() body: subCategoryUpdateRequestBodyDto): Promise<null> {      
    return this.#_service.updateSubCategory({ ...id, ...body })
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('delete/:id')
  deleteSubCategory(
    @Param() query: subCategoryDeleteResponseDto,
  ): Promise<null> {
    return this.#_service.deleteSubCategory(query);
  }

}
