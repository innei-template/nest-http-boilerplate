import { Global, Module } from '@nestjs/common'

import { PostModel } from '~/modules/post/post.model.js'
import { getProviderByTypegooseClass } from '~/transformers/model.transformer.js'

import { UserModel } from '../../modules/user/user.model.js'
import { databaseProvider } from './database.provider.js'
import { DatabaseService } from './database.service.js'

const models = [UserModel, PostModel].map((model) =>
  getProviderByTypegooseClass(model),
)
@Module({
  providers: [DatabaseService, databaseProvider, ...models],
  exports: [DatabaseService, databaseProvider, ...models],
})
@Global()
export class DatabaseModule {}
