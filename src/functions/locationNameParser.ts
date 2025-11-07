import { Location } from '../types';

const locationNameParser = (location: Location, abridge = true) => {
	let string =
		(location.city)
			? location.city + ', ' + location.state
			: location.state;

	if (abridge && string.length > 22) string = string.slice(0, 22) + '...';

	return string;
};

export default locationNameParser;