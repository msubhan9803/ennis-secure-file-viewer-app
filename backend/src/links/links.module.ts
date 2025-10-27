import { Module } from '@nestjs/common'
import { LinksController } from './links.controller'
import { LinksService } from './links.service'
import { LinksInspectorService } from './links.inspector'

@Module({
    controllers: [LinksController],
    providers: [LinksService, LinksInspectorService],
})
export class LinksModule {}
