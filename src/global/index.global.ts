/* eslint-disable import/order */
import { mkdirSync } from 'fs'

import { Logger } from '@nestjs/common'

import { DATA_DIR, LOG_DIR } from '~/constants/path.constant.js'

import { consola, registerStdLogger } from './consola.global.js'

import './dayjs.global.js'

import { isDev } from './env.global.js'

// 建立目录
function mkdirs() {
  mkdirSync(DATA_DIR, { recursive: true })
  Logger.log(chalk.blue(`Data dir is make up: ${DATA_DIR}`))

  mkdirSync(LOG_DIR, { recursive: true })
  Logger.log(chalk.blue(`Log dir is make up: ${LOG_DIR}`))
}

function registerGlobal() {
  $.verbose = isDev
  Object.assign(globalThis, {
    isDev,
    consola,
  })
  console.debug = (...rest) => {
    if (isDev) {
      consola.log.call(console, ...rest)
    }
  }
}

export async function register() {
  await import('zx/globals')
  mkdirs()
  registerStdLogger()

  registerGlobal()
}
