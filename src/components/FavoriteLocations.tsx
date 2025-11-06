import React, { CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Separator from './Separator';
import locationNameParser from '../functions/locationNameParser';
import theme from '../styles/theme';
import { Location } from '../types';
import favoritesCloud from '../assets/favorites-cloud.svg';

interface FavoriteLocationsProps {
	usersLocation: Location;
	setCurrentLocation: (location: Location) => void;
	favoriteLocations: Location[];
};

const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
	usersLocation,
	setCurrentLocation,
	favoriteLocations,
}) => {
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		favoritesCloud: {
			width: isMobile ? '300px' : '250px',
		},
		buttonText: {
			position: 'absolute',
			bottom: '0',
			color: theme.colors.blue,
		},
		usersLocation: {
			height: '40px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	};

	const favoriteLocationOnClick = (location: Location) => {
		setCurrentLocation(location);
	};
	
	return (
		<div>
			<a className='cloud-wrapper'>
				<img style={styles.favoritesCloud} src={favoritesCloud} alt='favorites-cloud' />
				<h3 style={styles.buttonText}>Favorite Locations</h3>
			</a>

			{isMobile && <Separator />}

			<div>
				<a style={styles.usersLocation} onClick={() => favoriteLocationOnClick(usersLocation)} tabIndex={0}>
					<h4>{locationNameParser(usersLocation)} (Current Location)</h4>
				</a>

				<div>
					{favoriteLocations.map((location: Location, i: number) => (
						<a key={i} onClick={() => favoriteLocationOnClick(location)} tabIndex={0}>
							<h4>{locationNameParser(location)}</h4>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default FavoriteLocations;