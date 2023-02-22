import { QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export const createTableSafe = async (
  queryRunner: QueryRunner,
  table: Table
) => {
  const hasTable = await queryRunner.hasTable(table);

  if (!hasTable) await queryRunner.createTable(table);
};

export const addColumnsSafe = async (
  queryRunner: QueryRunner,
  table: Table,
  columns: TableColumn[]
) => {
  const added = await Promise.all(
    columns.map(async column => {
      const hasColumn = await queryRunner.hasColumn(table, column.name);

      if (!hasColumn) {
        await queryRunner.addColumn(table, column);
      }

      return column;
    })
  );

  return added;
};

export const addForeignKeysSafe = async (
  queryRunner: QueryRunner,
  table: Table,
  fks: TableForeignKey[]
) => {
  const added = await Promise.all(
    fks.map(async fk => {
      await Promise.all(
        fk.columnNames.map(async columnName => {
          const hasColumn = await queryRunner.hasColumn(table, columnName);

          if (!hasColumn) await queryRunner.createForeignKey(table, fk);
          return columnName;
        })
      );

      return fk;
    })
  );

  return added;
};
