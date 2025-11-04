import React, { CSSProperties } from 'react';
import favoriteIcon from '../assets/favorite-icon.svg';

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
	const styles: {
		[key: string]: CSSProperties;
	} = {
		currentCityWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		cityTitle: {
			marginRight: '10px',
		},
		favoriteIconButton: {
		},
		favoriteIcon: {
			width: '50px',
			height: 'auto',
		},
	};

	const favoriteIconOnClick = () => {
		if (city.length === 0) return;

		if (!favoriteCities.includes(city)) {
			setFavoritesCities([...favoriteCities, city]);
		} else {
			setFavoritesCities(favoriteCities.filter(_city => _city !== city));
		}
	};

	return (
		<div style={styles.currentCityWrapper}>
			<h2 style={styles.cityTitle}>{city}, {state}</h2>
			<a style={styles.favoriteIconButton} onClick={favoriteIconOnClick}>
				<img style={styles.favoriteIcon} src={favoriteIcon} alt='favorite-icon' />
			</a>
		</div>
	);
};

export default CurrentCity;