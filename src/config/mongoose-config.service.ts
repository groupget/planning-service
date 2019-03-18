import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from './config.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

    constructor(private configService: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.configService.mongoUrl,
            useNewUrlParser: true,
        };
    }
}
