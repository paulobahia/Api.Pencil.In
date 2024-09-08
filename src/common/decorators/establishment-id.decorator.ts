import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const EstablishmentId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-establishment-id'] as string;
  },
);