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

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
	__esModule: true,
	default: jest.fn(),
	getServerSession: (...args: unknown[]) => mockGetServerSession(...args),
}));

jest.mock('@/app/api/auth/[...nextauth]/route', () => ({ authOptions: {} }));

const mockOrdersGet = jest.fn();
const mockGuestGet = jest.fn();
const mockBatchUpdate = jest.fn();
const mockBatchCommit = jest.fn();

jest.mock('@/lib/firebase-admin', () => ({
	adminDb: {
		collection: jest.fn(() => ({
			where: jest.fn((field: string, _op: string, value: unknown) => {
				if (field === 'userId' && value === null) {
					return {
						limit: jest.fn(() => ({
							get: mockGuestGet,
						})),
					};
				}
				return {
					orderBy: jest.fn(() => ({
						get: mockOrdersGet,
					})),
				};
			}),
		})),
		batch: jest.fn(() => ({
			update: mockBatchUpdate,
			commit: mockBatchCommit,
		})),
	},
}));

const mockSession = (user: { id: string; email: string } | null) => {
	mockGetServerSession.mockResolvedValue(user ? { user } : null);
};

describe('GET /api/orders', () => {
	beforeEach(() => jest.clearAllMocks());

	it('should return 401 when not authenticated', async () => {
		mockSession(null);
		const res = await GET();

		expect(res.status).toBe(401);
		const data = await res.json();
		expect(data.error).toBe('Не авторизован');
	});

	it('should return orders for authenticated user', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });
		mockGuestGet.mockResolvedValueOnce({ docs: [] });
		mockOrdersGet.mockResolvedValueOnce({
			docs: [
				{
					id: 'order-1',
					data: () => ({
						name: 'Мария',
						totalPrice: 500,
						status: 'pending',
					}),
				},
			],
		});

		const res = await GET();

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.orders).toHaveLength(1);
		expect(data.orders[0].id).toBe('order-1');
	});

	it('should link guest orders by email', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });

		const guestDoc = {
			ref: { id: 'guest-order' },
			data: () => ({ email: 'test@test.com' }),
		};
		mockGuestGet.mockResolvedValueOnce({ docs: [guestDoc] });
		mockOrdersGet.mockResolvedValueOnce({ docs: [] });

		await GET();

		expect(mockBatchUpdate).toHaveBeenCalledWith(guestDoc.ref, { userId: 'user-1' });
		expect(mockBatchCommit).toHaveBeenCalled();
	});

	it('should not link orders with different email', async () => {
		mockSession({ id: 'user-1', email: 'test@test.com' });

		const guestDoc = {
			ref: { id: 'guest-order' },
			data: () => ({ email: 'other@test.com' }),
		};
		mockGuestGet.mockResolvedValueOnce({ docs: [guestDoc] });
		mockOrdersGet.mockResolvedValueOnce({ docs: [] });

		await GET();

		expect(mockBatchUpdate).not.toHaveBeenCalled();
	});
});
