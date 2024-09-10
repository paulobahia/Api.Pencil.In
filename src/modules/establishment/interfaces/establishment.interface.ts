import { FindEstablishmentByIdResult } from '../queries/implements/find-establishment-by-id.result';
import { FindEstablishmentResult } from '../queries/implements/find-establishment.result';

export interface EstablishmentRepository {
  find(): Promise<FindEstablishmentResult>;
  findById(id: string): Promise<FindEstablishmentByIdResult | null>;
}
