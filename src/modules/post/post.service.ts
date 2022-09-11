import { Injectable } from '@nestjs/common'

import { InjectModel } from '~/transformers/model.transformer.js'

import { PostModel } from './post.model.js'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) public readonly model: MongooseModel<PostModel>,
  ) {}
}
