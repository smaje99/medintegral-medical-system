import { RoleId } from './objects/roleId';

export class Role {
  public readonly id: RoleId;

  constructor(
    id: string,
    public readonly name: string,
    public readonly description: string,
  ) {
    this.id = new RoleId(id);
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
    };
  }
}
