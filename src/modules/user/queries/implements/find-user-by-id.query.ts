import { IQuery } from '@nestjs/cqrs';

export class FindUserByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) {}
}
