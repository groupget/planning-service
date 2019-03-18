import { SchemaModel } from "src/common/mongoose/schema-types";
import { IPlanningList } from "../interfaces/list";
import { Schema } from "mongoose";
import { timestampPlugin } from "src/common/mongoose/mongoose-plugins";

const schema: SchemaModel<IPlanningList> = {
    field: String,
};

export const PlanningListSchema = new Schema(schema);

PlanningListSchema.plugin(timestampPlugin);
