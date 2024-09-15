import { IQuery } from '@nestjs/cqrs';

export class FindServiceQuery implements IQuery {
  constructor(readonly studioId: string) {}
}
