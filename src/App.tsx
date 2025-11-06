import React, { useState, useEffect, CSSProperties } from 'react';
import useResponsive from './hooks/useResponsive';
import Logo from './components/Logo';
import ActiveLocation from './components/ActiveLocation';
import LocationSelector from './components/LocationSelector';
import ForecastOverview from './components/ForecastOverview';
import FavoriteLocations from './components/FavoriteLocations';
import Separator from './components/Separator';
import LoadingScreen from './components/LoadingScreen';
import { getCoords, getLocationData, getWeeklyForecast, getHourlyForecast } from './api';
import { Coords, Temperature, WeeklyForecastData, HourlyForecastData, Location } from './types';
import './styles/styleSheet.scss';

const App: React.FC = () => {
	const [coords, setCoords] = useState<Coords | null>(null);
	const [activeLocation, setActiveLocation] = useState<Location | null>(null);
	const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
	const [currentTemprature, setCurrentTemprature] = useState<Temperature>({degree: 0, unit: 'F'});
	const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>([]);
	const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData[]>([]);
	const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
	const [loadingMessage, setLoadingMessage] = useState<string | null>('Loading...');

	const { isMobile } = useResponsive();

	useEffect(() => {
		(async () => {
			try {
				setLoadingMessage('Loading current coordinates...');
				const { latitude, longitude } = await getCoords();
				setCoords({latitude, longitude});
			} catch (e) {
				console.error(e);
			};
		})();
	}, []);

	useEffect(() => {
		if (!coords) return;

		(async () => {
			try {
				setLoadingMessage('Loading current location data...');
				const { city, state } = await getLocationData(coords.latitude, coords.longitude);
				setActiveLocation({
					city,
					state,
					latitude: coords.latitude,
					longitude: coords.longitude,
				});
				setCurrentLocation({
					city,
					state,
					latitude: coords.latitude,
					longitude: coords.longitude,
				});
			} catch (e) {
				console.error(e);
			};
		})();
	}, [coords]);

	useEffect(() => {
		if (!activeLocation) return;
		
		(async () => {
			try {
				setLoadingMessage('Loading location data...');
				const { forecastURL, forecastHourlyURL } = await getLocationData(activeLocation.latitude, activeLocation.longitude);
				setLoadingMessage('Loading weekly forecast...');
				const weeklyForecast = await getWeeklyForecast(forecastURL);
				setWeeklyForecast(weeklyForecast);
				setLoadingMessage('Loading hourly forecast...');
				const { currentTemperature, hourlyForecast } = await getHourlyForecast(forecastHourlyURL);
				setCurrentTemprature(currentTemperature);
				setHourlyForecast(hourlyForecast);
				setLoadingMessage(null);
			} catch (e) {
				console.error(e);
			};
		})();
	}, [activeLocation]);

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

	const addLocationToFavorites = (location: Location) => {
		const alreadyFavorited = favoriteLocations.includes(location);
		if (alreadyFavorited) {
			setFavoriteLocations(prevItems => prevItems.filter(item =>
				item.latitude !== location.latitude || item.longitude !== location.longitude
			));
		} else {
			setFavoriteLocations(prevItems => [...prevItems, location]);
		};
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
					addLocationToFavorites={addLocationToFavorites}
				/>}

				<ForecastOverview
					currentTemprature={currentTemprature}
					weeklyForecast={weeklyForecast}
					hourlyForecast={hourlyForecast}
				/>

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