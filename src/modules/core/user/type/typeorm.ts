import { ColumnOptions, TableColumnOptions } from "typeorm";

export type UserColumnOptions = {
  username: ColumnOptions;
  role: ColumnOptions;
  salt: ColumnOptions;
  oldSalt: ColumnOptions;
  refresh: ColumnOptions;
  isActive: ColumnOptions;
};

export type UserTableColumnOptions = {
  username: TableColumnOptions;
  role: TableColumnOptions;
  salt: TableColumnOptions;
  oldSalt: TableColumnOptions;
  refresh: TableColumnOptions;
  isActive: TableColumnOptions;
};
