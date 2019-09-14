import axios from 'axios';
import chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';

chai.use(deepEqualInAnyOrder);
const expect = chai.expect;

describe('iot-device-information', () => {
    describe('endpoints to many requests', () => {
        const host = '127.0.0.1';
        const port = '3000';

        const expectedErrorResponse = {"errors":[{"status":"429","source":{"pointer":"/authorization"},"title":"Too Many Requests","detail":"Too Many Requests"}]};

        beforeEach('wait for throttle to allow new requests', (done) => {
            setTimeout(done, 5000);
        });

        it('should test that an endpoint call every 5 seconds does not lead to an HTTP 429 response status code', (done) => {
            const waitingTimeForSecondRequestInMs = 5000;

            axios.get(`http://${host}:${port}/authorization`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.have.all.keys('name', 'role', 'deedOwner');
                    expect(response.data).not.to.have.keys('default');
                })
                .catch((error) => {
                    done(error);
                });

            setTimeout(() => {
                axios.get(`http://${host}:${port}/authorization`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.have.all.keys('name', 'role', 'deedOwner');
                    expect(response.data).not.to.have.keys('default');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
            }, waitingTimeForSecondRequestInMs);
        });

        it('should test that an endpoint call every 3 seconds leads to an HTTP 429 response status code', (done) => {
            const waitingTimeForSecondRequestInMs = 3000;

            axios.get(`http://${host}:${port}/authorization`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.have.all.keys('name', 'role', 'deedOwner');
                    expect(response.data).not.to.have.keys('default');
                })
                .catch((error) => {
                    done(error);
                });

            setTimeout(() => {
                axios.get(`http://${host}:${port}/authorization`)
                .then(() => {
                    done('Request limit has been exceeded, but HTTP status code was not 429.');
                })
                .catch((error) => {
                    expect(error.response.status).to.equal(429);
                    expect(error.response.data).to.deep.equal(expectedErrorResponse);
                    done();
                });
            }, waitingTimeForSecondRequestInMs);
        });

        it('should test that an endpoint call every 3 seconds leads to an HTTP 429 response status code, ' +
            'but a call 5 seconds after that is accepted again', (done) => {
            const waitingTimeForSecondRequestInMs = 3000;
            const waitingTimeForThirdRequestInMs = 8000;

            axios.get(`http://${host}:${port}/authorization`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.have.all.keys('name', 'role', 'deedOwner');
                    expect(response.data).not.to.have.keys('default');
                })
                .catch((error) => {
                    done(error);
                });

            setTimeout(() => {
                axios.get(`http://${host}:${port}/authorization`)
                .then(() => {
                    done('Request limit has been exceeded, but HTTP status code was not 429.');
                })
                .catch((error) => {
                    expect(error.response.status).to.equal(429);
                    expect(error.response.data).to.deep.equal(expectedErrorResponse);
                });
            }, waitingTimeForSecondRequestInMs);

            setTimeout(() => {
                axios.get(`http://${host}:${port}/authorization`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.have.all.keys('name', 'role', 'deedOwner');
                    expect(response.data).not.to.have.keys('default');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
            }, waitingTimeForThirdRequestInMs);
        });

        it('should test a non-existent endpoint', (done) => {
            const waitingTimeForSecondRequestInMs = 3000;
            const expectedErrorForNonExistedResponse = {"errors":[{"status":"429","source":{"pointer":"/non/existent"},"title":"Too Many Requests","detail":"Too Many Requests"}]};

            axios.get(`http://${host}:${port}/non/existent`)
            .catch((error) => {
                try {
                    expect(error.response.status).to.equal(404);
                } catch (e) {
                    done(e);
                }
            });

            setTimeout(() => {
                axios.get(`http://${host}:${port}/non/existent`)
                .catch((error) => {
                    try {
                        expect(error.response.status).to.equal(429);
                        expect(error.response.data).to.deep.equal(expectedErrorForNonExistedResponse);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            }, waitingTimeForSecondRequestInMs);
        });
    });
});
