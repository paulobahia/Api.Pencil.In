import { FindEstablishmentResult } from "../queries/implements/find-establishment.result";

export interface EstablishmentQuery {
    find(): Promise<FindEstablishmentResult>;
}