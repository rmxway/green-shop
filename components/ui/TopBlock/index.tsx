import { LayoutGroup } from 'framer-motion';
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
						{isMain ? (
							<>
								<h1>
									Green Shop <span>| Brand</span>
								</h1>
								<br />
								<p>Магазин в котором можно найти полезные и качественные продукты.</p>
							</>
						) : (
							<h2>{getTitle}</h2>
						)}
					</GradientText>
				</LayoutGroup>
				<LogoSVG />
			</Container>
		</TopBlockStyle>
	);
};

export default TopBlock;
