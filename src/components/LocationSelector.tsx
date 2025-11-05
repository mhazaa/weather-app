import React, { useState, CSSProperties } from 'react';
import { getLocationList } from '../api';
import theme from '../styles/theme';
import { Coords, Place } from '../types';
import locationCloud from '../assets/location-cloud.svg';

let timeout: any = null;

interface LocationSelectorProps {
	setCoords: (coords: Coords) => void;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
	setCoords,
}) => {
	const [locationsDropdown, setLocationsDropdown] = useState<Place[]>([]);

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
			textAlign: 'center',
		},
		dropdown: {
			width: '100%',
			overflowX: 'hidden',
		},
	};

	const onInputChange = (input: string) => {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			(async () => {
				try {
					const locationList = await getLocationList(input);
					setLocationsDropdown(locationList);
					console.log(locationList);
				} catch (e) {
					console.error(e);
				};
			})();
		}, 1000);
	};

	const dropdownItemOnClick = (latitude: number, longitude: number) => {
		setCoords({ latitude, longitude });
	};

	return (
		<div>
			<a className='cloud-wrapper'>
				<img style={styles.locationCloud} src={locationCloud} alt='location-cloud' />
				<h3 style={styles.buttonText}>Change Location</h3>
			</a>

			<div>
				<input style={styles.cityInput} onChange={(e) => onInputChange(e.target.value)} />
			</div>

			<div style={styles.dropdown}>
				{locationsDropdown.map((place: Place, i: number) => (
					<a
						key={i}
						onClick={
							() => dropdownItemOnClick(place.latitude, place.longitude)
						}
					>
						<h4>{place.city || place.town || place.county}, {place.state}</h4>
					</a>
				))}
			</div>
		</div>
	);
};

export default LocationSelector;