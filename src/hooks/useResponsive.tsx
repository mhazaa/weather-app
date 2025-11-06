import { useState, useEffect } from 'react';
import theme from '../styles/theme';

const getIsMobile = () => window.innerWidth <= theme.breakpoints.mobile;
const getIsTablet = () => window.innerWidth <= theme.breakpoints.tablet;
const getIsDesktop = () => window.innerWidth <= theme.breakpoints.desktop;

const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(getIsMobile());
	const [isTablet, setIsTablet] = useState(getIsTablet());
	const [isDesktop, setIsDesktop] = useState(getIsDesktop());
    
	useEffect(() => {
		const onResize = () => {
			setIsMobile(getIsMobile());
			setIsTablet(getIsTablet());
			setIsDesktop(getIsDesktop());
		};
		
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);
    
	return { isMobile, isTablet, isDesktop };
};

export default useResponsive;