import { Model } from '@/modules/shared/domain/model';

import { RoleId } from './objects/roleId';

export interface RoleAttributes {
  readonly id: string;
  readonly name: string;
  readonly description: string;
}

export class Role extends Model {
  public readonly id: RoleId;

  constructor(
    id: string,
    public readonly name: string,
    public readonly description: string,
  ) {
    super();
    this.id = new RoleId(id);
  }

  public toPrimitives(): RoleAttributes {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
    };
  }
}
