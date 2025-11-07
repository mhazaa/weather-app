import React, { useState, CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Separator from './Separator';
import { getLocationList } from '../api';
import locationNameParser from '../functions/locationNameParser';
import theme from '../styles/theme';
import { Location } from '../types';
import locationCloud from '../assets/location-cloud.svg';

let timeout: any = null;

interface LocationSelectorProps {
	setActiveLocation: (location: Location) => void;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
	setActiveLocation,
}) => {
	const [inputValue, setInputValue] = useState('');
	const [locationsDropdown, setLocationsDropdown] = useState<Location[]>([]);
	const [noResultsFound, setNoResultsFound] = useState<boolean>(false);
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
		setInputValue(input);
		setNoResultsFound(false);
		
		if (timeout) clearTimeout(timeout);
		if (input.length === 0) return setLocationsDropdown([]);

		timeout = setTimeout(() => {
			(async () => {
				try {
					const locationList = await getLocationList(input);
					if (locationList.length === 0) setNoResultsFound(true);
					setLocationsDropdown(locationList);
				} catch (e) {
					console.error(e);
				};
			})();
		}, 500);
	};

	const onInputSubmit = async () => {
		clearTimeout(timeout);
		setNoResultsFound(false);
		const locationList = await getLocationList(inputValue);
		if (locationList.length === 0) setNoResultsFound(true);
		setLocationsDropdown(locationList);
	};

	const dropdownItemOnClick = (location: Location) => {
		setActiveLocation(location);
		setInputValue('');
		setLocationsDropdown([]);
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
					value={inputValue}
					onChange={(e) => onInputChange(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') onInputSubmit();
					}}
				/>
			</div>

			<div style={styles.dropdown}>
				{noResultsFound && <h4>No results found</h4>}
				{locationsDropdown.map((location: Location, i: number) => (
					<a
						key={i}
						onClick={
							() => dropdownItemOnClick(location)
						}
						tabIndex={0}
					>
						<h4>{locationNameParser(location)}</h4>
					</a>
				))}
			</div>
		</div>
	);
};

export default LocationSelector;