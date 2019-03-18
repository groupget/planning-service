import { Schema } from "mongoose";
import moment = require("moment");

export const timestampPlugin = (schema: Schema) => {
    schema.add({
        createdAt: Date,
        updatedAt: Date,
    });

    schema.pre('save', function (next: CallableFunction) {
        const now = moment.utc().toDate();
        const self = this as any;
        self.updatedAt = now;

        if (!self.createdAt) {
            self.createdAt = now;
        }

        next();
    });
};
