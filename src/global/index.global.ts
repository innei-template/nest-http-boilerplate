import { mkdirSync } from 'node:fs'

import { Logger } from '@nestjs/common'

import chalk from 'picocolors'

import { DATA_DIR, LOG_DIR } from '~/constants/path.constant'

import { consola } from './consola.global'
import { isDev } from './env.global'
import './dayjs.global'

// 建立目录
function mkdirs() {
  mkdirSync(DATA_DIR, { recursive: true })
  Logger.log(chalk.blue(`Data dir is make up: ${DATA_DIR}`))

  mkdirSync(LOG_DIR, { recursive: true })
  Logger.log(chalk.blue(`Log dir is make up: ${LOG_DIR}`))
}

function registerGlobal() {
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

export function register() {
  mkdirs()
  registerGlobal()
}
