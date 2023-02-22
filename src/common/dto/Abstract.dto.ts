import { AbstractEntity } from "../abstract.entity";

export abstract class AbstractDto {
  id: number;
  ulid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.ulid = entity.ulid;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
