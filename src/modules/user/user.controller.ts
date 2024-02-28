import { Controller, Get } from '@nestjs/common'

import { AuthService } from '../auth/auth.service'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  async getUsers() {
    return []
  }
}
