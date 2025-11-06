import { Location } from '../types';

const locationNameParser = (location: Location) => {
	const cityTownOrCounty = location.city || location.town || location.county;
	let string = '';

	string = 
		cityTownOrCounty
			? cityTownOrCounty + ', ' + location.state
			: location.state;
					
	if (string.length > 22) string = string.slice(0, 22) + '...';

	return string;
};

export default locationNameParser;