import { IQuery } from '@nestjs/cqrs';

export class FindClientByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) {}
}
