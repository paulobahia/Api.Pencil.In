import { IQuery } from '@nestjs/cqrs';

export class FindAbsenceQuery implements IQuery {
  constructor(readonly establishmentId: string) {}
}
