import React, { useState, useEffect, CSSProperties } from 'react';
import useResponsive from './hooks/useResponsive';
import Logo from './components/Logo';
import CurrentLocation from './components/CurrentLocation';
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
			setLoadingMessage('Loading current location data...');
			const { city, state, forecastURL, forecastHourlyURL } = await getLocationData(coords.latitude, coords.longitude);
			setCurrentLocation({
				city,
				state,
				latitude: coords.latitude,
				longitude: coords.longitude,
			});
			setLoadingMessage('Loading weekly forecast...');
			const weeklyForecast = await getWeeklyForecast(forecastURL);
			setWeeklyForecast(weeklyForecast);
			setLoadingMessage('Loading hourly forecast...');
			const { currentTemperature, hourlyForecast } = await getHourlyForecast(forecastHourlyURL);
			setCurrentTemprature(currentTemperature);
			setHourlyForecast(hourlyForecast);
			setLoadingMessage(null);
		})();
	}, [coords]);

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

	return (
		<div>
			{loadingMessage &&
				<LoadingScreen loadingMessage={loadingMessage} />
			}
			<div style={styles.wrapper}>
				<Logo />

				{currentLocation && <CurrentLocation
					currentLocation={currentLocation}
					isFavorited={favoriteLocations.includes(currentLocation)}
					setFavoriteLocations={setFavoriteLocations}
				/>}

				<ForecastOverview
					currentTemprature={currentTemprature}
					weeklyForecast={weeklyForecast}
					hourlyForecast={hourlyForecast}
				/>

				{currentLocation &&
					<div style={styles.sectionsWrapper}>
						<LocationSelector setCoords={setCoords} />
						<FavoriteLocations
							currentLocation={currentLocation}
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