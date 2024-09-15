export class StudioEntity {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
}
