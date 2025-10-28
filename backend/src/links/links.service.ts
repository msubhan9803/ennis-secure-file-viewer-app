import { Injectable } from '@nestjs/common'
import { Database } from 'bun:sqlite'
import { randomBytes } from 'crypto'

interface LinkRow {
	token: string
	created_at: number
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
				redeemed_at INTEGER
			)
		`)
	}

    getAllLinks(): LinkRow[] {
        const query = this.db.query<LinkRow, []>('SELECT token, created_at, redeemed_at FROM links')
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
			'INSERT INTO links (token, created_at, redeemed_at) VALUES (?, ?, NULL)',
			token,
			createdAt
		)
		return token
	}

	redeemToken(token: string): boolean {
		const query = this.db.query<LinkRow, [string]>('SELECT token, created_at, redeemed_at FROM links WHERE token = ?')
		const row = query.get(token)
		if (!row) return false
		const now = Date.now()
		if (now - row.created_at <= 15 * 60 * 1000) {
			// Within 15 minutes, allow viewing
			return true
		}
		// Expired, optionally mark as expired
		if (!row.redeemed_at) {
			this.db.run('UPDATE links SET redeemed_at = ? WHERE token = ?', now, token)
		}
		return false
	}
}
