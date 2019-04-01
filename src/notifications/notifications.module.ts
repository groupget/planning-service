import { Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { QueueChannelProvider } from './channel.provider';

@Module({

    providers: [
        QueueChannelProvider,
        ProducerService
    ],
    exports: [
        QueueChannelProvider,
        ProducerService
    ]

})
export class NotificationsModule { }
