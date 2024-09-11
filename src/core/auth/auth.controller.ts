// @file: src/auth/auth.controller.ts

import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );
    return {
      message: 'User created successfully',
      ...result,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in to an existing account' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return {
      message: 'Login successful',
      ...result,
    };
  }

  @Post('reset/password/request')
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiResponse({ status: 200, description: 'Password reset request sent.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    await this.authService.requestPasswordReset(requestPasswordResetDto.email);
    return { message: 'Password reset request sent' };
  }

  @Post('reset/password/:token')
  @ApiOperation({ summary: 'Reset the user password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid or expired reset token.' })
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(token, resetPasswordDto.newPassword);
    return { message: 'Password reset successfully' };
  }
}
