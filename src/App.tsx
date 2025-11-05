import React, { useState, useEffect, CSSProperties } from 'react';
import Logo from './components/Logo';
import CurrentLocation from './components/CurrentLocation';
import LocationSelector from './components/LocationSelector';
import ForecastOverview from './components/ForecastOverview';
import FavoriteLocations from './components/FavoriteLocations';
import { getLocationData, getWeeklyForecast, getHourlyForecast } from './api';
import { Temperature, WeeklyForecastData, HourlyForecastData } from './types';
import './styles/styleSheet.scss';

const App: React.FC = () => {
	const [city, setCity] = useState<string>(''); 
	const [state, setState] = useState<string>('');
	const [currentTemprature, setCurrentTemprature] = useState<Temperature>({degree: 0, unit: 'F'});
	const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>([]);
	const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData[]>([]);
	const [favoriteLocations, setFavoriteLocations] = useState<string[]>(['']);
	const [loadingMessage, setLoadingMessage] = useState<string | null>('Loading...');

	useEffect(() => {
		(async () => {
			setLoadingMessage('Loading location data...');
			const { city, state, forecastURL, forecastHourlyURL } = await getLocationData();
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
	}, []);

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

	if (loadingMessage) return (
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
					<LocationSelector setCity={setCity} setState={setState} />
					<FavoriteLocations city={city} favoriteLocations={favoriteLocations} />
				</div>
			</div>
		</div>
	);
};

export default App;