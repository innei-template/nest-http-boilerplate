import { Module } from '@nestjs/common'

import { MyLogger } from './logger.service.js'

@Module({ providers: [MyLogger], exports: [MyLogger] })
export class LoggerModule {}
