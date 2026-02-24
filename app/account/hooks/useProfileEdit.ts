import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type ProfileFormState = {
	name: string;
	surname: string;
	phone: string;
	deliveryAddress: string;
};

const emptyProfileForm: ProfileFormState = {
	name: '',
	surname: '',
	phone: '',
	deliveryAddress: '',
};

const isFormChanged = (form: ProfileFormState, initial: ProfileFormState): boolean =>
	form.name !== initial.name ||
	form.surname !== initial.surname ||
	form.phone !== initial.phone ||
	form.deliveryAddress !== initial.deliveryAddress;

export const useProfileEdit = () => {
	const { data: session, update: updateSession } = useSession();
	const [isEditing, setIsEditing] = useState(false);
	const [form, setForm] = useState<ProfileFormState>(emptyProfileForm);
	const [initialForm, setInitialForm] = useState<ProfileFormState>(emptyProfileForm);
	const [saveError, setSaveError] = useState('');
	const [saving, setSaving] = useState(false);
	const [profileSnapshot, setProfileSnapshot] = useState<ProfileFormState | null>(null);

	const displayUser = useMemo(
		() => (profileSnapshot && session?.user ? { ...session.user, ...profileSnapshot } : session?.user),
		[session?.user, profileSnapshot],
	);

	const fillFormFromDisplayUser = useCallback(() => {
		if (!displayUser) return;
		const values = {
			name: displayUser.name ?? '',
			surname: displayUser.surname ?? '',
			phone: displayUser.phone ?? '',
			deliveryAddress: displayUser.deliveryAddress ?? '',
		};
		setForm(values);
		setInitialForm(values);
	}, [displayUser]);

	useEffect(() => {
		if (isEditing && displayUser) fillFormFromDisplayUser();
	}, [isEditing, displayUser, fillFormFromDisplayUser]);

	const hasChanges = isFormChanged(form, initialForm);

	const handleEdit = () => {
		setSaveError('');
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setSaveError('');
	};

	const handleFormChange = (e: { target: { name: string; value: string } }) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSave = async () => {
		if (!session?.user) return;
		setSaveError('');
		setSaving(true);
		try {
			const res = await fetch('/api/profile', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || 'Не удалось сохранить профиль');
			}

			// Обновляем snapshot сразу для мгновенного обновления UI страницы
			setProfileSnapshot(form);
			setIsEditing(false);

			// Вызываем update() без аргументов — NextAuth подгрузит свежие данные из БД через JWT callback
			await updateSession();
		} catch (err) {
			setSaveError(err instanceof Error ? err.message : 'Произошла ошибка');
		} finally {
			setSaving(false);
		}
	};

	return {
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
	};
};
