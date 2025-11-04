import React, { useState, CSSProperties } from 'react';
import FavoriteIcon from '../SVGComponents/FavoriteIcon';

interface CurrentCityProps {
	city: string;
	state: string;
	favoriteCities: string[];
	setFavoritesCities: (favoriteCities: string[]) => void;
};

const CurrentCity: React.FC<CurrentCityProps> = ({
	city,
	state,
	favoriteCities,
	setFavoritesCities,
}) => {
	const [favoriteIconHovered, setFavoriteIconHovered] = useState<boolean>(false);

	const styles: {
		[key: string]: CSSProperties;
	} = {
		currentCityWrapper: {
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

		return (!favoriteCities.includes(city))
			? setFavoritesCities([...favoriteCities, city])
			: setFavoritesCities(favoriteCities.filter(_city => _city !== city));
	};

	return (
		<div style={styles.currentCityWrapper}>
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

export default CurrentCity;