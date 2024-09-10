import { IQuery } from '@nestjs/cqrs';

export class FindEmployeeByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly establishmentId: string,
  ) {}
}
