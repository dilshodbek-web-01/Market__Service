import { Controller, HttpCode, HttpStatus, Get, Query, Post, Body, Delete, Param,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiHeaders, ApiQuery, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { OrderService } from '@clients'
import { OrderCreateRequestDto, OrderDeleteRequestDto, OrderGetAllResponseDto, OrderGetOneRequestDto, OrderGetOneResponseDto, OrderUpdateRequestBodyDto, OrderUpdateRequestIdDto} from './dtos';
import type { OrderGetAllRequest } from '@clients'

@ApiTags('Order')
@ApiHeaders([
  {
    name: 'Authorization',
    example: 'Bearer token...',
    required: false,
  },
])
@Controller({
  path: 'order-service',
  version: '1',
})
export class OrderController {
  readonly #_service: OrderService;

  constructor(service: OrderService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  @ApiQuery({ name: 'pageOffset', example: 1, required: false })
  @ApiQuery({ name: 'pageLimit', example: 10, required: false })
  @ApiOkResponse({ type: OrderGetAllResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getAllOrders(
    @Query() query: OrderGetAllRequest,
  ): Promise<OrderGetAllResponseDto> {
    return this.#_service.getAllOrders(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiQuery({ name: 'pageOffset', example: 1, required: false })
  @ApiQuery({ name: 'pageLimit', example: 10, required: false })
  @ApiOkResponse({ type: OrderGetOneResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getOneOrder(
    @Param() param: OrderGetOneRequestDto,
  ): Promise<OrderGetOneResponseDto> {
    return this.#_service.getOneOrder(param);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('create')
  createOrder(
    @Body() body: OrderCreateRequestDto,
  ): Promise<null> {    
    return this.#_service.createOrder(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('update/:id')
  updateOrder(
    @Param() id: OrderUpdateRequestIdDto,
    @Body() body: OrderUpdateRequestBodyDto): Promise<null> {      
    return this.#_service.updateOrder({ ...id, ...body })
  }

  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('delete/:id')
  deleteOrder(
    @Param() param: OrderDeleteRequestDto,
  ): Promise<null> {
    return this.#_service.deleteOrder(param);
  }

}
