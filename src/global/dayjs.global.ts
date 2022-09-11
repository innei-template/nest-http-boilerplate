import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import localizedFormat from 'dayjs/plugin/localizedFormat.js'

dayjs.locale('zh-cn')
dayjs.extend(localizedFormat)
