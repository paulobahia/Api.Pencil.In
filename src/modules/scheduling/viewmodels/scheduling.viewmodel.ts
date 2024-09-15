import { ApiProperty } from "@nestjs/swagger";
import { SchedulingStatus } from "@prisma/client";
import { UserViewModel as User } from "src/modules/user/viewmodels/user.viewmodel";

export class SchedulingViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user: User;

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
    this.user = new User(scheduling.user);
    this.serviceId = scheduling.serviceId;
    this.schedulingTime = new Date(scheduling.createdAt).toLocaleDateString();
    this.status = scheduling.status;
    this.notes = scheduling.notes
    this.createdAt = new Date(scheduling.createdAt).toLocaleDateString();
  }
}