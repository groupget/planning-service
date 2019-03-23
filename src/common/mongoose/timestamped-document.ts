import { Document } from "mongoose";
import { SchemaModel } from "./schema-types";

export interface ITimestamped {
    createdAt: Date;
    updatedAt: Date;
}

export interface ITimestampedDocument extends ITimestamped, Document { }


export const timestampedSchema: SchemaModel<ITimestamped> = {
    createdAt: Date,
    updatedAt: Date
}
