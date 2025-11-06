import React, { useState, CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Separator from './Separator';
import { getLocationList } from '../api';
import locationNameParser from '../functions/locationNameParser';
import theme from '../styles/theme';
import { Coords, Location } from '../types';
import locationCloud from '../assets/location-cloud.svg';

let timeout: any = null;

interface LocationSelectorProps {
	setCoords: (coords: Coords) => void;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
	setCoords,
}) => {
	const [locationsDropdown, setLocationsDropdown] = useState<Location[]>([]);
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		locationSelectorWrapper: {
			marginRight: '10px',
			marginBottom: isMobile ? '40px' : '0',	
		},
		locationCloud: {
			width: isMobile ? '300px' : '250px',
		},
		buttonText: {
			position: 'absolute',
			bottom: '0',
			color: theme.colors.blue,
		},
		cityInput: {
			width: '100%',
			maxWidth: isMobile ? '300px' : 'unset',
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
		if (input.length === 0) return setLocationsDropdown([]);

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
		<div style={styles.locationSelectorWrapper}>
			<a className='cloud-wrapper'>
				<img style={styles.locationCloud} src={locationCloud} alt='location-cloud' />
				<h3 style={styles.buttonText}>Change Location</h3>
			</a>

			{isMobile && <Separator />}

			<div>
				<input
					style={styles.cityInput}
					onChange={(e) => onInputChange(e.target.value)}
				/>
			</div>

			<div style={styles.dropdown}>
				{locationsDropdown.map((location: Location, i: number) => (
					<a
						key={i}
						onClick={
							() => dropdownItemOnClick(location.latitude, location.longitude)
						}
					>
						<h4>{locationNameParser(location)}</h4>
					</a>
				))}
			</div>
		</div>
	);
};

export default LocationSelector;