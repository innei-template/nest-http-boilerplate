import { Controller } from '@nestjs/common'

import { AuthService } from '../auth/auth.service.js'
import { UserService } from './user.service.js'

@Controller(['master', 'user'])
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
}
