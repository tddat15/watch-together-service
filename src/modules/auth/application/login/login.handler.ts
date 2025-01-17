import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db';
import { AuthService } from '../../service';
import { LoginRequestBody } from './login.request-body';
import { LoginResponse } from './login.response';
import { $Enums } from '../../../../../prisma/prisma-client';
import TokenType = $Enums.TokenType;

@Injectable()
export class LoginHandler {
  private readonly logger = new Logger(LoginHandler.name);
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

    console.log('user', user);

    if (!user) {
      throw new BadRequestException('Your username or password is incorrect!');
    }

    const userId = user.id;

    const isCorrectPassword = await this.authService.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('Your username or password is incorrect!');
    }

    const accessToken = this.authService.generateAccessToken({
      userId,
    });
    const refreshToken = this.authService.generateRefreshToken({
      userId,
    });

    const tokens = await this.dbContext.token.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    if (tokens.length > 0) {
      await this.dbContext.token.deleteMany({
        where: {
          userId,
        },
      });
    }

    await this.dbContext.token.createMany({
      data: [
        { token: accessToken, tokenType: TokenType.ACCESS_TOKEN },
        { token: refreshToken, tokenType: TokenType.REFRESH_TOKEN },
      ].map((token) => ({
        ...token,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      })),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
