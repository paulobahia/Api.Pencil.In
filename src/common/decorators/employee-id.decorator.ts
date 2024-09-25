import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const EmployeeId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-employee-id'] as string;
  },
);
