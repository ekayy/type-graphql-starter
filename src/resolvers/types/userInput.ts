import { InputType, Field } from 'type-graphql';
import User from '../../entity/User';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  age?: number;
}

@InputType()
export class AddUserInput implements Partial<User> {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  age: number;
}
