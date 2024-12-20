import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterRequestBody } from './register.request-body';
import { PrismaService } from '@db';
import { AuthService } from '../../service';

@Injectable()
export class RegisterHandler {
  // private readonly logger = new MyLogger(RegisterHandler.name);
  constructor(
    private readonly dbContext: PrismaService,
    private readonly authService: AuthService,
  ) {}

  public async registerAccount(body: RegisterRequestBody) {
    // this.logger.log('sss');
    const { username, password, email } = body;

    const hashPassword = await this.authService.hashPassword(password);

    const existedUser = await this.dbContext.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existedUser) {
      throw new BadRequestException('This username/email already used.');
    }

    const user = await this.dbContext.user.create({
      data: {
        username,
        email,
        passwordHash: hashPassword,
      },
      select: {
        username: true,
      },
    });

    return user;
  }
}
