import { connect } from "amqplib";
import { QueueChannelProviderToken } from "../common/provide-tokens";
import { ExchangeType } from "./models";
import { ConfigService } from "../config/config.service";
import { Provider } from "@nestjs/common";

export const QueueChannelProvider: Provider = {
    provide: QueueChannelProviderToken,
    useFactory: connectToMessageBroker
}

async function connectToMessageBroker() {
    const config = new ConfigService();
    const connection = await connect(config.rabbitMQSettings.url);
    const channel = await connection.createChannel();

    await channel.assertExchange(
        config.rabbitMQSettings.exchangeName,
        ExchangeType.Topic,
        { durable: false });

    return channel;
}
