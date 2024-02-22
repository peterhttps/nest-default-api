import { SetMetadata } from '@nestjs/common';

export const TypesDec = (...roles: string[]) => SetMetadata('types', roles);
