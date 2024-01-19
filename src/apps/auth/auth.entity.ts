import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInData {
  @Field({ description: 'Jwt Token for authentication' })
  token: string;
}

@ObjectType()
export class ActionResponse {
  @Field(() => Boolean, { description: 'Is Success' })
  success: boolean;

  @Field(() => Boolean, { description: 'Error Message', nullable: true })
  message?: boolean;
}
