import { IQueryResult } from "@nestjs/cqrs";

export class FindEstablishmentResult implements IQueryResult{
    constructor(readonly establishments:Readonly<{
        id: string;
        name: string;
        address: string | null;
        phone: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: Boolean;
        deletedAt: Date | null;
    }>[]) { }
}