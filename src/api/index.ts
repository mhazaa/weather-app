import { Coords, WeeklyForecastData, HourlyForecastData, Location } from '../types';

export const getCoords = (): Promise<Coords> => {
	return new Promise((resolve, reject) => {
		if (!('geolocation' in navigator)) {
			reject(new Error('Geolocation not supported'));
			return;
		};
		
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

export const getLocationData = async (latitude: number, longitude: number) => {
	const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
	const data = await response.json();
	const city = data.properties.relativeLocation.properties.city;
	const state = data.properties.relativeLocation.properties.state;
	const forecastURL = data.properties.forecast;
	const forecastHourlyURL = data.properties.forecastHourly;

	if (!city || !state || !forecastURL || !forecastHourlyURL)
		throw new Error('Incomplete location data from Weather API');

	return {
		city, state, forecastURL, forecastHourlyURL,
	};
};

export const getWeeklyForecast = async (forecastURL: string) => {
	const forecastResponse = await fetch(forecastURL);

	if (!forecastResponse.ok)
		throw new Error(`Forecast API error: ${forecastResponse.status} ${forecastResponse.statusText}`);

	const forecastData = await forecastResponse.json();
	const forecastDataPeriods = forecastData.properties.periods;

	if (!Array.isArray(forecastDataPeriods))
		throw new Error('Invalid forecast data format from Weather API');

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

	if (!forecastHourlyResponse.ok)
		throw new Error(`Hourly forecast request failed: ${forecastHourlyResponse.status} ${forecastHourlyResponse.statusText}`);

	const forecastHourlyData = await forecastHourlyResponse.json();
	const forecastHourlyPeriods = forecastHourlyData.properties.periods;

	if (!Array.isArray(forecastHourlyPeriods) || forecastHourlyPeriods.length === 0)
		throw new Error('Invalid or missing hourly forecast data.');

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
		};
	});

	const today = new Date().toISOString().split('T')[0];
	const hourlyForecast: HourlyForecastData[] = _hourlyForecast
		.filter((f) => f.startTime.startsWith(today))
		.map(({ _startTime, ...rest }) => rest);

	const currentTemperature = {
		degree: forecastHourlyPeriods[0].temperature,
		unit: forecastHourlyPeriods[0].temperatureUnit,
	};

	return {
		currentTemperature, hourlyForecast,
	};
};

export const getLocationList = async (location: string): Promise<Location[]> => {
	const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&q=${encodeURIComponent(location)}`);
	const data = await res.json();

	if (data.length === 0) return [];

	const filteredData = data.filter((p: any) =>
		['city', 'town', 'village', 'hamlet', 'county', 'state', 'administrative'].includes(p.type)
	);

	return filteredData.map((place: any) => {
		const city =
			place.address.city ||
			place.address.town ||
			place.address.village ||
			place.address.municipality ||
			place.address.hamlet ||
			place.address.county ||
			null;
		const state = place.address.state;
		const latitude = parseFloat(place.lat);
		const longitude = parseFloat(place.lon);

		return {
			city,
			state,
			latitude,
			longitude,
		};
	});
};