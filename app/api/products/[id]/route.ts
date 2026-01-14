import { NextResponse } from 'next/server';

import productsJSON from '@/mock/items.json';

export function GET(req: Request) {
	try {
		const { products } = productsJSON;
		const { pathname } = new URL(req.url);
		const el = pathname.split('/');
		const id = Number(el[el.length - 1]);

		if (Number.isNaN(id)) {
			return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
		}
		
		const product = products.find((item) => item.id === id);

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}
