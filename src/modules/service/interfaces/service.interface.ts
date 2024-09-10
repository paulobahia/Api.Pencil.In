import { CreateServiceModel } from '../models/create-service.model';
import { UpdateServiceModel } from '../models/update-service.model';
import { FindServiceByIdResult } from '../queries/implements/find-service-by-id.result';
import { FindServiceResult } from '../queries/implements/find-service.result';

export interface ServiceRepository {
  find(establishmentId: string): Promise<FindServiceResult>;
  findById(
    id: string,
    establishmentId: string,
  ): Promise<FindServiceByIdResult | null>;
  create(service: CreateServiceModel): Promise<void>;
  update(employee: UpdateServiceModel): Promise<void>;
  delete(id: string, establishmentId: string): Promise<void>;
}
