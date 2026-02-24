'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Container, Flexbox } from '@/components/Layout';
import { ErrorMessage, Loader } from '@/components/ui';

import { ProfileActions } from './components/ProfileActions';
import { ProfileEditForm } from './components/ProfileEditForm';
import { ProfileView } from './components/ProfileView';
import { useProfileEdit } from './hooks/useProfileEdit';
import {
	AccountButtonsRow,
	AccountCard,
	AccountCardContent,
	AccountGrid,
	AccountLoaderWrap,
	AccountSection,
	InfoItem,
	InfoLabel,
	InfoValue,
	WelcomeCard,
} from './styled';

export const AccountContent = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [ordersCount, setOrdersCount] = useState<number | null>(null);

	const {
		isEditing,
		form,
		saveError,
		saving,
		hasChanges,
		displayUser,
		profileSnapshot,
		handleEdit,
		handleCancelEdit,
		handleFormChange,
		handleSave,
	} = useProfileEdit();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	useEffect(() => {
		if (!session?.user) return;

		fetch('/api/orders')
			.then((res) => res.json())
			.then((data) => setOrdersCount(data.orders?.length ?? 0))
			.catch(() => setOrdersCount(0));
	}, [session]);

	const handleLogout = async () => {
		await signOut({ redirect: false });
		router.push('/');
	};

	if (status === 'loading') {
		return (
			<Container>
				<AccountLoaderWrap>
					<Loader loading />
				</AccountLoaderWrap>
			</Container>
		);
	}

	if (!session?.user) {
		return null;
	}

	return (
		<Container>
			<AccountSection>
				<WelcomeCard>
					<h2>Добро пожаловать, {displayUser?.name || session.user.email}! 👋</h2>
					<p>Управляйте своим профилем и просматривайте историю заказов</p>
				</WelcomeCard>

				<AccountGrid>
					<AccountCard key={profileSnapshot ? 'profile-updated' : 'profile-initial'}>
						<h3>Информация о профиле</h3>
						<AccountCardContent>
							<Flexbox $gap={15} $direction="column">
								<InfoItem>
									<InfoLabel>Email:</InfoLabel>
									<InfoValue>{session.user.email}</InfoValue>
								</InfoItem>

								{isEditing ? (
									<>
										<ProfileEditForm form={form} onChange={handleFormChange} />
										{saveError && <ErrorMessage error={saveError} />}
									</>
								) : (
									<ProfileView
										name={displayUser?.name}
										surname={displayUser?.surname}
										phone={displayUser?.phone}
										deliveryAddress={displayUser?.deliveryAddress}
									/>
								)}

								<AccountButtonsRow>
									<Flexbox $gap={15} $align="flex-start" className="btns" $nowrap>
										<ProfileActions
											isEditing={isEditing}
											saving={saving}
											hasChanges={hasChanges}
											ordersCount={ordersCount}
											onEdit={handleEdit}
											onCancelEdit={handleCancelEdit}
											onSave={handleSave}
											onLogout={handleLogout}
										/>
									</Flexbox>
								</AccountButtonsRow>
							</Flexbox>
						</AccountCardContent>
					</AccountCard>
				</AccountGrid>
			</AccountSection>
		</Container>
	);
};
