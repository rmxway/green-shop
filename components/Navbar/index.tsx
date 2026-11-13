import Link from 'next/link';

import { Container, Flexbox, Space } from '@/components/Layout';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useMediaQuery } from '@/services';
import { breakpoints } from '@/theme';

import { LogoSVG } from './LogoSVG';
import { RenderNavbar } from './RenderNavbar';
import { Logo, StyledNavbar } from './styled';

export const Navbar = () => {
	const match = useMediaQuery(breakpoints.md);

	return (
		<StyledNavbar layoutRoot className={!match ? 'scroll-lock-compensate' : ''}>
			<Container>
				<Flexbox $align="center" $nowrap $gap={10}>
					<Logo>
						<Link href="/" />
						<LogoSVG />
						<span>
							Green Shop <br />
							Brand
						</span>
					</Logo>
					<Space />
					<ThemeToggle />
					<RenderNavbar />
				</Flexbox>
			</Container>
		</StyledNavbar>
	);
};

export default Navbar;
