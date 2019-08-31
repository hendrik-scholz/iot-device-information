import chai from 'chai';
import fs from 'fs';
import waitOn from 'wait-on';

const expect = chai.expect;

import { createLogger } from '../../src/logger/logger';

const waitOnOptions = {
    delay: 500,
    interval: 500,
    resources: ['app.log'],
    timeout: 3000
};

function deleteLogFile(callback: any) {
    fs.unlink('app.log', callback);
}

describe('iot-device-information', () => {
    describe('logger', () => {

        before('delete log file', (done) => {
            deleteLogFile((error: any) => {
                if (error) {
                    done(error);
                } else {
                    done();
                }
            });
        });

        it('should check whether a log file is created', (done) => {
            const logger = createLogger();
            logger.info('test log entry');

            waitOn(waitOnOptions, (errorWaitOn) => {
                if (errorWaitOn) {
                    done(errorWaitOn);
                } else {
                    fs.readFile('app.log', (errorFileAccess, content) => {
                        if (errorFileAccess) {
                            done(errorFileAccess);
                         } else {
                            const logEntry = Buffer.from(content).toString();
                            expect(logEntry).to.contain('test log entry');
                            done();
                         }
                    });
                }
            });
        });
    });
});