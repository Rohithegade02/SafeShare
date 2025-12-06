import { ShareService } from '../services/share.service';

export class ShareProvider {
    private static instance: ShareService;

    static getShareService(): ShareService {
        if (!this.instance) {
            this.instance = new ShareService();
        }
        return this.instance;
    }
}
