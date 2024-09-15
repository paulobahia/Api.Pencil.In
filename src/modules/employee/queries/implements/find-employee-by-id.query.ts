import { IQuery } from '@nestjs/cqrs';

export class FindEmployeeByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) {}
}
