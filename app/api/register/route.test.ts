import bcrypt from 'bcryptjs';

import { POST } from './route';

jest.mock('next/server', () => ({
	NextResponse: {
		json: (body: unknown, init?: ResponseInit) =>
			new Response(JSON.stringify(body), {
				...init,
				headers: { 'Content-Type': 'application/json' },
			}),
	},
}));

const mockGet = jest.fn();
const mockAdd = jest.fn();

const mockBatch = {
	update: jest.fn(),
	commit: jest.fn(),
};

jest.mock('@/lib/firebase-admin', () => ({
	adminDb: {
		collection: jest.fn(() => ({
			where: jest.fn(() => ({
				limit: jest.fn(() => ({
					get: mockGet,
				})),
				get: mockGet,
				where: jest.fn(() => ({
					get: mockGet,
				})),
			})),
			add: mockAdd,
		})),
		batch: jest.fn(() => mockBatch),
	},
}));

jest.mock('bcryptjs');

const createRequest = (body: unknown) =>
	new Request('http://localhost/api/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

describe('POST /api/register', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
	});

	it('should return 400 for invalid body format', async () => {
		const req = new Request('http://localhost/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify('invalid'),
		});
		const res = await POST(req);

		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe('Неверный формат данных');
	});

	it('should return 400 when email is missing', async () => {
		const res = await POST(createRequest({ password: '123456' }));

		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe('Email и пароль обязательны');
	});

	it('should return 400 when password is missing', async () => {
		const res = await POST(createRequest({ email: 'test@test.com' }));

		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe('Email и пароль обязательны');
	});

	it('should return 400 when password is too short', async () => {
		const res = await POST(createRequest({ email: 'test@test.com', password: '123' }));

		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe('Пароль должен быть не менее 6 символов');
	});

	it('should return 400 when user already exists', async () => {
		mockGet.mockResolvedValueOnce({ empty: false });

		const res = await POST(
			createRequest({
				email: 'existing@test.com',
				password: '123456',
			}),
		);

		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe('Пользователь с таким email уже существует');
	});

	it('should register user successfully', async () => {
		mockGet.mockResolvedValueOnce({ empty: true });
		mockAdd.mockResolvedValueOnce({ id: 'new-user-id' });
		mockGet.mockResolvedValueOnce({ empty: true, docs: [] });

		const res = await POST(
			createRequest({
				email: 'new@test.com',
				password: '123456',
				name: 'Мария',
				surname: 'Иванова',
				phone: '+7 (999) 123-45-67',
				deliveryAddress: 'ул. Главная, 1',
			}),
		);

		expect(res.status).toBe(201);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.user.email).toBe('new@test.com');
		expect(data.user.name).toBe('Мария');
		expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
	});

	it('should link guest orders on registration', async () => {
		mockGet.mockResolvedValueOnce({ empty: true });
		mockAdd.mockResolvedValueOnce({ id: 'new-user-id' });

		const guestDocs = [{ ref: { id: 'order-1' } }, { ref: { id: 'order-2' } }];
		mockGet.mockResolvedValueOnce({ empty: false, docs: guestDocs });

		const res = await POST(
			createRequest({
				email: 'guest@test.com',
				password: '123456',
			}),
		);

		expect(res.status).toBe(201);
		expect(mockBatch.update).toHaveBeenCalledTimes(2);
		expect(mockBatch.commit).toHaveBeenCalled();
	});
});
