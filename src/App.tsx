import React, { useState, useEffect, CSSProperties } from 'react';
import Logo from './components/Logo';
import CurrentCity from './components/CurrentCity';
import CitySelector from './components/CitySelector';
import TempratureData from './components/TempratureData';
import Favorites from './components/Favorites';
import { getLocationData, getWeeklyForecast, getHourlyForecast } from './api';
import { Temperature, WeeklyForecastData, HourlyForecastData } from './types';
import './styles/styleSheet.scss';

const App: React.FC = () => {
	const [city, setCity] = useState<string>(''); 
	const [state, setState] = useState<string>('');
	const [currentTemprature, setCurrentTemprature] = useState<Temperature>({degree: 0, unit: 'F'});
	const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>([]);
	const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData[]>([]);
	const [favoriteCities, setFavoriteCities] = useState<string[]>(['']);
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

				<CurrentCity
					city={city}
					state={state}
					favoriteCities={favoriteCities}
					setFavoritesCities={setFavoriteCities}
				/>

				<TempratureData
					currentTemprature={currentTemprature}
					weeklyForecast={weeklyForecast}
					hourlyForecast={hourlyForecast}
				/>

				<div style={styles.sectionsWrapper}>
					<CitySelector setCity={setCity} />
					<Favorites city={city} favoriteCities={favoriteCities} />
				</div>
			</div>
		</div>
	);
};

export default App;