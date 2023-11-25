import { Injectable } from "@nestjs/common";
import { PathLike } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

@Injectable()
export class FileService {
    getDestinationPath() {
        return join(__dirname, '..', '..', 'storage', 'photos');
    };

    async upload (filename: string, file: Express.Multer.File)  {
        const path: PathLike = join(this.getDestinationPath(), filename);
        
        await writeFile(path, file.buffer);

        return path;
    };
    
    async uploadFiles (filename: string, files: Express.Multer.File[]) {
        const path: PathLike = join(this.getDestinationPath(), filename);
        
        const arrayFiles = files.map(file => {
            writeFile(path, file.buffer);
        });

        return path;
    }
}