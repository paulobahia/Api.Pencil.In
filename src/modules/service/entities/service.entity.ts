export class ServiceEntity {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  establishmentId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: Boolean;
  deletedAt: Date | null;
}