import express from 'express';
import { Express, Request, Response } from 'express';

import { getAuthorization, getGeoposition, getIdentification, getThreeLawsOfRobotics } from '../messages/messageProvider';

function startService(): void {
    const app: Express = express();
    const port = 3000;

    app.get('/authorization', (req: Request, res: Response) => res.send(getAuthorization()));
    app.get('/geoposition', (req: Request, res: Response) => res.send(getGeoposition()));
    app.get('/identification', (req: Request, res: Response) => res.send(getIdentification()));
    app.get('/threelawsofrobotics', (req: Request, res: Response) => res.send(getThreeLawsOfRobotics()));

    app.listen(port, () => console.log(`iot-device-information app listening on port ${port}!`));
}

export { startService };
