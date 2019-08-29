import authorization from './authorization.json';
import geoposition from './geoposition.json';
import identification from './identification.json';
import threeLawsOfRobotics from './threeLawsOfRobotics.json';

const registrationMessage = {
    identification: identification,
    authorization: authorization,
    geoposition: geoposition
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
    return {
        identification: identification,
        authorization: authorization,
        geoposition: geoposition,
        timestamp: getDateAsIsoString()
    };
}

function getDateAsIsoString() {
    return (new Date()).toISOString();
}

export { getAuthorization };
export { getGeoposition };
export { getIdentification };
export { getRegistrationMessage };
export { getThreeLawsOfRobotics };
