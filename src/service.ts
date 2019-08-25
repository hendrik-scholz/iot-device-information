import express, { Request, Response } from 'express';

import authorization from './authorization.json';
import geoposition from './geoposition.json';
import identification from './identification.json';
import threeLawsOfRobotics from './threeLawsOfRobotics.json';

const app = express();
const port = 3000;

app.get('/authorization', (req: Request, res: Response) => res.send(authorization));
app.get('/geoposition', (req: Request, res: Response) => res.send(geoposition));
app.get('/identification', (req: Request, res: Response) => res.send(identification));
app.get('/threelawsofrobotics', (req: Request, res: Response) => res.send(threeLawsOfRobotics));

app.listen(port, () => console.log(`iot-device-information app listening on port ${port}!`));
