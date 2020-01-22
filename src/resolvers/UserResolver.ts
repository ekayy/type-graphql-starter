import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import User from '../entity/User';
import { AddUserInput, UpdateUserInput } from './types/userInput';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  user(@Arg('id') id: string) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async addUser(@Arg('data') data: AddUserInput): Promise<User> {
    const user = User.create(data);
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Arg('id') id: string, @Arg('data') data: UpdateUserInput): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error('User not found!');
    Object.assign(user, data);
    await user.save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string): Promise<Boolean> {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error('User not found!');
    await user.remove();
    return true;
  }
}
