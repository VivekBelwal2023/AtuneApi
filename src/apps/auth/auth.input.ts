import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType()
export class SignInInput {
  @Field()
  name: string;

  @Field()
  password: string;
}
