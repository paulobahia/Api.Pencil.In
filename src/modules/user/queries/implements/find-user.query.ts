import { IQuery } from '@nestjs/cqrs';

export class FindUserQuery implements IQuery {
  constructor() {}
}
