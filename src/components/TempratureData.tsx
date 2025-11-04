import React, { CSSProperties } from 'react';
import theme from '../styles/theme';
import { Temperature, WeeklyForecastData, HourlyForecastData } from '../types';
import tempratureCloud from '../assets/temprature-cloud.svg';

interface TempratureDataProps {
	currentTemprature: Temperature;
	weeklyForecast: WeeklyForecastData[];
	hourlyForecast: HourlyForecastData[];
};

const TempratureData: React.FC<TempratureDataProps> = ({
	currentTemprature,
	weeklyForecast,
	hourlyForecast,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		tempratureCloud: {
			width: '250px',
		},
		tempratureTitle: {
			position: 'absolute',
			fontWeight: '500',
			color: theme.colors.blue,
		},
		forecastWrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
		hourlyForecastWrapper: {
			marginRight: '40px',
		},
		hour: {
			display: 'flex',
			justifyContent: 'start',
		},
		weeklyForecastWrapper: {
			textAlign: 'right',
		},
		day: {
			display: 'flex',
			justifyContent: 'end',
		},
	};

	return (
		<div>
			<div className='cloud-wrapper'>
				<img style={styles.tempratureCloud} src={tempratureCloud} alt='temprature-cloud' />
				<h2 style={styles.tempratureTitle}>{currentTemprature.degree} {currentTemprature.unit}°</h2>
			</div>

			<div style={styles.forecastWrapper}>
				<div style={styles.hourlyForecastWrapper}>
					{hourlyForecast.map((forecast: HourlyForecastData, i: number) => (
						<div style={styles.hour} key={i}>
							<h4>{forecast.hour}:&nbsp;</h4>
							<h4>{forecast.temperature.degree} {forecast.temperature.unit}°</h4>
						</div>
					))}
				</div>

				<div style={styles.weeklyForecastWrapper}>
					{weeklyForecast.map((forecast: WeeklyForecastData, i: number) => (
						<div style={styles.day} key={i}>
							<h4>{forecast.day}:&nbsp;</h4>
							<h4>{forecast.temperature.degree} {forecast.temperature.unit}°</h4>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TempratureData;