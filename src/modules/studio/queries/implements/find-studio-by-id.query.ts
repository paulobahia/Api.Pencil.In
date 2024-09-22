import { IQuery } from '@nestjs/cqrs';

export class FindStudioByIdQuery implements IQuery {
  constructor(
    readonly id: string,
  ) { }
}
