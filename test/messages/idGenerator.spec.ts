import chai from 'chai';

const expect = chai.expect;

import { generateUUID } from '../../src/messages/idGenerator';

describe('iot-device-information', () => {
    describe('id generator', () => {
        it('should test generation of an UUID', () => {
            const uuid = generateUUID();
            expect(uuid.length).to.equal(36);
        });
    });
});
