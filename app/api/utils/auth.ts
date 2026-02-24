import { getServerSession,Session } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession(): Promise<Session | null> {
	return getServerSession(authOptions);
}

export async function requireAuth(): Promise<{ session: Session; userId: string }> {
	const session = await getSession();

	if (!session?.user?.id) {
		throw new Error('UNAUTHORIZED');
	}

	return { session, userId: session.user.id };
}
