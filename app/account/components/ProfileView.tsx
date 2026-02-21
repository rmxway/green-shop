import { InfoItem, InfoLabel, InfoValue } from '../styled';

type ProfileViewProps = {
	name?: string;
	surname?: string;
	phone?: string;
	deliveryAddress?: string;
};

const profileFields = [
	{ key: 'name', label: 'Имя' },
	{ key: 'surname', label: 'Фамилия' },
	{ key: 'phone', label: 'Телефон' },
	{ key: 'deliveryAddress', label: 'Адрес доставки' },
] as const;

export const ProfileView = ({ name, surname, phone, deliveryAddress }: ProfileViewProps) => {
	const data = { name, surname, phone, deliveryAddress };

	return (
		<>
			{profileFields.map(
				({ key, label }) =>
					data[key] && (
						<InfoItem key={key}>
							<InfoLabel>{label}:</InfoLabel>
							<InfoValue>{data[key]}</InfoValue>
						</InfoItem>
					),
			)}
		</>
	);
};
