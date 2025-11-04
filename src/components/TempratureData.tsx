import React, { CSSProperties } from 'react';
import theme from '../styles/theme';
import { ForecastData } from '../App';
import tempratureCloud from '../assets/temprature-cloud.svg';

interface TempratureDataProps {
	temprature: number;
	weeklyForecast: ForecastData[];
};

const TempratureData: React.FC<TempratureDataProps> = ({
	temprature,
	weeklyForecast,
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
		day: {
			display: 'flex',
		},
	};

	return (
		<div>
			<div className='cloud-wrapper'>
				<img style={styles.tempratureCloud} src={tempratureCloud} alt='temprature-cloud' />
				<h2 style={styles.tempratureTitle}>{temprature}°</h2>
			</div>

			<div>
				{weeklyForecast.map((forecast: ForecastData, i: number) => (
					<div style={styles.day} key={i}>
						<h4>{forecast.name}:&nbsp;</h4>
						<h4>{forecast.temperature}°</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default TempratureData;