import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class EmployeeIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const employeeId = request.headers['x-employee-id'];

    if (!employeeId) {
      throw new ForbiddenException('Employee ID is required');
    }

    return true;
  }
}
