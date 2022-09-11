import { Global, Module, Provider } from '@nestjs/common'

import { HttpService } from './helper.http.service.js'

const providers: Provider<any>[] = [HttpService]

@Module({
  imports: [],
  providers,
  exports: providers,
})
@Global()
export class HelperModule {}
