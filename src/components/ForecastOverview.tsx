import React, { useState, useEffect, CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Separator from './Separator';
import theme from '../styles/theme';
import { getLocationData, getWeeklyForecast, getHourlyForecast } from '../api';
import { Temperature, WeeklyForecastData, HourlyForecastData, Location } from '../types';
import tempratureCloud from '../assets/temprature-cloud.svg';

interface ForecastOverviewProps {
	activeLocation: Location;
	setLoadingMessage: (message: string | null) => void;
};

const ForecastOverview: React.FC<ForecastOverviewProps> = ({
	activeLocation,
	setLoadingMessage,
}) => {
	const [currentTemprature, setCurrentTemprature] = useState<Temperature>({degree: 0, unit: 'F'});
	const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>([]);
	const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData[]>([]);

	const { isMobile } = useResponsive();

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
			bottom: 0,
			color: theme.colors.blue,
		},
		forecastsWrapper: {
			display: 'flex',
			flexDirection: isMobile ? 'column' : 'row',
			justifyContent: 'center',
		},
		hourlyForecastWrapper: {
			position: 'relative',
			marginRight: isMobile ? 0 : '80px',
		},
		forecastScroll: {
			maxHeight: '300px',
			overflowY: 'scroll',
			scrollbarWidth: 'none',
			msOverflowStyle: 'none',
		},
		hour: {
			display: 'flex',
			width: isMobile ? '100%' : 'unset',
			maxWidth: isMobile ? '150px' : 'unset',
			margin: 'auto',
			justifyContent: 'space-between',
		},
		hourText: {
			color: theme.colors.darkBlue,
			paddingRight: isMobile ? '7px' : '0',
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
			width: isMobile ? '100%' : 'unset',
			maxWidth: isMobile ? '150px' : 'unset',
			margin: 'auto',
			justifyContent: isMobile ? 'space-between' : 'end',
		},
		dayText: {
			color: theme.colors.darkBlue,
			paddingRight: '7px'
		},
	};

	useEffect(() => {
		(async () => {
			try {
				setLoadingMessage('Loading location data...');
				const { forecastURL, forecastHourlyURL } = await getLocationData(activeLocation.latitude, activeLocation.longitude);
				setLoadingMessage('Loading weekly forecast...');
				const weeklyForecast = await getWeeklyForecast(forecastURL);
				setWeeklyForecast(weeklyForecast);
				setLoadingMessage('Loading hourly forecast...');
				const { currentTemperature, hourlyForecast } = await getHourlyForecast(forecastHourlyURL);
				setCurrentTemprature(currentTemperature);
				setHourlyForecast(hourlyForecast);
				setLoadingMessage(null);
			} catch (e) {
				console.error(e);
			};
		})();
	}, [activeLocation]);

	return (
		<div style={styles.tempratureDataWrapper}>
			<div className='cloud-wrapper'>
				<img style={styles.tempratureCloud} src={tempratureCloud} alt='temprature-cloud' />
				<h2
					className='temprature-title-font'
					style={styles.tempratureTitle}
				>
					{currentTemprature.degree} {currentTemprature.unit}°
				</h2>
			</div>
			
			<Separator />

			<div style={styles.forecastsWrapper}>
				<div style={styles.hourlyForecastWrapper}>
					<div style={styles.forecastScroll} tabIndex={-1}>
						{hourlyForecast.map((forecast: HourlyForecastData, i: number) => (
							<div key={i} style={styles.hour}>
								<h4 style={styles.hourText}>{forecast.hour}:&nbsp;</h4>
								<h4>{forecast.temperature.degree} {forecast.temperature.unit}°</h4>
							</div>
						))}
					</div>
					<div style={styles.forecastBottomGradient}></div>
				</div>

				<div style={styles.weeklyForecastWrapper} tabIndex={-1}>
					<div style={styles.forecastScroll} tabIndex={-1}>
						{weeklyForecast.map((forecast: WeeklyForecastData, i: number) => (
							<div key={i} style={styles.day}>
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