import authorization from './authorization.json';
import geoposition from './geoposition.json';
import identification from './identification.json';
import threeLawsOfRobotics from './threeLawsOfRobotics.json';

const registrationMessage = {
    authorization,
    geoposition,
    identification,
    timestamp: getDateAsIsoString()
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

function getThreeLawsOfRobotics(): any {
    return threeLawsOfRobotics;
}

function getRegistrationMessage(): any {
    return registrationMessage;
}

function getDateAsIsoString() {
    return (new Date()).toISOString();
}

export { getAuthorization };
export { getGeoposition };
export { getIdentification };
export { getRegistrationMessage };
export { getThreeLawsOfRobotics };
