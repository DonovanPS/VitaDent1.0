import fs from 'fs';
import path from 'path';

const directory = path.resolve(__dirname, "../../src/public");

const deleteFile = (name: string) => {
    const filePath = path.join(directory, name);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}


export {deleteFile};