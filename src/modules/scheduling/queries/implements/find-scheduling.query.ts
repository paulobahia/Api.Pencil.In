import { IQuery } from '@nestjs/cqrs';

export class FindSchedulingQuery implements IQuery {
  constructor(readonly studioId: string) {}
}
