'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => (
	<NextAuthSessionProvider>{children}</NextAuthSessionProvider>
);
