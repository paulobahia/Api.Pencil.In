import { CreateServiceModel } from "../models/create-service.model";
import { FindServiceResult } from "../queries/implements/find-service.result";

export interface ServiceRepository {
  find(establishmentId: string): Promise<FindServiceResult>;
  create(service: CreateServiceModel): Promise<void>
}