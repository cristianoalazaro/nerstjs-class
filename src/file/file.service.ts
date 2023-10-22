import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";

@Injectable()
export class FileService {
    async upload (path: string, file: Express.Multer.File)  {
        return await writeFile(path, file.buffer);
    };

    async uploadFiles (path: string, files: Express.Multer.File[]) {
        const arrayFiles = files.map(file => {
            writeFile(path, file.buffer);
        });

        return arrayFiles;
    }
}