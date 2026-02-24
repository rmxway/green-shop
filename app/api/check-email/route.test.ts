import { GET } from './route';

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

jest.mock('@/lib/firebase-admin', () => ({
	adminDb: {
		collection: jest.fn(() => ({
			where: jest.fn(() => ({
				limit: jest.fn(() => ({
					get: mockGet,
				})),
			})),
		})),
	},
}));

const createRequest = (email?: string) => {
	const url = email
		? `http://localhost/api/check-email?email=${encodeURIComponent(email)}`
		: 'http://localhost/api/check-email';

	return new Request(url, { method: 'GET' });
};

describe('GET /api/check-email', () => {
	beforeEach(() => jest.clearAllMocks());

	it('should return registered: false when no email provided', async () => {
		const res = await GET(createRequest());

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.registered).toBe(false);
	});

	it('should return registered: true when user exists', async () => {
		mockGet.mockResolvedValueOnce({ empty: false });

		const res = await GET(createRequest('existing@test.com'));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.registered).toBe(true);
	});

	it('should return registered: false when user does not exist', async () => {
		mockGet.mockResolvedValueOnce({ empty: true });

		const res = await GET(createRequest('new@test.com'));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.registered).toBe(false);
	});

	it('should return registered: false on error', async () => {
		mockGet.mockRejectedValueOnce(new Error('DB error'));

		const res = await GET(createRequest('any@test.com'));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.registered).toBe(false);
	});
});
