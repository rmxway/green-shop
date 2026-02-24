import { emailRegex, phoneRegex } from './regexes';

describe('emailRegex', () => {
	const validEmails = [
		'user@example.com',
		'test.user@domain.org',
		'user+tag@mail.co',
		'USER@EXAMPLE.COM',
		'user123@test.io',
		'a@b.cd',
	];

	const invalidEmails = ['', 'plaintext', '@no-local.com', 'user@', 'user@.com', 'user@domain', 'user @mail.com'];

	it.each(validEmails)('should match valid email: %s', (email) => {
		expect(emailRegex.test(email)).toBe(true);
	});

	it.each(invalidEmails)('should not match invalid email: "%s"', (email) => {
		expect(emailRegex.test(email)).toBe(false);
	});
});

describe('phoneRegex', () => {
	const validPhones = ['+7 (999) 123-45-67', '+7 (000) 000-00-00', '+7 (912) 345-67-89'];

	const invalidPhones = [
		'',
		'89991234567',
		'+7 999 123-45-67',
		'+7 (999) 1234567',
		'+7(999)123-45-67',
		'+8 (999) 123-45-67',
		'+7 (999) 123-45-6',
		'+7 (99) 123-45-67',
	];

	it.each(validPhones)('should match valid phone: %s', (phone) => {
		expect(phoneRegex.test(phone)).toBe(true);
	});

	it.each(invalidPhones)('should not match invalid phone: "%s"', (phone) => {
		expect(phoneRegex.test(phone)).toBe(false);
	});
});
