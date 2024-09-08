import { IQueryResult } from "@nestjs/cqrs";

export class FindEstablishmentByIdResult implements IQueryResult {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly address: string | null,
    readonly phone: string | null,
    readonly description: string | null,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly isDeleted: Boolean,
    readonly deletedAt: Date | null
  ) { }
}