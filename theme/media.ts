import { generateMedia } from 'styled-media-query';

interface BreakpointsType {
	xl: string;
	xlD: string;
	lg: string;
	lgD: string;
	md: string;
	mdD: string;
	sm: string;
	smD: string;
	xs: string;
	xsD: string;
	xxs: string;
}

const breakpoints: BreakpointsType = {
	xl: '1400px',
	xlD: '1399px',
	lg: '1280px',
	lgD: '1279px',
	md: '1024px',
	mdD: '1023px',
	sm: '768px',
	smD: '767px',
	xs: '600px',
	xsD: '599px',
	xxs: '420px',
};

const media = generateMedia(breakpoints);

export { breakpoints, media };
export default media;
