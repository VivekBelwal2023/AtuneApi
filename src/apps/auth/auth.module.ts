import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'Jwt Secret', // TODO: use env
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthResolver, AuthService],
})
export class AuthModule {}
