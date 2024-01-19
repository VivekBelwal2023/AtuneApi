import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './auth.input';
import { ActionResponse, SignInData } from './auth.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { User } from '../user/user.entity';

@Resolver(SignInData)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ActionResponse)
  async signUp(@Args('input') input: SignUpInput) {
    try {
      await this.authService.signUp(input);
      return { success: true };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: err?.message,
      };
    }
  }

  @Mutation(() => SignInData)
  signIn(@Args('input') input: SignInInput) {
    return this.authService.signIn(input);
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  getProfile(@Context('user') user: User) {
    return { name: user.name };
  }
}
