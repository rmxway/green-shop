import { LayoutGroup, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Container } from '@/components/Layout';
import { GradientText } from '@/components/ui/GradientText';
import { navbarItems, pageTitles } from '@/mock/navbar';
import { useAppSelector } from '@/services';
import { productsStore } from '@/store/types';

import { TopBlockStyle } from './styled';

export const TopBlock = () => {
	const { title: titleStore } = useAppSelector(productsStore);
	const pathname = usePathname();
	const isMain = pathname === '/';

	const $isFont = isMain;

	const getTitle = useMemo(
		() => titleStore || navbarItems.find((item) => item.url === pathname)?.title || pageTitles[pathname],
		[pathname, titleStore],
	);

	return (
		<TopBlockStyle {...{ $isFont }}>
			<Container>
				<LayoutGroup>
					{getTitle && (
						<GradientText gradient="softDark">
							<motion.h1
								initial={{ y: -10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								{isMain ? (
									<>
										Green Shop <span>| Brand</span>
									</>
								) : (
									getTitle
								)}
							</motion.h1>
						</GradientText>
					)}
				</LayoutGroup>
			</Container>
		</TopBlockStyle>
	);
};

export default TopBlock;
