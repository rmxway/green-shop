import { darken, lighten } from 'polished';
import styled from 'styled-components';

import { media } from '@/theme';

export const OrdersSection = styled.section`
	padding: 40px 0;
	min-height: 70vh;
`;

export const OrdersLoaderWrapper = styled.div`
	min-height: 70vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const OrdersHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
`;

export const OrderEmptyState = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	padding: 60px 0;
`;

export const OrderDetails = styled.div`
	margin-top: 15px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.gray.$6};

	p {
		margin: 0 0 4px;
	}
`;

export const OrderCard = styled.div`
	padding: 20px;
	background: ${({ theme }) => theme.colors.light};
	border-radius: 12px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	margin-bottom: 20px;

	${media.lessThan('xsD')`
		padding: 16px;
	`}
`;

export const OrderHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding-bottom: 15px;
	gap: 16px;

	${media.lessThan('xsD')`
		flex-direction: column;
		gap: 12px;
	`}
`;

export const OrderHeaderInfo = styled.div`
	min-width: 0;
	flex-shrink: 0;
`;

export const OrderHeaderActions = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;

	${media.lessThan('xsD')`
		width: 100%;
		flex-wrap: wrap;
		gap: 8px;
	`}
`;

export const OrderId = styled.h3`
	font-size: 18px;
	font-weight: 600;
	margin: 0;
	color: ${({ theme }) => theme.colors.gray.$9};
	margin-bottom: 5px;
	word-break: break-word;

	${media.lessThan('xsD')`
		font-size: 16px;
	`}
`;

export const OrderDate = styled.p`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.gray.$6};

	${media.lessThan('xsD')`
		font-size: 13px;
	`}
`;

export const OrderStatus = styled.span<{ $status: string }>`
	display: inline-flex;
	align-items: center;
	height: 35px;
	padding: 0 12px;
	box-sizing: border-box;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 500;
	white-space: nowrap;

	${media.lessThan('xsD')`
		height: 33px;
		padding: 0 10px;
		font-size: 13px;
	`}
	background: ${({ theme, $status }) => {
		switch ($status) {
			case 'completed':
				return lighten(0.4, theme.colors.success);
			case 'processing':
				return lighten(0.35, theme.colors.primary);
			case 'cancelled':
				return lighten(0.3, theme.colors.danger);
			default:
				return lighten(0.4, theme.colors.link);
		}
	}};
	color: ${({ theme, $status }) => {
		switch ($status) {
			case 'completed':
				return darken(0.3, theme.colors.success);
			case 'processing':
				return darken(0.4, theme.colors.primary);
			case 'cancelled':
				return darken(0.2, theme.colors.danger);
			default:
				return darken(0.3, theme.colors.link);
		}
	}};
`;

export const OrderItems = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const OrderItem = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px;
	background: ${({ theme }) => theme.colors.gray.$2};
	border-radius: ${({ theme }) => theme.radius.borderRadius};
`;

export const OrderItemImage = styled.div`
	width: 45px;
	height: 45px;
	background: ${({ theme }) => theme.colors.light};
	border-radius: ${({ theme }) => theme.radius.borderRadius};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.gray.$6};
	font-size: 24px;
	font-weight: 700;
	flex-shrink: 0;

	${media.lessThan('xsD')`
		display: none;
	`}
`;

export const OrderItemDetails = styled.div`
	flex: 1;

	p {
		font-size: 14px;
		color: ${({ theme }) => theme.colors.gray.$6};
		margin-top: 5px;
	}
`;

export const OrderItemTitle = styled.h4`
	font-size: 16px;
	font-weight: 500;
	flex-grow: 1;
	margin: 0;
	color: ${({ theme }) => theme.colors.gray.$9};
`;

export const OrderItemPrice = styled.div`
	font-size: 18px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.gray.$9};
`;

export const OrderTotal = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
	font-size: 20px;
	padding-top: 15px;
	color: ${({ theme }) => theme.colors.gray.$9};

	strong {
		font-weight: 600;
	}
`;
