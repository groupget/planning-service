import { createParamDecorator } from "@nestjs/common/decorators/http";
import jwt = require('jsonwebtoken');


export interface IUserInfo {
    sub: string;
    aud: string;
    'cognito:groups': string[];
    email_verified: true;
    event_id: string[];
    token_use: string;
    auth_time: number;
    iss: string;
    'cognito:username': string;
    exp: number;
    iat: number;
    email: string;
}

export const UserInfo = createParamDecorator(
    (data, [root, args, ctx, info]) => {
        try {
            const token = ctx.headers.authorization.split(" ")[1];
            return jwt.decode(token);
        } catch (error) {
            return {};
        }
    },
);
