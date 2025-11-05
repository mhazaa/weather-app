import React, { CSSProperties } from 'react';
import Separator from './Separator';
import theme from '../styles/theme';
import { Temperature, WeeklyForecastData, HourlyForecastData } from '../types';
import tempratureCloud from '../assets/temprature-cloud.svg';

interface ForecastOverviewProps {
	currentTemprature: Temperature;
	weeklyForecast: WeeklyForecastData[];
	hourlyForecast: HourlyForecastData[];
};

const ForecastOverview: React.FC<ForecastOverviewProps> = ({
	currentTemprature,
	weeklyForecast,
	hourlyForecast,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		tempratureDataWrapper: {
			marginBottom: '40px',
		},
		tempratureCloud: {
			width: '300px',
		},
		tempratureTitle: {
			position: 'absolute',
			fontWeight: '500',
			color: theme.colors.blue,
		},
		forecastsWrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
		hourlyForecastWrapper: {
			position: 'relative',
			marginRight: '80px',
		},
		forecastScroll: {
			maxHeight: '300px',
			overflowY: 'scroll',
			scrollbarWidth: 'none',
			msOverflowStyle: 'none',
		},
		hour: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		hourText: {
			color: theme.colors.darkBlue,
		},
		forecastBottomGradient: {
			background: `linear-gradient(0deg, ${theme.colors.blue}, transparent)`,
			position: 'absolute',
			width: '100%',
			height: '100px',
			left: '0',
			bottom: '0',
			zIndex: '1',
		},
		weeklyForecastWrapper: {
			position: 'relative',
			textAlign: 'right',
		},
		day: {
			display: 'flex',
			justifyContent: 'end',
		},
		dayText: {
			color: theme.colors.darkBlue,
			paddingRight: '7px'
		},
	};

	return (
		<div style={styles.tempratureDataWrapper}>
			<div className='cloud-wrapper'>
				<img style={styles.tempratureCloud} src={tempratureCloud} alt='temprature-cloud' />
				<h2 style={styles.tempratureTitle}>{currentTemprature.degree} {currentTemprature.unit}°</h2>
			</div>
			
			<Separator />

			<div style={styles.forecastsWrapper}>
				<div style={styles.hourlyForecastWrapper}>
					<div style={styles.forecastScroll}>
						{hourlyForecast.map((forecast: HourlyForecastData, i: number) => (
							<div style={styles.hour} key={i}>
								<h4 style={styles.hourText}>{forecast.hour}:&nbsp;</h4>
								<h4>{forecast.temperature.degree} {forecast.temperature.unit}°</h4>
							</div>
						))}
					</div>
					<div style={styles.forecastBottomGradient}></div>
				</div>

				<div style={styles.weeklyForecastWrapper}>
					<div style={styles.forecastScroll}>
						{weeklyForecast.map((forecast: WeeklyForecastData, i: number) => (
							<div style={styles.day} key={i}>
								<h4 style={styles.dayText}>{forecast.day}:&nbsp;</h4>
								<h4>{forecast.temperature.degree} {forecast.temperature.unit}°</h4>
							</div>
						))}
					</div>
					<div style={styles.forecastBottomGradient}></div>
				</div>
			</div>
		</div>
	);
};

export default ForecastOverview;