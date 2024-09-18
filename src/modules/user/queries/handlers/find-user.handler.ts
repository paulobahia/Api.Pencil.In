import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserQuery } from '../implements/find-user.query';
import { Inject } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { UserRepository } from '../../interfaces/user-repository.interface';
import { UserViewModel } from '../../viewmodels/user.viewmodel';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery, UserViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute(): Promise<UserViewModel[]> {
    const users = await this.userRepository.find();

    return users.map(user => new UserViewModel(user))
  }
}
