export class ServiceEntity {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  studioId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
}
