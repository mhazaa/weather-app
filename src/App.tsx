import React, { useState, useEffect, CSSProperties } from 'react';
import Logo from './components/Logo';
import CurrentLocation from './components/CurrentLocation';
import LocationSelector from './components/LocationSelector';
import ForecastOverview from './components/ForecastOverview';
import FavoriteLocations from './components/FavoriteLocations';
import { getCoords, getLocationData, getWeeklyForecast, getHourlyForecast } from './api';
import { Coords, Temperature, WeeklyForecastData, HourlyForecastData } from './types';
import './styles/styleSheet.scss';

const App: React.FC = () => {
	const [coords, setCoords] = useState<Coords | null>(null);
	const [city, setCity] = useState<string>(''); 
	const [state, setState] = useState<string>('');
	const [currentTemprature, setCurrentTemprature] = useState<Temperature>({degree: 0, unit: 'F'});
	const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>([]);
	const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData[]>([]);
	const [favoriteLocations, setFavoriteLocations] = useState<string[]>(['']);
	const [loadingMessage, setLoadingMessage] = useState<string | null>('Loading...');

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
		(async () => {
			setLoadingMessage('Loading location data...');
			const { city, state, forecastURL, forecastHourlyURL } = await getLocationData(coords.latitude, coords.longitude);
			setCity(city);
			setState(state);
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
		loadingScreen: {
			display: 'flex',
			height: '100vh',
			justifyContent: 'center',
			alignItems: 'center',
		},
		wrapper: {
			width: '95%',
			maxWidth: '900px',
			margin: 'auto',
			textAlign: 'center',
		},
		sectionsWrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
	};

	if (loadingMessage || !coords) return (
		<div style={styles.loadingScreen}>
			<h4>{loadingMessage}</h4>
		</div>
	);

	return (
		<div>
			<div style={styles.wrapper}>
				<Logo />

				<CurrentLocation
					city={city}
					state={state}
					favoriteLocations={favoriteLocations}
					setFavoriteLocations={setFavoriteLocations}
				/>

				<ForecastOverview
					currentTemprature={currentTemprature}
					weeklyForecast={weeklyForecast}
					hourlyForecast={hourlyForecast}
				/>

				<div style={styles.sectionsWrapper}>
					<LocationSelector setCoords={setCoords} />
					<FavoriteLocations city={city} favoriteLocations={favoriteLocations} />
				</div>
			</div>
		</div>
	);
};

export default App;