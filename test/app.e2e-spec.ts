import { beforeEach, describe, expect, it } from 'vitest'

import { Test } from '@nestjs/testing'

import { AppController } from '~/app.controller'
import { fastifyApp } from '~/common/adapter/fastify.adapter'
import type { TestingModule } from '@nestjs/testing'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication(fastifyApp)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('/ (GET)', () => {
    return app.inject('/').then((res) => {
      expect(res.statusCode).toBe(200)
    })
  })
})
