# iot-device-information

iot-device-information was inspired by the movie I, Robot (see https://www.imdb.com/title/tt0343818/).
In one scene a demolition robot is asked for its identification and its authorization for the task to be performed.
You can run iot-device-information on your IoT device to give detailed information about its purpose and its owner.

## Requirements

In order to use iot-device-information you need ...

* ... an installation of Node.js

iot-device-information was developed with Node.js version: v10.15.1.

## Features

### Authorization

Returns information about the owner of the device.

* Request method: GET
* Endpoint: /authorization
* File containing the response: authorization.json

Replace the values given in authorization.json with values for your device.

### Identification

Returns information about the device, the device version, and its purpose.

* Request method: GET
* Endpoint: /identification
* File containing the response: identification.json

Replace the values given in authorization.json with values for your device.

### Three Laws Of Robotics

* Request method: GET
* Endpoint: /threelawsofrobotics
* File containing the response: threeLawsOfRobotics.json

There is no need to edit the Three Laws of Robotics.