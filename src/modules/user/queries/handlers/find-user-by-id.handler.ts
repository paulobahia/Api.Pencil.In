import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '../implements/find-user-by-id.query';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../interfaces/user-repository.interface';
import { UserViewModel } from '../../viewmodels/user.viewmodel';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery, UserViewModel> {
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute({ id }: FindUserByIdQuery): Promise<UserViewModel> {

    const user = await this.userRepository.findById(id);

    return new UserViewModel(user)
  }
}
