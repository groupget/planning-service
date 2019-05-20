import { Logger } from "@nestjs/common";
import { Request, Response } from 'express';

export const reqLogger = () => {
    const _logger = new Logger("LogReq");
    return (req: Request, res: Response, next: () => void) => {
        const logMessage = {
            method: req.method,
            url: req.url,
            body: req.body,
            headers: req.headers,
            params: req.params,
            query: req.query
        };

        _logger.log(JSON.stringify(logMessage))
        next();
    }
}
