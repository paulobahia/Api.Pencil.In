import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserQuery } from '../implements/find-user.query';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { InjectionToken } from 'src/modules/injection-token';
import { UserRepository } from '../../interfaces/user-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { UserViewModel } from '../../viewmodels/user.viewmodel';

@QueryHandler(FindUserQuery)
export class FindUserHandler
  implements IQueryHandler<FindUserQuery, UserViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute({ studioId }: FindUserQuery): Promise<UserViewModel[]> {
    const studio =
      await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const users = await this.userRepository.find(studioId);

    return users.map(user => new UserViewModel(user))
  }
}
