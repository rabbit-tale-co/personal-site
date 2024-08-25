import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase.config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next/types'

type Data = {
	token?: string
	error?: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== 'POST') {
		return res.status(405).end() // Method Not Allowed
	}

	const { identifier, password } = req.body

	try {
		const userDoc = await getDoc(doc(db, 'admin', 'credentials'))
		if (!userDoc.exists()) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const userData = userDoc.data()
		const isPasswordValid = await bcrypt.compare(
			password,
			userData.passwordHash
		)
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const token = jwt.sign({ identifier }, process.env.JWT_SECRET ?? '', {
			expiresIn: '1h',
		})

		res.setHeader(
			'Set-Cookie',
			serialize('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 3600,
				path: '/',
			})
		)

		return res.status(200).json({ token })
	} catch (error) {
		console.error('Login error:', error)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
