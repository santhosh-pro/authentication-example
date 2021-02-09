import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { Roles } from './role.enum';
import {RolesAllowed } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('login')
  login() {
    return this.authService.login();
  }

  @Get('auth')
  @ApiBearerAuth()
  @RolesAllowed(Roles.Admin)
  allowAuth() {
   return 'works';
  }
}
