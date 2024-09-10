import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class EstablishmentIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const establishmentId = request.headers['x-establishment-id'];

    if (!establishmentId) {
      throw new ForbiddenException('Establishment ID is required');
    }

    return true;
  }
}
