import fs from 'fs';

import { createLogger } from '../logger/logger';
import { generateUUID } from './idGenerator';
import { generateUUIDMessage } from './messageGenerator';

import authorization from './authorization.json';
import geoposition from './geoposition.json';
import identification from './identification.json';
import threeLawsOfRobotics from './threeLawsOfRobotics.json';

const logger = createLogger();

const uuidFileName = 'uuid.json';

let uuid = '';

const registrationMessage = {
    authorization,
    geoposition,
    identification,
    timestamp: getDateAsIsoString(),
    uuid
};

function getAuthorization(): any {
    return authorization;
}

function getGeoposition(): any {
    return geoposition;
}

function getIdentification(): any {
    return identification;
}

function getRegistrationMessage(): any {
    return registrationMessage;
}

function getThreeLawsOfRobotics(): any {
    return threeLawsOfRobotics;
}

function getUUID(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (uuid) {
            resolve(uuid);
        } else if (fs.existsSync(uuidFileName)) {
            getUuidFromFile()
                .then((uuidFromFile: any) => {
                    resolve(uuidFromFile);
                })
                .catch((error: string) => {
                    logger.error(error);
                    reject(error);
                });
        } else {
            uuid = generateUUID();
            generateUUIDMessage(uuidFileName, uuid);
            resolve(JSON.stringify({ uuid }));
        }
    });
}

function getDateAsIsoString(): string {
    return (new Date()).toISOString();
}

function getUuidFromFile(): any {
    return new Promise((resolve, reject) => {
        fs.readFile(uuidFileName, (errorFileAccess, content) => {
            if (errorFileAccess) {
                reject(`Unable to find file named ${uuidFileName}.`);
             } else {
                const uuidEntry = JSON.parse(Buffer.from(content).toString());
                resolve(uuidEntry);
             }
        });
    });
}

export { getAuthorization };
export { getGeoposition };
export { getIdentification };
export { getRegistrationMessage };
export { getThreeLawsOfRobotics };
export { getUUID };
