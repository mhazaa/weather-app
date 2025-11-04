import React, { CSSProperties } from 'react';
import theme from '../styles/theme';
import cityCloud from '../assets/city-cloud.svg';

interface CitySelectorProps {
	setCity: (city: string) => void;
};

const CitySelector: React.FC<CitySelectorProps> = ({
	setCity,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		cityCloud: {
			width: '250px',
		},
		buttonText: {
			position: 'absolute',
			bottom: '0',
			color: theme.colors.blue,
		},
		cityInput: {
			width: '100%',
			height: '40px',
			padding: '0 5px',
			color: theme.colors.blue,
			boxSizing: 'border-box',
			textTransform: 'unset',
		},
	};

	return (
		<div>
			<a className='cloud-wrapper'>
				<img style={styles.cityCloud} src={cityCloud} alt='city-cloud' />
				<h3 style={styles.buttonText}>Change City</h3>
			</a>

			<div>
				<input style={styles.cityInput} />
			</div>
		</div>
	);
};

export default CitySelector;