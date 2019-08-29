import axios from 'axios';
import chai from 'chai';

const expect = chai.expect;

describe('iot-device-information', () => {
    describe('endpoints', () => {
        const host = '127.0.0.1';
        const port = '3000';

        it('should test the authorization endpoint', (done) => {
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
        });

        it('should test the identification endpoint', (done) => {
            axios.get(`http://${host}:${port}/identification`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.have.all.keys('company', 'device', 'schedule', 'version');
                    expect(response.data).not.to.have.keys('default');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('should test the geo position endpoint', (done) => {
            axios.get(`http://${host}:${port}/geoposition`)
                .then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.data).to.have.all.keys('latitude', 'longitude');
                    expect(response.data).not.to.have.keys('default');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('should test the threelawsofrobotics endpoint', (done) => {
            axios.get(`http://${host}:${port}/threelawsofrobotics`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.data).to.have.all.keys('first', 'second', 'third');
                expect(response.data).not.to.have.keys('default');
                done();
            })
            .catch((error) => {
                done(error);
            });
        });

        it('should test a non-existent endpoint', (done) => {
            axios.get(`http://${host}:${port}/non/existent`)
            .catch((error) => {
                try {
                    expect(error.response.status).to.equal(404);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    });
});