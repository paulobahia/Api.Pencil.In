import { IQuery } from '@nestjs/cqrs';

export class FindSchedulingByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) {}
}
