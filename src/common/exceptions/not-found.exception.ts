import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(resource: string) {
    super(`${resource} não encontrado!`, HttpStatus.NOT_FOUND);
  }
}