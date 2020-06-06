import mqtt from 'mqtt';

import configuration from '../configuration.json';
import { createLogger } from '../logger/logger';
import { getRegistrationMessage } from '../messages/messageProvider';

const logger = createLogger();

function registerDeviceUsingMQTT(): void {
    const mqttHost = configuration.mqttHost;
    const mqttPort = configuration.mqttPort;
    const registrationTopic = configuration.registrationTopic;

    if (mqttHost && mqttPort) {
        logger.info('Connecting to MQTT broker.');
        const mqttClient = mqtt.connect(`mqtt://${mqttHost}:${mqttPort}`);

        mqttClient.on('connect', () => {
            logger.info('Successfully connected to MQTT broker.');
            logger.info('Publishing registration message to MQTT broker.');

            getRegistrationMessage()
                .then((registrationMessage) => {
                    mqttClient.publish(registrationTopic, JSON.stringify(registrationMessage), (error, response) => {
                        if (error) {
                            logger.error(`Error: ${error}.`);
                        } else if (response) {
                            logger.info(`Published registration message. Response: ${response}.`);
                        } else {
                            logger.info(`Published registration message.`);
                        }
                    });
                })
                .catch(error => logger.error(error));
        });

        mqttClient.on('error', (error) => {
            logger.error(JSON.stringify(error));
        });
    } else {
        logger.warn('MQTT host or port not given in configuration.json.');
    }
}

export { registerDeviceUsingMQTT };
