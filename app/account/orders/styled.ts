import { darken, lighten } from 'polished';
import styled from 'styled-components';

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
	padding: 30px;
	background: ${({ theme }) => theme.colors.gray.$1};
	border-radius: 12px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	margin-bottom: 20px;
`;

export const OrderHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 20px;
	padding-bottom: 15px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray.$3};
`;

export const OrderId = styled.h3`
	font-size: 18px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.gray.$9};
	margin-bottom: 5px;
`;

export const OrderDate = styled.p`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.gray.$6};
`;

export const OrderStatus = styled.span<{ $status: string }>`
	padding: 6px 12px;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 500;
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
	gap: 15px;
	margin-bottom: 20px;
`;

export const OrderItem = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 15px;
	background: ${({ theme }) => theme.colors.gray.$2};
	border-radius: 8px;
`;

export const OrderItemImage = styled.div`
	width: 60px;
	height: 60px;
	background: ${({ theme }) => theme.colors.primary};
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 24px;
	font-weight: 700;
	flex-shrink: 0;
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
	border-top: 1px solid ${({ theme }) => theme.colors.gray.$3};
	color: ${({ theme }) => theme.colors.gray.$9};

	strong {
		font-weight: 600;
	}
`;
