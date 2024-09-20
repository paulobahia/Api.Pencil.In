import { IQuery } from '@nestjs/cqrs';

export class FindEmployeeByUserIdQuery implements IQuery {
  constructor(
    readonly userId: string,
  ) { }
}
