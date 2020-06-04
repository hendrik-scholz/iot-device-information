import chai from 'chai';

const expect = chai.expect;

import { getAuthorization, getGeoposition, getIdentification, getRegistrationMessage, getThreeLawsOfRobotics, getUUID } from '../../src/messages/messageProvider';

describe('iot-device-information', () => {
    describe('message provider', () => {
        it('should test the authorization message', () => {
            const authorization = getAuthorization();
            expect(authorization).to.have.all.keys('name', 'role', 'deedOwner');
        });

        it('should test the identification message', () => {
            const identification = getIdentification();
            expect(identification).to.have.all.keys('company', 'device', 'schedule', 'version');
        });

        it('should test the geo position message', () => {
            const geoposition = getGeoposition();
            expect(geoposition).to.have.all.keys('latitude', 'longitude');
        });

        it('should test the threelawsofrobotics message', () => {
            const threeLawsOfRobotics = getThreeLawsOfRobotics();
            expect(threeLawsOfRobotics).to.have.all.keys('first', 'second', 'third');
        });

        it('should test the uuid message', (done) => {
            getUUID()
                .then((uuidFromFile: any) => {
                    expect(uuidFromFile).to.have.all.keys('uuid');
                    expect(uuidFromFile.uuid.length).to.equal(36);
                    done();
                })
                .catch((error: any) => {
                    done(error);
                });
        });

        it.skip('should test the registration message', () => {
            const registrationMessage = getRegistrationMessage();
            expect(registrationMessage).to.have.all.keys('authorization', 'geoposition', 'identification', 'timestamp', 'uuid');
            expect(registrationMessage.uuid.length).to.equal(36);
        });
    });
});