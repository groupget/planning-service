import { Types } from "mongoose";

type SchemaModel<T> = Required<ClassedProperties<T>>;

type ClassedProperties<T> = { [P in keyof T]: Mapper<T[P]> };

/**
 * Maps primitive type T to its class constructor equivalent.
 */
type Mapper<T> = T extends string ? StringConstructor :
    T extends number ? NumberConstructor :
    T extends boolean ? BooleanConstructor :
    T extends Date ? DateConstructor :
    T extends Array<any> ? any[] :
    T extends Types.ObjectId ? Types.ObjectIdConstructor :
    ObjectConstructor;
