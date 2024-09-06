import { FindEstablishmentResult } from "./find-establishment.result";

export interface EstablishmentQuery {
    find(): Promise<FindEstablishmentResult>;
}