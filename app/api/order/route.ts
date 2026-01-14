import { NextResponse } from 'next/server';

import { schemaOrder } from '@/modules/cart/services/schemaOrder';

export async function POST(req: Request) {
	try {
		const body: unknown = await req.json();
		const validatedData = await schemaOrder.validate(body, { abortEarly: false });

		return NextResponse.json({ success: true, data: validatedData }, { status: 200 });
	} catch (error) {
		if (error instanceof Error && 'inner' in error) {
			const validationErrors = (error as { inner?: Array<{ path?: string; message: string }> }).inner || [];
			const errors = validationErrors.reduce(
				(acc, err) => {
					if (err.path) {
						acc[err.path] = err.message;
					}
					return acc;
				},
				{} as Record<string, string>,
			);

			return NextResponse.json({ success: false, errors }, { status: 400 });
		}

		return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
	}
}
