import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({ origin: true })
	await app.listen(3000)
	const url = await app.getUrl()
	// eslint-disable-next-line no-console
	console.log(`Backend listening on ${url}`)
}

bootstrap()
