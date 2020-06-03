import fs from 'fs';

function generateUUIDMessage(fileName: string, uuid: string) {
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, JSON.stringify({ uuid }));
    }
}

export { generateUUIDMessage };
