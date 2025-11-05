import React, { CSSProperties } from 'react';
import theme from '../styles/theme';
import locationCloud from '../assets/location-cloud.svg';

interface LocationSelectorProps {
	setCity: (city: string) => void;
	setState: (state: string) => void;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
	setCity,
	setState,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		locationCloud: {
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
				<img style={styles.locationCloud} src={locationCloud} alt='location-cloud' />
				<h3 style={styles.buttonText}>Change Location</h3>
			</a>

			<div>
				<input style={styles.cityInput} />
			</div>
		</div>
	);
};

export default LocationSelector;