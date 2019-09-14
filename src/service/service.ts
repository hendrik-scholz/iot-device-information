import express from 'express';
import { Express, Request, Response } from 'express';

import { createLogger } from '../logger/logger';
import { getAuthorization, getGeoposition, getIdentification, getThreeLawsOfRobotics } from '../messages/messageProvider';
import { throttleRequest } from './throttle';

const logger = createLogger();

function startService(): void {
    const app: Express = express();
    const port = 3000;

    app.use(throttleRequest);

    app.use((req: Request, res: Response, next: any) => {
        logger.info(`Incoming request: ${req.method}, endpoint: ${req.url}, headers: ${JSON.stringify(req.headers)}.`);
        next();
    });

    app.get('/authorization', (req: Request, res: Response) => res.send(getAuthorization()));
    app.get('/geoposition', (req: Request, res: Response) => res.send(getGeoposition()));
    app.get('/identification', (req: Request, res: Response) => res.send(getIdentification()));
    app.get('/threelawsofrobotics', (req: Request, res: Response) => res.send(getThreeLawsOfRobotics()));

    app.listen(port, () => logger.info(`iot-device-information app listening on port ${port}!`));
}

export { startService };
