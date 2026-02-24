import { ValidationError } from 'yup';

export function parseValidationError(error: unknown): Record<string, string> | null {
	if (error instanceof ValidationError && error.inner) {
		return error.inner.reduce(
			(acc, err) => {
				if (err.path) {
					acc[err.path] = err.message;
				}
				return acc;
			},
			{} as Record<string, string>,
		);
	}
	return null;
}

export function parseRequestBody<T>(body: unknown): T {
	if (typeof body !== 'object' || body === null) {
		const error = new Error('Неверный формат данных');
		error.name = 'ValidationError';
		throw error;
	}
	return body as T;
}
