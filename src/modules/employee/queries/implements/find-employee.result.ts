import { IQueryResult } from "@nestjs/cqrs";

export class FindEmployeeResult implements IQueryResult {
  constructor(readonly employees: Readonly<{
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: Boolean;
    deletedAt: Date | null;
  }>[]) { }
}