import mqtt from 'mqtt';

import configuration from '../configuration.json';
import { getRegistrationMessage } from '../messages/messageProvider';

function registerDeviceUsingMQTT(): void {
    const mqttHost = configuration.mqttHost;
    const mqttPort = configuration.mqttPort;

    if (mqttHost && mqttPort) {
        const mqttClient  = mqtt.connect(`mqtt:${mqttHost}:${mqttPort}`);

        mqttClient.on('connect', () => {
            mqttClient.publish('registration', JSON.stringify(getRegistrationMessage()));
        });

        mqttClient.on('error', (error) => {
            console.log(JSON.stringify(error));
        });
    } else {
        console.log('MQTT host or port not given configuration.json.');
    }
}

export { registerDeviceUsingMQTT };
