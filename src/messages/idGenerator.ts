import uuidv4 from 'uuid/v4';

function generateUUID() {
    const uuid = uuidv4();
    return uuid;
}

export { generateUUID };
