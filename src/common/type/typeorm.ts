import { PrimaryColumnOptions, TableColumnOptions } from "typeorm";
import { PrimaryGeneratedColumnNumericOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions";

export type CommonColumnOptions = {
  id: PrimaryGeneratedColumnNumericOptions;
  ulid: PrimaryColumnOptions;
  createdAt: {
    type: "timestamp without time zone";
    name: "created_at";
  };
  updatedAt: {
    type: "timestamp without time zone";
    name: "updated_at";
  };
};

export type CommonTableColumnOptions = {
  id: TableColumnOptions;
  ulid: TableColumnOptions;
  createdAt: TableColumnOptions;
  updatedAt: TableColumnOptions;
};
