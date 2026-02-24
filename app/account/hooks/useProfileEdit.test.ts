import { act, renderHook } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import { useProfileEdit } from './useProfileEdit';

jest.mock('next-auth/react');

const mockUpdateSession = jest.fn();

const mockSession = (user: Record<string, string> | null) => {
	(useSession as jest.Mock).mockReturnValue({
		data: user ? { user } : null,
		update: mockUpdateSession,
	});
};

global.fetch = jest.fn();

describe('useProfileEdit', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockSession({
			id: 'u1',
			email: 'test@test.com',
			name: 'Мария',
			surname: 'Иванова',
			phone: '+7 (999) 123-45-67',
			deliveryAddress: 'ул. Главная, 1',
		});
	});

	it('should return initial state (not editing)', () => {
		const { result } = renderHook(() => useProfileEdit());

		expect(result.current.isEditing).toBe(false);
		expect(result.current.saving).toBe(false);
		expect(result.current.saveError).toBe('');
		expect(result.current.hasChanges).toBe(false);
	});

	it('should display user data from session', () => {
		const { result } = renderHook(() => useProfileEdit());

		expect(result.current.displayUser?.name).toBe('Мария');
		expect(result.current.displayUser?.email).toBe('test@test.com');
	});

	it('should toggle editing mode', () => {
		const { result } = renderHook(() => useProfileEdit());

		act(() => result.current.handleEdit());
		expect(result.current.isEditing).toBe(true);

		act(() => result.current.handleCancelEdit());
		expect(result.current.isEditing).toBe(false);
	});

	it('should populate form when editing starts', () => {
		const { result } = renderHook(() => useProfileEdit());

		act(() => result.current.handleEdit());

		expect(result.current.form.name).toBe('Мария');
		expect(result.current.form.surname).toBe('Иванова');
		expect(result.current.form.phone).toBe('+7 (999) 123-45-67');
		expect(result.current.form.deliveryAddress).toBe('ул. Главная, 1');
	});

	it('should detect form changes', () => {
		const { result } = renderHook(() => useProfileEdit());

		act(() => result.current.handleEdit());
		expect(result.current.hasChanges).toBe(false);

		act(() => {
			result.current.handleFormChange({ target: { name: 'name', value: 'Новое имя' } });
		});
		expect(result.current.hasChanges).toBe(true);
	});

	it('should save profile successfully', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ success: true }),
		});
		mockUpdateSession.mockResolvedValueOnce(undefined);

		const { result } = renderHook(() => useProfileEdit());

		act(() => result.current.handleEdit());
		act(() => {
			result.current.handleFormChange({ target: { name: 'name', value: 'Новое' } });
		});

		await act(async () => {
			await result.current.handleSave();
		});

		expect(global.fetch).toHaveBeenCalledWith('/api/profile', expect.objectContaining({ method: 'PUT' }));
		expect(result.current.isEditing).toBe(false);
		expect(result.current.profileSnapshot).not.toBeNull();
		expect(mockUpdateSession).toHaveBeenCalled();
	});

	it('should handle save error', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			json: () => Promise.resolve({ error: 'Ошибка сервера' }),
		});

		const { result } = renderHook(() => useProfileEdit());

		act(() => result.current.handleEdit());

		await act(async () => {
			await result.current.handleSave();
		});

		expect(result.current.saveError).toBe('Ошибка сервера');
		expect(result.current.isEditing).toBe(true);
	});

	it('should not save when no session', async () => {
		mockSession(null);
		const { result } = renderHook(() => useProfileEdit());

		await act(async () => {
			await result.current.handleSave();
		});

		expect(global.fetch).not.toHaveBeenCalled();
	});
});
