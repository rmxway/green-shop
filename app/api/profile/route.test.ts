import { GET, PUT } from './route';

jest.mock('next/server', () => ({
	NextResponse: {
		json: (body: unknown, init?: ResponseInit) =>
			new Response(JSON.stringify(body), {
				...init,
				headers: { 'Content-Type': 'application/json' },
			}),
	},
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
	__esModule: true,
	default: jest.fn(),
	getServerSession: (...args: unknown[]) => mockGetServerSession(...args),
}));

jest.mock('@/app/api/auth/[...nextauth]/route', () => ({ authOptions: {} }));

const mockGetDoc = jest.fn();
const mockUpdateDoc = jest.fn();

jest.mock('@/lib/firebase-admin', () => ({
	adminDb: {
		collection: jest.fn(() => ({
			doc: jest.fn(() => ({
				get: mockGetDoc,
				update: mockUpdateDoc,
			})),
		})),
	},
}));

const mockSession = (user: { id: string; email: string } | null) => {
	mockGetServerSession.mockResolvedValue(user ? { user } : null);
};

describe('GET /api/profile', () => {
	beforeEach(() => jest.clearAllMocks());

	it('should return 401 when not authenticated', async () => {
		mockSession(null);
		const res = await GET();

		expect(res.status).toBe(401);
		const data = await res.json();
		expect(data.error).toBe('Не авторизован');
	});

	it('should return 404 when user not found', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });
		mockGetDoc.mockResolvedValueOnce({ exists: false });

		const res = await GET();

		expect(res.status).toBe(404);
		const data = await res.json();
		expect(data.error).toBe('Пользователь не найден');
	});

	it('should return user profile', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });
		mockGetDoc.mockResolvedValueOnce({
			exists: true,
			id: 'user-1',
			data: () => ({
				email: 'test@test.com',
				name: 'Мария',
				surname: 'Иванова',
				phone: '+7 (999) 123-45-67',
				deliveryAddress: 'ул. Главная, 1',
			}),
		});

		const res = await GET();

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.user.name).toBe('Мария');
		expect(data.user.email).toBe('test@test.com');
	});
});

describe('PUT /api/profile', () => {
	beforeEach(() => jest.clearAllMocks());

	const createRequest = (body: unknown) =>
		new Request('http://localhost/api/profile', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

	it('should return 401 when not authenticated', async () => {
		mockSession(null);
		const res = await PUT(createRequest({ name: 'New' }));

		expect(res.status).toBe(401);
	});

	it('should return 400 for invalid body', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });
		const req = new Request('http://localhost/api/profile', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify('invalid'),
		});

		const res = await PUT(req);

		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe('Неверный формат данных');
	});

	it('should update profile successfully', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });
		mockUpdateDoc.mockResolvedValueOnce(undefined);

		const res = await PUT(
			createRequest({
				name: 'Новое Имя',
				phone: '+7 (999) 000-00-00',
			}),
		);

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(mockUpdateDoc).toHaveBeenCalledWith({
			name: 'Новое Имя',
			phone: '+7 (999) 000-00-00',
		});
	});

	it('should only update provided fields', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });
		mockUpdateDoc.mockResolvedValueOnce(undefined);

		const res = await PUT(createRequest({ name: 'Test' }));

		expect(res.status).toBe(200);
		expect(mockUpdateDoc).toHaveBeenCalledWith({ name: 'Test' });
	});
});
