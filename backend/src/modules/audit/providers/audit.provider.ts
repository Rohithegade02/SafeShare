import { AuditService } from '../services/audit.service';

export class AuditProvider {
    private static instance: AuditService;

    static getAuditService(): AuditService {
        if (!this.instance) {
            this.instance = new AuditService();
        }
        return this.instance;
    }
}
