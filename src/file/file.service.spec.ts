import { Test, TestingModule } from "@nestjs/testing"
import { FileService } from "./file.service"
import { getPhoto } from "../testing/get-photo.mock";

describe('fileService', () => {
    let fileService: FileService;

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers:[FileService],
        }).compile();

        fileService = module.get<FileService>(FileService);
    });

    it('Valite definition', () => {
        expect(fileService).toBeDefined();
    });

    describe('File Service Test', () => {
        it('Upload method', async() => {
            const photo = await getPhoto();

            const filename = 'photo-test.jpg';

            fileService.upload(filename, photo);
        });
    })
});