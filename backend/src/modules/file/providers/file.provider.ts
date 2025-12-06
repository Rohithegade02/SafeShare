import { FileService } from '../services/file.service';

export class FileProvider {
    private static instance: FileService;

    static getFileService(): FileService {
        if (!this.instance) {
            this.instance = new FileService();
        }
        return this.instance;
    }
}
