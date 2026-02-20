import { createFormField, Input, Switcher } from '@/components/ui';
import { OrderFields } from '@/modules/cart/services/schemaOrder';

export const InputOrder = createFormField<OrderFields>(Input);
export const SwitchOrder = createFormField<OrderFields>(Switcher);
