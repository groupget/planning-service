import { ValueProvider } from "@nestjs/common/interfaces";
import { PubSub } from "graphql-subscriptions";
import { PubSubToken } from "src/common/provide-tokens";

export const PubSubProvider: ValueProvider<PubSub> = {
    provide: PubSubToken,
    useValue: new PubSub()
}
