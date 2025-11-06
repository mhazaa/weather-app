import React, { useState, CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import locationNameParser from '../functions/locationNameParser';
import { Location } from '../types';
import FavoriteIcon from '../SVGComponents/FavoriteIcon';

interface ActiveLocationProps {
	activeLocation: Location;
	addLocationToFavorites: (location: Location) => void;
};

const ActiveLocation: React.FC<ActiveLocationProps> = ({
	activeLocation,
	addLocationToFavorites,
}) => {
	const [isFavorited, setIsFavorited] = useState<boolean>(false);
	const [favoriteIconHovered, setFavoriteIconHovered] = useState<boolean>(false);
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		activeLocationWrapper: {
			display: 'flex',
			flexDirection: isMobile ? 'column-reverse' : 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: '20px',
		},
		cityTitle: {
		},
		favoriteIconButton: {
			width: '65px',
			height: 'auto',
			padding: isMobile ? '0 0 8px 0' : '10px 0 0 20px',
		},
	};

	const favoriteIconOnClick = () => {
		addLocationToFavorites(activeLocation);
		setIsFavorited(!isFavorited);
	};

	return (
		<div style={styles.activeLocationWrapper}>
			<h2 style={styles.cityTitle}>{locationNameParser(activeLocation)}</h2>
			
			<a
				style={styles.favoriteIconButton}
				onMouseEnter={() => setFavoriteIconHovered(true)}
				onMouseLeave={() => setFavoriteIconHovered(false)}
				onClick={favoriteIconOnClick}
				tabIndex={0}
			>
				<FavoriteIcon
					fill={isFavorited ? 'white' : favoriteIconHovered ? 'rgba(255,255,255,0.5)' :  'none'}
					stroke='white'
					strokeWidth={5}
				/>
			</a>
		</div>
	);
};

export default ActiveLocation;