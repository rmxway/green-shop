'use client';

import { AnimatePresence } from 'framer-motion';
import { FC, UIEvent, useRef } from 'react';

import { LinkIcon } from '@/components/ui/LinkIcon';
import { useScrollLock } from '@/services';

import { ModalBody, ModalHeader, ModalWindow, ModalWrapper, windowVariants, wrapperVariants } from './styled';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ open, onClose, title, children }) => {
	const wrapperRef = useRef(null);

	useScrollLock(open);

	const handleClose = (e: UIEvent) => {
		if (e.target === wrapperRef.current) onClose();
	};

	return (
		<AnimatePresence mode="sync" presenceAffectsLayout>
			{open && (
				<ModalWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					transition={{
						duration: 0.15,
					}}
					onClick={handleClose}
					ref={wrapperRef}
				>
					<ModalWindow variants={windowVariants}>
						<LinkIcon icon="times-small" onClick={onClose} />
						{title && <ModalHeader>{title}</ModalHeader>}
						<ModalBody>{children}</ModalBody>
					</ModalWindow>
				</ModalWrapper>
			)}
		</AnimatePresence>
	);
};

export default Modal;
