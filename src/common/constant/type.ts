import { Order } from "./order";
import { Role } from "./role";
import { Method } from "./method";
import { ImageFileType } from "./image_file_type";
import { FamilyRelation } from "./family_relation";

export type OrderTuple = typeof Order.tuple;
export type OrderUnion = OrderTuple[number];

export type RoleTuple = typeof Role.tuple;
export type RoleUnion = RoleTuple[number];

export type MethodTuple = typeof Method.tuple;
export type MethodUnion = MethodTuple[number];

export type ImageFileTypeTuple = typeof ImageFileType.tuple;
export type ImageFileTypeUnion = ImageFileTypeTuple[number];

export type FamilyRelationTuple = typeof FamilyRelation.tuple;
export type FamilyRelationUnion = FamilyRelationTuple[number];
