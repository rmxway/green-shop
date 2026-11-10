import { LayoutGroup, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Container } from '@/components/Layout';
import { LogoSVG } from '@/components/Navbar/LogoSVG';
import { GradientText } from '@/components/ui/GradientText';
import { navbarItems, pageTitles } from '@/mock/navbar';

import { TopBlockStyle } from './styled';

export const TopBlock = () => {
	const pathname = usePathname();
	const isMain = pathname === '/';

	const getTitle = useMemo(() => {
		const mapTitles = new Map(navbarItems.map((item) => [item.url, item.title as string]));

		Object.entries(pageTitles).forEach((item) => {
			mapTitles.set(item[0], item[1]);
		});

		return mapTitles.has(pathname) ? mapTitles.get(pathname) : 'Товары';
	}, [pathname]);

	return (
		<TopBlockStyle $isFont={isMain}>
			<Container>
				<LayoutGroup>
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
				</LayoutGroup>
				<LogoSVG />
			</Container>
		</TopBlockStyle>
	);
};

export default TopBlock;
