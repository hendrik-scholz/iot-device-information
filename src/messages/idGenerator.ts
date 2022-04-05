import { v4 as uuidv4 } from 'uuid';

function generateUUID() {
    const uuid = uuidv4();
    return uuid;
}

export { generateUUID };
