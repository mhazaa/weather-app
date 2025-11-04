import { Coords, WeeklyForecastData, HourlyForecastData } from '../types';

const getCoords = (): Promise<Coords> => {
	return new Promise((resolve, reject) => {
		if (!('geolocation' in navigator)) {
			reject(new Error('Geolocation not supported'));
			return;
		}
		
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				const { latitude, longitude } = position.coords;
				resolve({
					latitude, longitude,
				});
			},
			(error: GeolocationPositionError) => reject(error)
		);
	});
};

export const getLocationData = async () => {
	const { latitude, longitude } = await getCoords();
	const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
	const data = await response.json();
	const city = data.properties.relativeLocation.properties.city;
	const state = data.properties.relativeLocation.properties.state;
	const forecastURL = data.properties.forecast;
	const forecastHourlyURL = data.properties.forecastHourly;

	return {
		city, state, forecastURL, forecastHourlyURL,
	};
};

export const getWeeklyForecast = async (forecastURL: string) => {
	const forecastResponse = await fetch(forecastURL);
	const forecastData = await forecastResponse.json();
	const forecastDataPeriods = forecastData.properties.periods;
	const weeklyForecast = forecastDataPeriods.map((period: any): WeeklyForecastData => {
		return {
			day: period.name,
			temperature: {
				degree: period.temperature,
				unit: period.temperatureUnit,
			},
		};
	});
	return weeklyForecast;
};

export const getHourlyForecast = async (forecastHourlyURL: string) => {
	const forecastHourlyResponse = await fetch(forecastHourlyURL);
	const forecastHourlyData = await forecastHourlyResponse.json();
	const forecastHourlyPeriods = forecastHourlyData.properties.periods;

	const _hourlyForecast: any[] = forecastHourlyPeriods.map((period: any) => {
		const hour = new Date(period.startTime).toLocaleTimeString([], {
			hour: 'numeric',
			hour12: true,
		});

		return {
			hour,
			temperature: {
				degree: period.temperature,
				unit: period.temperatureUnit,
			},
			startTime: period.startTime,
		}
	});

	const today = new Date().toISOString().split('T')[0];
	const hourlyForecast: HourlyForecastData[] = _hourlyForecast
		.filter((f) => f.startTime.startsWith(today))
		.map(({ startTime, ...rest }) => rest);

	const currentTemperature = {
		degree: forecastHourlyPeriods[0].temperature,
		unit: forecastHourlyPeriods[0].temperatureUnit,
	};

	return {
		currentTemperature, hourlyForecast,
	};
};