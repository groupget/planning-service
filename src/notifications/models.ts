export enum ExchangeType {
    Topic = "topic",
    Fanout = "fanout",
    Direct = "direct"
}

export type NotificationEventType = "created" | "updated" | "deleted";
export type NotificationEventResourceType = "item" | "list";

export class NotificationEvent {
    type: NotificationEventType;
    resourceType: NotificationEventResourceType;
    message: any;
}
