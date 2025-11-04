import React, { useState, useEffect, CSSProperties } from 'react';
import CurrentCity from './components/CurrentCity';
import CitySelector from './components/CitySelector';
import TempratureData from './components/TempratureData';
import Favorites from './components/Favorites';
import { getLocationData, getWeeklyForecast, getHourlyForecast } from './api';
import theme from './styles/theme';
import { Temperature, WeeklyForecastData, HourlyForecastData } from './types';
import './styles/styleSheet.scss';

const App: React.FC = () => {
	const [city, setCity] = useState<string>(''); 
	const [state, setState] = useState<string>('');
	const [currentTemprature, setCurrentTemprature] = useState<Temperature>({degree: 0, unit: 'F'});
	const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>([]);
	const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData[]>([]);
	const [favoriteCities, setFavoriteCities] = useState<string[]>(['']);

	useEffect(() => {
		(async () => {
			const { city, state, forecastURL, forecastHourlyURL } = await getLocationData();
			setCity(city);
			setState(state);
			const weeklyForecast = await getWeeklyForecast(forecastURL);
			setWeeklyForecast(weeklyForecast);
			const { currentTemperature, hourlyForecast } = await getHourlyForecast(forecastHourlyURL);
			setCurrentTemprature(currentTemperature);
			setHourlyForecast(hourlyForecast);
		})();
	}, []);

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
			display: 'flex',
			justifyContent: 'center',
		},
		linebreak: {
			background: theme.colors.white,
			width: '100%',
			height: '2px',
		}
	};

	return (
		<div>
			<div style={styles.wrapper}>
				<h1>InfoTrack Weather App</h1>

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

				<div style={styles.linebreak}/>
			</div>
		</div>
	);
};

export default App;