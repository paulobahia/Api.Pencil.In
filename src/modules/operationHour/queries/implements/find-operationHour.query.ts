import { IQuery } from '@nestjs/cqrs';

export class FindOperationHourQuery implements IQuery {
  constructor(
    readonly studioId: string,
    readonly employeeId: string
  ) { }
}
