import { Model } from '@/modules/shared/domain/model';

import { UserId } from './objects/userId';

export interface UserAttributes {
  id: string;
  fullname: string;
  username: string;
  email: string;
  isSuperuser: boolean;
  isActive: boolean;
  image: string | undefined;
  role: string;
  createdAt: Date;
  modifiedAt: Date;
}

export class User extends Model {
  public readonly id: UserId;

  constructor(
    id: UserAttributes['id'],
    public readonly fullname: UserAttributes['fullname'],
    public readonly username: UserAttributes['username'],
    public readonly email: UserAttributes['email'],
    public readonly isSuperuser: UserAttributes['isSuperuser'],
    public readonly isActive: UserAttributes['isActive'],
    public readonly role: UserAttributes['role'],
    public readonly createdAt: UserAttributes['createdAt'],
    public readonly modifiedAt: UserAttributes['modifiedAt'],
    public readonly image: UserAttributes['image'] = undefined,
  ) {
    super();
    this.id = new UserId(id);
  }

  toPrimitives(): UserAttributes {
    return {
      id: this.id.value,
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      isSuperuser: this.isSuperuser,
      isActive: this.isActive,
      image: this.image,
      role: this.role,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
    };
  }
}
