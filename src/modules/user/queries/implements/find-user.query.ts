import { IQuery } from '@nestjs/cqrs';

export class FindClientQuery implements IQuery {
  constructor(readonly studioId: string) {}
}
