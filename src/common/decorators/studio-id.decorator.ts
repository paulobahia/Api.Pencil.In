import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const StudioId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-studio-id'] as string;
  },
);
