import { homedir } from 'node:os'
import { join } from 'node:path'

import { isDev } from '../global/env.global'

const appName = 'nest-app-template'
export const HOME = homedir()
export const DATA_DIR = isDev
  ? join(process.cwd(), './tmp')
  : join(HOME, `.${appName}`)

export const LOG_DIR = join(DATA_DIR, 'log')
