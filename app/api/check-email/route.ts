import { NextResponse } from 'next/server';

import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const email = searchParams.get('email')?.trim();

		if (!email) {
			return NextResponse.json({ registered: false }, { status: 200 });
		}

		const snapshot = await adminDb.collection('users').where('email', '==', email).limit(1).get();

		return NextResponse.json({ registered: !snapshot.empty }, { status: 200 });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Check email error:', error);
		return NextResponse.json({ registered: false }, { status: 200 });
	}
}
