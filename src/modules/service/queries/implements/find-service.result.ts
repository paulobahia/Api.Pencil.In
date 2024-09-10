import { IQueryResult } from "@nestjs/cqrs";

export class FindServiceResult implements IQueryResult {
  constructor(readonly services: Readonly<{
    id: string;
    name: string;
    description: string;
    durationMinutes: number;
    price: number;
    establishmentId: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: Boolean;
    deletedAt: Date | null;
  }>[]) { }
}