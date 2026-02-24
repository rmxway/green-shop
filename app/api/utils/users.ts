import { adminDb } from '@/lib/firebase-admin';

export async function checkEmailExists(email: string): Promise<boolean> {
	const trimmedEmail = email.trim();
	const snapshot = await adminDb.collection('users').where('email', '==', trimmedEmail).limit(1).get();
	return !snapshot.empty;
}

export async function getUserByEmail(email: string) {
	const trimmedEmail = email.trim();
	const snapshot = await adminDb.collection('users').where('email', '==', trimmedEmail).limit(1).get();
	return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}
