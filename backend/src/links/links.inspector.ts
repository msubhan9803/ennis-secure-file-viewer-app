import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { LinksService } from './links.service'

@Injectable()
export class LinksInspectorService implements OnModuleInit {
    private readonly logger = new Logger(LinksInspectorService.name)

    constructor(private readonly linksService: LinksService) {}

    onModuleInit(): void {
        const rows = this.linksService.getAllLinks()
        this.logger.log(`In-memory links on startup: ${rows.length}`)
        if (rows.length > 0) {
            // pretty-print a small sample
            const sample = rows.slice(0, 10)
            this.logger.debug(JSON.stringify(sample, null, 2))
        }
    }
}


