import express, { Request, Response } from "express";

import * as authorization from './authorization.json';
import * as identification from './identification.json';
import * as threeLawsOfRobotics from './threeLawsOfRobotics.json';

const app = express();
const port = 3000;

app.get("/identification", (req: Request, res: Response) => res.send(identification));
app.get("/authorization", (req: Request, res: Response) => res.send(authorization));
app.get("/threelawsofrobotics", (req: Request, res: Response) => res.send(threeLawsOfRobotics));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
