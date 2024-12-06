import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
/**
 * 对响应体进行 JSON 标准的转换
 * @author Innei
 */
import { isArrayLike, isObjectLike } from 'es-toolkit/compat'

import { map, Observable } from 'rxjs'
import snakecaseKeys from 'snakecase-keys'

import { RESPONSE_PASSTHROUGH_METADATA } from '~/constants/system.constant'

@Injectable()
export class JSONTransformerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler()
    // 跳过 bypass 装饰的请求
    const bypass = this.reflector.get<boolean>(
      RESPONSE_PASSTHROUGH_METADATA,
      handler,
    )
    if (bypass) {
      return next.handle()
    }
    const http = context.switchToHttp()

    if (!http.getRequest()) {
      return next.handle()
    }

    return next.handle().pipe(
      map((data) => {
        return this.serialize(data)
      }),
    )
  }

  private serialize(obj: any) {
    if (!isObjectLike(obj)) {
      return obj
    }

    if (isArrayLike(obj)) {
      obj = Array.from(obj).map((i) => {
        return this.serialize(i)
      })
    } else {
      let _obj = obj as any
      // if is Object
      if (_obj.toJSON || _obj.toObject) {
        _obj = _obj.toJSON?.() ?? _obj.toObject?.()
      }

      Reflect.deleteProperty(_obj, '__v')

      const keys = Object.keys(_obj)
      for (const key of keys) {
        const _val = _obj[key]
        // first
        if (!isObjectLike(_val)) {
          continue
        }

        const val = _val as any
        if (val.toJSON) {
          _obj[key] = val.toJSON()
          // second
          if (!isObjectLike(_obj[key])) {
            continue
          }
          Reflect.deleteProperty(_obj[key], '__v')
        }
        _obj[key] = this.serialize(_obj[key])
      }
      _obj = snakecaseKeys(_obj)
    }
    return obj
  }
}
