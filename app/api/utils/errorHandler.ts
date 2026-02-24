import { NextResponse } from 'next/server';

import { apiError, apiServerError, apiUnauthorized } from './apiResponse';
import { parseValidationError } from './validation';

export function handleApiError(error: unknown, defaultMessage: string): NextResponse {
	// Ошибка авторизации
	if (error instanceof Error && error.message === 'UNAUTHORIZED') {
		return apiUnauthorized();
	}

	// Ошибка валидации Yup
	const validationErrors = parseValidationError(error);
	if (validationErrors) {
		return apiError(validationErrors, 400);
	}

	// Ошибка валидации формата данных
	if (error instanceof Error && error.name === 'ValidationError') {
		// eslint-disable-next-line no-console
		console.error(`${defaultMessage}:`, error);
		return apiError(error.message, 400);
	}

	// Кастомная ошибка с сообщением
	if (error instanceof Error) {
		// eslint-disable-next-line no-console
		console.error(`${defaultMessage}:`, error);
		return apiError(error.message, 400);
	}

	// Неизвестная ошибка
	// eslint-disable-next-line no-console
	console.error(`${defaultMessage}:`, error);
	return apiServerError(defaultMessage);
}
