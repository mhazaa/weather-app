import React, { CSSProperties } from 'react';
import theme from '../styles/theme';

const Logo: React.FC = () => {
	const styles: {
			[key: string]: CSSProperties;
	} = {
		logo: {
			background: theme.colors.darkBlue,
			display: 'inline-block',
			padding: '7px 60px 5px 60px',
			marginTop: '10px',
			marginBottom: '40px',
			borderRadius: '5px',
		},
	};

	return (
		<div style={styles.logo}>
			<h1>InfoTrack Weather App</h1>
		</div>
	);
};

export default Logo;