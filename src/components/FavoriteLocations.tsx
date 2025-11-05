import React, { CSSProperties } from 'react';
import theme from '../styles/theme';
import favoritesCloud from '../assets/favorites-cloud.svg';

interface FavoriteLocationsProps {
	city: string;
	favoriteLocations: string[];
}

const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
	city,
	favoriteLocations,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		favoritesCloud: {
			width: '250px',
		},
		buttonText: {
			position: 'absolute',
			bottom: '0',
			color: theme.colors.blue,
		},
		currentLocation: {
			height: '40px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	};

	const favoriteCityOnClick = (favorite?: string) => {
		if (!favorite) return;
		console.log(favorite);
	};
	
	return (
		<div>
			<a className='cloud-wrapper'>
				<img style={styles.favoritesCloud} src={favoritesCloud} alt='favorites-cloud' />
				<h3 style={styles.buttonText}>Favorite Locations</h3>
			</a>

			<div>
				<a style={styles.currentLocation}>
					<h4>{city} (Current Location)</h4>
				</a>
				<div>
					{favoriteLocations.map((location: string, i: number) => (
						<a key={i} onClick={() => favoriteCityOnClick(favoriteLocations[i])}>
							<h4>{location}</h4>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default FavoriteLocations;