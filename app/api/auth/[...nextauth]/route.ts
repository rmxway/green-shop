import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { adminDb } from '@/lib/firebase-admin';

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Введите email и пароль');
				}

				const querySnapshot = await adminDb.collection('users').where('email', '==', credentials.email).get();

				if (querySnapshot.empty) {
					throw new Error('Пользователь не найден');
				}

				const userDoc = querySnapshot.docs[0];
				const userData = userDoc.data();

				const isPasswordValid = await bcrypt.compare(credentials.password, userData.passwordHash);

				if (!isPasswordValid) {
					throw new Error('Неверный пароль');
				}

				return {
					id: userDoc.id,
					email: userData.email,
					name: userData.name,
					surname: userData.surname,
					phone: userData.phone,
					deliveryAddress: userData.deliveryAddress,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.surname = (user as { surname?: string }).surname;
				token.phone = (user as { phone?: string }).phone;
				token.deliveryAddress = (user as { deliveryAddress?: string }).deliveryAddress;
			}

			// При вызове update() подгружаем свежие данные из БД
			if (trigger === 'update' && token.id) {
				try {
					const userDoc = await adminDb
						.collection('users')
						.doc(token.id as string)
						.get();
					if (userDoc.exists) {
						const userData = userDoc.data()!;
						token.name = userData.name;
						token.surname = userData.surname;
						token.phone = userData.phone;
						token.deliveryAddress = userData.deliveryAddress;
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('JWT update error:', error);
				}
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.user.surname = token.surname as string;
				session.user.phone = token.phone as string;
				session.user.deliveryAddress = token.deliveryAddress as string;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: Number(process.env.SESSION_MAX_AGE_MINUTES ?? 10) * 60, // минуты неактивности → выход после закрытия вкладки
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
