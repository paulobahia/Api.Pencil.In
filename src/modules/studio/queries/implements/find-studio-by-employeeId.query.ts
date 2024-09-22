import { IQuery } from '@nestjs/cqrs';

export class FindStudioByEmployeeIdQuery implements IQuery {
  constructor(
    readonly employeeId: string,
  ) { }
}
