import { NextResponse } from 'next/server';

import productsJSON from '@/mock/items.json';

export function GET(req: Request) {
	try {
		const { products } = productsJSON;
		const { searchParams } = new URL(req.url);
		const limitParam = searchParams.get('limit');

		if (limitParam) {
			const limit = Number.parseInt(limitParam, 10);
			if (Number.isNaN(limit) || limit < 0) {
				return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 });
			}
			return NextResponse.json([...products.slice(0, limit)]);
		}

		return NextResponse.json([...products]);
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}
