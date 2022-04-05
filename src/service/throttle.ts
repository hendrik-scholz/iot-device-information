import { NextFunction, Request, Response } from 'express';

import configuration from '../configuration.json';
import { createLogger } from '../logger/logger';

import http429response from './http429response.json';

const logger = createLogger();

let timestampOfLastRequest = 0;

function throttleRequest(req: Request, res: Response, next: NextFunction): void {
    const currentTimestamp = (new Date()).getTime();
    const diff = currentTimestamp - timestampOfLastRequest;

    if (diff < configuration.timeBetweenRequestsInMs) {
        const errorMessage = http429response;

        if (errorMessage && errorMessage.errors[0] && errorMessage.errors[0].source) {
            errorMessage.errors[0].source.pointer = req.url;
        } else {
            logger.warn('Error message for status code HTTP 429 is not complete.');
        }

        logger.warn('Too many requests.');
        res.status(429).send(errorMessage);
    } else {
        next();
    }

    timestampOfLastRequest = currentTimestamp;
}

export { throttleRequest };
