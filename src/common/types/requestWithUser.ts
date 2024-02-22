import { Request } from '@nestjs/common';
import { User } from 'src/modules/user/model/user.model';

export interface RequestWithUser extends Request {
  user: User;
}
