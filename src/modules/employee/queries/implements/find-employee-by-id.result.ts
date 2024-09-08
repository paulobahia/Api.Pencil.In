import { IQueryResult } from "@nestjs/cqrs";

export class FindEmployeeByIdResult implements IQueryResult {
  constructor(public employee: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: Boolean;
    deletedAt: Date | null;
  },
  ) { }
}