import { Controller, Get, Query } from '@nestjs/common'

import { HTTPDecorators } from '~/common/decorator/http.decorator.js'
import { ApiName } from '~/common/decorator/openapi.decorator.js'
import { BizException } from '~/common/exceptions/business.excpetion.js'
import { ErrorCodeEnum } from '~/constants/error-code.constant.js'
import { PagerDto } from '~/shared/dto/pager.dto.js'

import { PostService } from './post.service.js'

@Controller('posts')
@ApiName
export class PostController {
  constructor(private readonly service: PostService) {}

  @HTTPDecorators.Paginator
  @Get('/')
  async gets(@Query() query: PagerDto) {
    const { page, select, size } = query
    return this.service.model.paginate(
      {},
      {
        page,
        limit: size,
        select,
        lean: true,
      },
    )
  }

  @Get('/*')
  async notFound() {
    throw new BizException(ErrorCodeEnum.PostNotFoundError)
  }
}
