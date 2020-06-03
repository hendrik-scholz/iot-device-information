import chai from 'chai';
import fs from 'fs';
import waitOn from 'wait-on';

const expect = chai.expect;

import { generateUUIDMessage } from '../../src/messages/messageGenerator';

const waitOnOptions = {
    delay: 500,
    interval: 500,
    resources: ['test/messages/uuid.json'],
    timeout: 3000
};

function deleteUuidFile(callback: any) {
    fs.unlink('test/messages/uuid.json', (error) => {
        if (error && error.errno === -2 && error.code === 'ENOENT') {
            console.log('deleteUuidFile: Since the uuid file does not exist there is nothing to delete.');
        }

        callback();
    });
}

describe('iot-device-information', () => {
    describe('message generator', function() {
        this.timeout(5000);

        before('delete uuid file', (done) => {
            deleteUuidFile((error: any) => {
                if (error) {
                    done(error);
                } else {
                    done();
                }
            });
        });

        it('should test generation of a UUID JSON file with a given ID', (done) => {
            const expectedUuidEntry = JSON.stringify({uuid: '42'});
            generateUUIDMessage('test/messages/uuid.json', '42');

            waitOn(waitOnOptions, (errorWaitOn) => {
                if (errorWaitOn) {
                    done(errorWaitOn);
                } else {
                    fs.readFile('test/messages/uuid.json', (errorFileAccess, content) => {
                        if (errorFileAccess) {
                            done(errorFileAccess);
                         } else {
                            const uuidEntry = Buffer.from(content).toString();
                            expect(uuidEntry).to.equal(expectedUuidEntry);
                            done();
                         }
                    });
                }
            });
        });

        it('should test that a second call to generate a UUID JSON file does not overwrite it', (done) => {
            const expectedUuidEntry = JSON.stringify({uuid: '42'});
            generateUUIDMessage('test/messages/uuid.json', '42');
            generateUUIDMessage('test/messages/uuid.json', '43');

            waitOn(waitOnOptions, (errorWaitOn) => {
                if (errorWaitOn) {
                    done(errorWaitOn);
                } else {
                    fs.readFile('test/messages/uuid.json', (errorFileAccess, content) => {
                        if (errorFileAccess) {
                            done(errorFileAccess);
                         } else {
                            const uuidEntry = Buffer.from(content).toString();
                            expect(uuidEntry).to.equal(expectedUuidEntry);
                            done();
                         }
                    });
                }
            });
        });
    });
});
