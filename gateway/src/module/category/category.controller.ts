import { Controller, HttpCode, HttpStatus, Get, Query, Param, Post, Body, Delete, 
  Put,
} from '@nestjs/common';
import { ApiTags, ApiHeaders, ApiQuery, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiParam,
} from '@nestjs/swagger';
import { CategoryService } from '@clients'
import { CategoryCreateRequestDto, CategoryDeleteResponseDto, CategoryGetAllResponseDto, CategoryUpdateRequestBodyDto, CategoryUpdateRequestIdDto, getCategoryWithSubCategoryRequestDto, getCategoryWithSubCategoryResponseDto, } from './dtos';
import type { CategoryGetAllRequest, CategoryGetAllResponse } from '@clients';

@ApiTags('Category')
@ApiHeaders([
  {
    name: 'Authorization',
    example: 'Bearer token...',
    required: false,
  },
])
@Controller({
  path: 'category-service',
  version: '1',
})
export class CategoryController {
  readonly #_service: CategoryService;

  constructor(service: CategoryService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  @ApiQuery({ name: 'pageOffset', example: 1, required: false })
  @ApiQuery({ name: 'pageLimit', example: 10, required: false })
  @ApiOkResponse({ type: CategoryGetAllResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getAllCategories(
    @Query() query: CategoryGetAllRequest,
  ): Promise<CategoryGetAllResponse> {
    return this.#_service.getAllCategories(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiParam({
    name: 'id',
    example: 'c8ad4bfb-4231-478a-a368-29fd28aa519a',
    required: true
  })
  @ApiOkResponse({ type: getCategoryWithSubCategoryResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getCategoryWithSubCategory(
    @Param() param: getCategoryWithSubCategoryRequestDto,
  ): Promise<getCategoryWithSubCategoryResponseDto> {
    return this.#_service.getCategoryWithSubCategory(param);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('create')
  createCategory(
    @Body() body: CategoryCreateRequestDto,
  ): Promise<null> {
    return this.#_service.createCategory(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('update/:id')
  updateCategory(
    @Param() id: CategoryUpdateRequestIdDto,
    @Body() body: CategoryUpdateRequestBodyDto): Promise<null> {
    return this.#_service.updateCategory({ ...id, ...body })
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('delete/:id')
  deleteCategory(
    @Param() query: CategoryDeleteResponseDto,
  ): Promise<null> {
    return this.#_service.deleteCategory(query);
  }

}
