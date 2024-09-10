export class ServiceEntity {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  establishmentId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
}
