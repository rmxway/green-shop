import 'next-auth';

declare module 'next-auth' {
	interface User {
		id: string;
		email: string;
		name?: string;
		surname?: string;
		phone?: string;
		deliveryAddress?: string;
	}

	interface Session {
		user: {
			id: string;
			email: string;
			name?: string;
			surname?: string;
			phone?: string;
			deliveryAddress?: string;
		};
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		email: string;
		name?: string;
		surname?: string;
		phone?: string;
		deliveryAddress?: string;
	}
}
