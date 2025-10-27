import { Controller, Get, Post, Req, NotFoundException } from '@nestjs/common'
import { LinksService } from './links.service'

@Controller('api')
export class LinksController {
	constructor(private readonly linksService: LinksService) {}

	@Post('generate-link')
	generateLink(@Req() req: any) {
		const token = this.linksService.createToken()
		const forwardedProto = (req.headers['x-forwarded-proto'] as string) || 'http'
		const forwardedHost = (req.headers['x-forwarded-host'] as string) || (req.headers['host'] as string)
		const origin = `${forwardedProto}://${forwardedHost}`
		return { link: `${origin}/docs/view/${token}` }
	}

	@Get('docs/view/:token')
	viewDoc(@Req() req: any) {
		const token: string | undefined = req.params?.token
		if (!token) throw new NotFoundException({ error: 'Invalid or expired link.' })
		const ok = this.linksService.redeemToken(token)
		if (!ok) throw new NotFoundException({ error: 'Invalid or expired link.' })
		return { ok: true }
	}
}
