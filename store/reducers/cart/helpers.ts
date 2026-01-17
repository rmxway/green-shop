import { CartState } from '@/types';

interface StateAndProps {
	state: CartState;
	id: number;
}

export const getCurrentItem = ({ state, id }: StateAndProps) => state.items.find((item) => item.id === id);

export const changeCount = ({ state, id, type }: StateAndProps & { type: 'increase' | 'decrease' }) => {
	const cur = getCurrentItem({ state, id });

	if (!cur) return;

	if (type === 'increase') {
		cur.count = (cur.count || 1) + 1;
	} else if (type === 'decrease' && cur.count && cur.count > 1) {
		cur.count -= 1;
	}
};

export const calculateTotalPrice = (state: CartState) => {
	state.totalPrice = !state.items.length
		? 0
		: Number(state.items.reduce((acc: number, curr) => acc + curr.price * (curr.count || 1), 0));
};
