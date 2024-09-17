import { ApiProperty } from "@nestjs/swagger";
import { SchedulingStatus } from "@prisma/client";
import { ClientViewModel as Client } from "src/modules/client/viewmodels/client.viewmodel";

export class SchedulingViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  client: Client;

  @ApiProperty()
  serviceId: string;

  @ApiProperty()
  schedulingTime: string;

  @ApiProperty()
  status: SchedulingStatus;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  createdAt: string;

  constructor(scheduling: any) {
    this.id = scheduling.id;
    this.client = new Client(scheduling.client);
    this.serviceId = scheduling.serviceId;
    this.schedulingTime = new Date(scheduling.createdAt).toLocaleDateString();
    this.status = scheduling.status;
    this.notes = scheduling.notes
    this.createdAt = new Date(scheduling.createdAt).toLocaleDateString();
  }
}