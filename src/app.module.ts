import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from './app.controller.js'
import { AllExceptionsFilter } from './common/filters/any-exception.filter.js'
import { HttpCacheInterceptor } from './common/interceptors/cache.interceptor.js'
import { JSONTransformerInterceptor } from './common/interceptors/json-transformer.interceptor.js'
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js'
import { PostModule } from './modules/post/post.module.js'
import { CacheModule } from './processors/cache/cache.module.js'
import { DatabaseModule } from './processors/database/database.module.js'
import { HelperModule } from './processors/helper/helper.module.js'
import { LoggerModule } from './processors/logger/logger.module.js'

@Module({
  imports: [
    CacheModule,
    DatabaseModule,
    HelperModule,
    LoggerModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor, // 3
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: JSONTransformerInterceptor, // 2
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 1
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
