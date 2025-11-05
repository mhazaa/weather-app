import React, { useState, CSSProperties } from 'react';
import FavoriteIcon from '../SVGComponents/FavoriteIcon';

interface CurrentLocationProps {
	city: string;
	state: string;
	favoriteLocations: string[];
	setFavoriteLocations: (favoriteLocations: string[]) => void;
};

const CurrentLocation: React.FC<CurrentLocationProps> = ({
	city,
	state,
	favoriteLocations,
	setFavoriteLocations,
}) => {
	const [favoriteIconHovered, setFavoriteIconHovered] = useState<boolean>(false);

	const styles: {
		[key: string]: CSSProperties;
	} = {
		currentLocationWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: '10px',
		},
		cityTitle: {
		},
		favoriteIconButton: {
			width: '65px',
			height: 'auto',
			paddingLeft: '20px',
			paddingTop: '10px',
		},
	};

	const favoriteIconOnClick = () => {
		if (city.length === 0) return;

		return (!favoriteLocations.includes(city))
			? setFavoriteLocations([...favoriteLocations, city])
			: setFavoriteLocations(favoriteLocations.filter(_location => _location !== location));
	};

	return (
		<div style={styles.currentLocationWrapper}>
			<h2 style={styles.cityTitle}>{city}, {state}</h2>
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