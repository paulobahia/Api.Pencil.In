export class EmployeeEntity {
  id: string;
  name: string;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
}
