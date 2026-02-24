import { adminDb } from '@/lib/firebase-admin';

const BATCH_SIZE = 500;

export async function linkGuestOrdersToUser(userId: string, email: string): Promise<number> {
	const trimmedEmail = email.trim().toLowerCase();

	const guestOrdersSnap = await adminDb.collection('orders').where('userId', '==', null).limit(BATCH_SIZE).get();

	const guestDocs = guestOrdersSnap.docs.filter((doc) => {
		const orderEmail = (doc.data().email as string)?.trim().toLowerCase();
		return orderEmail === trimmedEmail;
	});

	if (guestDocs.length === 0) {
		return 0;
	}

	const batch = adminDb.batch();
	guestDocs.forEach((doc) => batch.update(doc.ref, { userId }));
	await batch.commit();

	return guestDocs.length;
}

export async function linkGuestOrdersByEmailBatch(userId: string, email: string): Promise<number> {
	const trimmedEmail = email.trim();

	const guestOrdersSnap = await adminDb
		.collection('orders')
		.where('userId', '==', null)
		.where('email', '==', trimmedEmail)
		.get();

	if (guestOrdersSnap.empty) {
		return 0;
	}

	const { docs } = guestOrdersSnap;
	for (let i = 0; i < docs.length; i += BATCH_SIZE) {
		const batch = adminDb.batch();
		docs.slice(i, i + BATCH_SIZE).forEach((doc) => {
			batch.update(doc.ref, { userId });
		});
		await batch.commit();
	}

	return docs.length;
}
