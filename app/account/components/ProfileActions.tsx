import Link from 'next/link';

import { Count } from '@/components/Navbar/Count';
import { Button } from '@/components/ui';

import { OrderButtonWrapper, ProfileFormActions } from '../styled';

type ProfileActionsProps = {
	isEditing: boolean;
	saving: boolean;
	ordersCount: number | null;
	onEdit: () => void;
	onCancelEdit: () => void;
	onSave: () => void;
	onLogout: () => void;
};

export const ProfileActions = ({
	isEditing,
	saving,
	ordersCount,
	onEdit,
	onCancelEdit,
	onSave,
	onLogout,
}: ProfileActionsProps) => {
	const hasOrders = ordersCount !== null && ordersCount > 0;
	const ordersBtn = (
		<Button $primary $w100 disabled={!hasOrders} icon="cart">
			Мои заказы
		</Button>
	);

	return (
		<>
			{isEditing ? (
				<ProfileFormActions>
					<Button $w100 onClick={onCancelEdit} disabled={saving}>
						Отмена
					</Button>
					<Button $w100 $primary onClick={onSave} disabled={saving}>
						{saving ? 'Сохранение…' : 'Сохранить'}
					</Button>
				</ProfileFormActions>
			) : (
				<Button $w100 $primary onClick={onEdit}>
					Редактировать
				</Button>
			)}

			<OrderButtonWrapper>
				{hasOrders ? <Link href="/account/orders">{ordersBtn}</Link> : ordersBtn}
				<Count count={ordersCount ?? 0} />
			</OrderButtonWrapper>

			<Button $w100 onClick={onLogout}>
				Выйти
			</Button>
		</>
	);
};
