import React, { CSSProperties } from 'react';
import theme from '../styles/theme';
import favoritesCloud from '../assets/favorites-cloud.svg';

interface FavoritesProps {
	city: string;
	favoriteCities: string[];
}

const Favorites: React.FC<FavoritesProps> = ({
	city,
	favoriteCities,
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
	};

	const favoriteCityOnClick = (favorite?: string) => {
		if (!favorite) return;
		console.log(favorite);
	};
	
	return (
		<div>
			<a className='cloud-wrapper'>
				<img style={styles.favoritesCloud} src={favoritesCloud} alt='favorites-cloud' />
				<h3 style={styles.buttonText}>Favorites</h3>
			</a>

			<div>
				<a>
					<h4>{city} (Current Location)</h4>
				</a>
				<div>
					{favoriteCities.map((city: string, i: number) => (
						<a key={i} onClick={() => favoriteCityOnClick(favoriteCities[i])}>
							<h4>{city}</h4>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Favorites;