import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@db';
import { AuthService } from '../../service';
import { LoginRequestBody } from './login.request-body';
import { LoginResponse } from './login.response';

@Injectable()
export class LoginHandler {
  // private readonly logger = new MyLogger(RegisterHandler.name);
  constructor(
    private readonly dbContext: PrismaService,
    private readonly authService: AuthService,
  ) {}

  public async login(body: LoginRequestBody): Promise<LoginResponse> {
    const { username, password } = body;

    const user = await this.dbContext.user.findFirst({
      where: {
        username,
      },
      select: {
        passwordHash: true,
        id: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Your username or password is incorrect!');
    }

    const isCorrectPassword = await this.authService.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('Your username or password is incorrect!');
    }

    const accessToken = this.authService.generateAccessToken({
      userId: user.id,
    });
    const refreshToken = this.authService.generateRefreshToken({
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
