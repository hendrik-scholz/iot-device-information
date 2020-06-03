import mqtt from 'mqtt';

import configuration from '../configuration.json';
import { createLogger } from '../logger/logger';
import { getRegistrationMessage } from '../messages/messageProvider';

const logger = createLogger();

function registerDeviceUsingMQTT(): void {
    const mqttHost = configuration.mqttHost;
    const mqttPort = configuration.mqttPort;

    if (mqttHost && mqttPort) {
        logger.info('Connecting to MQTT broker.');
        const mqttClient = mqtt.connect(`mqtt://${mqttHost}:${mqttPort}`);

        mqttClient.on('connect', () => {
            logger.info('Successfully connected to MQTT broker.');
            logger.info('Publishing registration message to MQTT broker.');
            mqttClient.publish('registration', JSON.stringify(getRegistrationMessage()), (error, res) => logger.info(`${error} ${res}`));
        });

        mqttClient.on('error', (error) => {
            logger.error(JSON.stringify(error));
        });
    } else {
        logger.warn('MQTT host or port not given in configuration.json.');
    }
}

export { registerDeviceUsingMQTT };
