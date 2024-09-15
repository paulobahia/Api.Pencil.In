import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '../implements/find-user-by-id.query';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { UserRepository } from '../../interfaces/user-repository.interface';
import { UserViewModel } from '../../viewmodels/user.viewmodel';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler
  implements IQueryHandler<FindUserByIdQuery, UserViewModel> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute({ id, studioId }: FindUserByIdQuery): Promise<UserViewModel> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException();
    }

    const user = await this.userRepository.findById(id, studioId);

    return new UserViewModel(user)
  }
}
