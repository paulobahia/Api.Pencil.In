import { IQuery } from '@nestjs/cqrs';

export class FindAbsenceByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly establishmentId: string
  ) { }
}
