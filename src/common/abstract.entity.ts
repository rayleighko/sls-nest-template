import { UlidColumn } from "@anchan828/typeorm-decorators";
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { UtilsService } from "~/providers/utils.service";

import { commonColumnOptions } from "./constant/typeorm";
import { AbstractDto } from "./dto/Abstract.dto";

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  @PrimaryGeneratedColumn("increment", commonColumnOptions.id)
  id!: number;

  @UlidColumn({ isMonotonic: false }, commonColumnOptions.ulid)
  public ulid!: string;

  @CreateDateColumn(commonColumnOptions.createdAt)
  createdAt!: Date;

  @UpdateDateColumn(commonColumnOptions.updatedAt)
  updatedAt!: Date;

  abstract dtoClass: new (e: AbstractEntity, o?: any) => T;

  toDto(o?: any): T {
    return UtilsService.toDto(this.dtoClass, this, o);
  }
}
