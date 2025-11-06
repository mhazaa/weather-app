import React, { useState, CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import locationNameParser from '../functions/locationNameParser';
import { Location } from '../types';
import FavoriteIcon from '../SVGComponents/FavoriteIcon';

interface CurrentLocationProps {
	currentLocation: Location;
	isFavorited: boolean;
	setFavoriteLocations: (favoriteLocations: Location[]) => void;
};

const CurrentLocation: React.FC<CurrentLocationProps> = ({
	currentLocation,
	isFavorited,
	setFavoriteLocations,
}) => {
	const [favoriteIconHovered, setFavoriteIconHovered] = useState<boolean>(false);
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		currentLocationWrapper: {
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
		console.log(isFavorited);
		//setFavoriteLocations((prev) => [...prev, currentLocation]);
		//if (!currentLocation) return;

		/*return (!favoriteLocations.includes(city))
			? setFavoriteLocations([...favoriteLocations, city])
			: setFavoriteLocations(favoriteLocations.filter(_location => _location !== location));*/
	};

	return (
		<div style={styles.currentLocationWrapper}>
			<h2 style={styles.cityTitle}>{locationNameParser(currentLocation)}</h2>
			
			<a
				style={styles.favoriteIconButton}
				onMouseEnter={() => setFavoriteIconHovered(true)}
				onMouseLeave={() => setFavoriteIconHovered(false)}
				onClick={favoriteIconOnClick}
			>
				<FavoriteIcon
					fill={favoriteIconHovered ? 'white' : 'none'}
					stroke='white'
					strokeWidth={5}
				/>
			</a>
		</div>
	);
};

export default CurrentLocation;