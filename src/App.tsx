import React, { useState, useEffect, CSSProperties } from 'react';
import useResponsive from './hooks/useResponsive';
import Logo from './components/Logo';
import ActiveLocation from './components/ActiveLocation';
import LocationSelector from './components/LocationSelector';
import ForecastOverview from './components/ForecastOverview';
import FavoriteLocations from './components/FavoriteLocations';
import Separator from './components/Separator';
import LoadingScreen from './components/LoadingScreen';
import { getCoords, getLocationData } from './api';
import { Location } from './types';
import './styles/styleSheet.scss';

const App: React.FC = () => {
	const [activeLocation, setActiveLocation] = useState<Location | null>(null);
	const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
	const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
	const [isActiveLocationFavorited, setIsActiveLocationFavorited] = useState<boolean>(false);
	const [loadingMessage, setLoadingMessage] = useState<string | null>('Loading...');

	const { isMobile } = useResponsive();

	const styles: {
			[key: string]: CSSProperties;
	} = {
		wrapper: {
			width: '95%',
			maxWidth: '900px',
			margin: 'auto',
			textAlign: 'center',
		},
		sectionsWrapper: {
			position: 'relative',
			display: 'flex',
			flexDirection: isMobile ? 'column-reverse' : 'row',
			justifyContent: 'center',
		},
		seperatorWrapper: {
			position: 'absolute',
			width: '100%',
			top: '50px',
			left: '0',
		},
	};

	useEffect(() => {
		(async () => {
			try {
				setLoadingMessage('Loading current coordinates...');
				const { latitude, longitude } = await getCoords();
				setLoadingMessage('Loading current location data...');
				const { city, state } = await getLocationData(latitude, longitude);
				const location = { city, state, latitude, longitude };
				setActiveLocation(location);
				setCurrentLocation(location);
			} catch (e) {
				console.error(e);
			};
		})();
	}, []);

	useEffect(() => {
		if (!activeLocation) return;
		setIsActiveLocationFavorited(favoriteLocations.includes(activeLocation));
	}, [activeLocation]);

	const toggleLocationFavorite = (location: Location) => {
		const alreadyFavorited = favoriteLocations.includes(location);

		if (alreadyFavorited) {
			setFavoriteLocations(prevItems => prevItems.filter(item =>
				item.latitude !== location.latitude || item.longitude !== location.longitude
			));
		} else {
			setFavoriteLocations(prevItems => [...prevItems, location]);
		};
		
		setIsActiveLocationFavorited(!isActiveLocationFavorited);
	};

	return (
		<div>
			{loadingMessage &&
				<LoadingScreen loadingMessage={loadingMessage} />
			}
			<div style={styles.wrapper}>
				<Logo />

				{activeLocation && <ActiveLocation
					activeLocation={activeLocation}
					isActiveLocationFavorited={isActiveLocationFavorited}
					toggleLocationFavorite={toggleLocationFavorite}
				/>}

				{activeLocation && <ForecastOverview
					activeLocation={activeLocation}
					setLoadingMessage={setLoadingMessage}
				/>}

				{currentLocation &&
					<div style={styles.sectionsWrapper}>
						<LocationSelector setActiveLocation={setActiveLocation} />
						<FavoriteLocations
							currentLocation={currentLocation}
							setActiveLocation={setActiveLocation}
							favoriteLocations={favoriteLocations}
						/>
						{!isMobile &&
							<div style={styles.seperatorWrapper}>
								<Separator />
							</div>
						}
					</div>
				}
			</div>
		</div>
	);
};

export default App;