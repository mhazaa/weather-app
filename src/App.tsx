import React, { useState, useEffect, CSSProperties } from 'react';
import CurrentCity from './components/CurrentCity';
import CitySelector from './components/CitySelector';
import TempratureData from './components/TempratureData';
import Favorites from './components/Favorites';
import theme from './styles/theme';
import './styles/styleSheet.scss';

interface Coords {
	latitude: number;
	longitude: number;
};

const getCoords = (): Promise<Coords> => {
	return new Promise((resolve, reject) => {
		if (!('geolocation' in navigator)) {
			reject(new Error('Geolocation not supported'));
			return;
		}
		
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				const { latitude, longitude } = position.coords;
				resolve({ latitude, longitude });
			},
			(error: GeolocationPositionError) => reject(error)
		);
	});
};

export interface ForecastData {
	name: string;
	temperature: number;
};

const App: React.FC = () => {
	const [city, setCity] = useState<string>(''); 
	const [state, setState] = useState<string>('');
	const [temprature, setTemprature] = useState<number>(0);
	const [weeklyForecast, setWeeklyForecast] = useState<ForecastData[]>([]);
	const [favoriteCities, setFavoriteCities] = useState<string[]>(['']);

	useEffect(() => {
		(async () => {
			const { latitude, longitude } = await getCoords();
			const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
			const data = await response.json();

			const city = data.properties.relativeLocation.properties.city;
			const state = data.properties.relativeLocation.properties.state;
			setCity(city);
			setState(state);

			const forecastURL = data.properties.forecast;
			const forecastResponse = await fetch(forecastURL);
			const forecastData = await forecastResponse.json();
			const forecastDataPeriods = forecastData.properties.periods;
			const weeklyForecast = forecastDataPeriods.map((period: any): ForecastData => {
				return {
					name: period.name,
					temperature: period.temperature,
				};
			});
			setWeeklyForecast(weeklyForecast);

			const forecastHourlyURL = data.properties.forecastHourly;
			const forecastHourlyResponse = await fetch(forecastHourlyURL);
			const forecastHourlyData = await forecastHourlyResponse.json();
			const periods = forecastHourlyData.properties.periods;
			const temperature = periods[0].temperature;
			setTemprature(temperature);
		})();
	}, []);

	const styles: {
			[key: string]: CSSProperties;
	} = {
		container: {
		},
		wrapper: {
			width: '95%',
			maxWidth: '900px',
			margin: 'auto',
			textAlign: 'center',
		},
		buttonsWrapper: {
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
		<div style={styles.container}>
			<div style={styles.wrapper}>
				<h1>InfoTrack Weather App</h1>

				<CurrentCity
					city={city}
					state={state}
					favoriteCities={favoriteCities}
					setFavoritesCities={setFavoriteCities}
				/>

				<div style={styles.buttonsWrapper}>
					<CitySelector setCity={setCity} />

					<TempratureData temprature={temprature} weeklyForecast={weeklyForecast} />

					<Favorites city={city} favoriteCities={favoriteCities} />
				</div>

				<div style={styles.linebreak}/>
			</div>
		</div>
	);
};

export default App;