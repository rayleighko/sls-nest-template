import { CommonColumnOptions, CommonTableColumnOptions } from "../type/typeorm";

// for entity
export const commonColumnOptions: CommonColumnOptions = {
  id: { name: "id", type: "integer" },
  ulid: {
    name: "ulid",
    type: "varchar",
    length: "36",
    default: "generate_ulid()"
  },
  createdAt: {
    name: "created_at",
    type: "timestamp without time zone"
  },
  updatedAt: {
    name: "updated_at",
    type: "timestamp without time zone"
  }
};

// for relation
export const commonTableColumnOptions: CommonTableColumnOptions = {
  id: {
    name: "id",
    type: "integer",
    isPrimary: true,
    isGenerated: true,
    generationStrategy: "increment"
  },
  ulid: {
    name: "ulid",
    type: "varchar",
    length: "36",
    default: "generate_ulid()"
  },
  createdAt: {
    name: "created_at",
    type: "timestamp without time zone",
    default: "now()"
  },
  updatedAt: {
    name: "updated_at",
    type: "timestamp without time zone",
    default: "now()"
  }
};
