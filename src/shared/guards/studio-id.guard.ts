import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class StudioIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const studioId = request.headers['x-studio-id'];

    if (!studioId) {
      throw new ForbiddenException('Studio ID is required');
    }

    return true;
  }
}
