import { IQuery } from "@nestjs/cqrs";

export class FindEmployeeQuery implements IQuery {
    constructor(readonly establishmentId: string) { }
}