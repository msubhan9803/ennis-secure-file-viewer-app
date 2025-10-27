import { Injectable } from '@nestjs/common'
import { Database } from 'bun:sqlite'
import { randomBytes } from 'crypto'

interface LinkRow {
	token: string
	created_at: number
	redeemed: number
	redeemed_at: number | null
}

@Injectable()
export class LinksService {
	private readonly db: Database

	constructor() {
		this.db = new Database(':memory:')
		this.db.run(`
			CREATE TABLE IF NOT EXISTS links (
				token TEXT PRIMARY KEY,
				created_at INTEGER NOT NULL,
				redeemed INTEGER NOT NULL DEFAULT 0,
				redeemed_at INTEGER
			)
		`)
	}

    getAllLinks(): LinkRow[] {
        const query = this.db.query<LinkRow, []>('SELECT token, created_at, redeemed, redeemed_at FROM links')
        return query.all()
    }

	generateToken(): string {
		// 32 random bytes → hex string (64 chars), URL-safe
		return randomBytes(32).toString('hex')
	}

	createToken(): string {
		const token = this.generateToken()
		const createdAt = Date.now()
		this.db.run(
			'INSERT INTO links (token, created_at, redeemed, redeemed_at) VALUES (?, ?, 0, NULL)',
			token,
			createdAt
		)
		return token
	}

	redeemToken(token: string): boolean {
		const query = this.db.query<LinkRow, [string]>('SELECT token, redeemed FROM links WHERE token = ?')
		const row = query.get(token)
		if (!row) return false
		if (row.redeemed === 1) return false
		this.db.run('UPDATE links SET redeemed = 1, redeemed_at = ? WHERE token = ?', Date.now(), token)
		return true
	}
}
