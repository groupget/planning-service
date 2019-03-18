import { ObjectID } from "mongodb";
import { TimestampedDocument } from "src/common/mongoose/timestamped-document";

export interface IPlanningList {
    field: string;
}
export interface PlanningListDocument extends IPlanningList, TimestampedDocument {
}
