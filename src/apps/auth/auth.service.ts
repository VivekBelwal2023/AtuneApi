import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInInput, SignUpInput } from './auth.input';
import { JwtService } from '@nestjs/jwt';
import { SignInData } from './auth.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: SignUpInput) {
    const { password } = input;
    const salt = genSaltSync(10);
    const passwordHash = hashSync(password, salt);
    await this.userService.create({ ...input, password: passwordHash });
  }

  async signIn(input: SignInInput): Promise<SignInData> {
    const { name, password: pass } = input;
    const user = await this.userService.findOne(name);
    if (!compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { _id: user._id, name: user.name };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
