import { FC, useState } from 'react';

import { Grid } from '@/components/Layout';
import { Button, LinkIcon, Modal } from '@/components/ui';

interface DialogModalProps {
	title: string;
	text: string;
	handleFn: () => void;
}

export const DialogModal: FC<DialogModalProps> = ({ title, text, handleFn }) => {
	const [modalShow, setModalShow] = useState(false);

	const onClose = () => setModalShow(false);

	const handleAction = () => {
		handleFn();
		onClose();
	};

	return (
		<>
			<LinkIcon icon="trash" onClick={() => setModalShow(true)} style={{ top: '10px', position: 'absolute' }}>
				{title}
			</LinkIcon>
			<Modal open={modalShow} {...{ title, onClose }}>
				<div>{text}</div>
				<br />
				<Grid $templateColumns="1fr 1fr" $gap={18}>
					<Button $danger onClick={handleAction}>
						Удалить
					</Button>
					<Button onClick={onClose}>Закрыть</Button>
				</Grid>
			</Modal>
		</>
	);
};
