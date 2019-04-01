import * as amqp from "amqplib";
import { Injectable, Inject, Logger } from '@nestjs/common';
import { QueueChannelProviderToken } from '../../common/provide-tokens';
import { NotificationEvent } from "../models";
import { ConfigService } from "../../config/config.service";

@Injectable()
export class ProducerService {
    private readonly exchangeName: string;
    private readonly logger = new Logger();

    constructor(
        @Inject(QueueChannelProviderToken) private readonly channel: amqp.Channel,
        config: ConfigService
    ) {
        this.exchangeName = config.rabbitMQSettings.exchangeName;
    }
    
    public async publish(event: NotificationEvent) {
        const routingKey = `${event.resourceType}.${event.type}`;
        try {
            this.channel.publish(this.exchangeName, routingKey, new Buffer(JSON.stringify(event)));
            this.logger.log(`Published on '${this.exchangeName}' in topic:'${routingKey}', objectId: ${event.message.id}`, this.constructor.name);
        } catch (error) {
            this.logger.error(error.message, error.stack, this.constructor.name);
        }
    }
}
