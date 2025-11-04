import React, { CSSProperties } from 'react';
import theme from '../styles/theme';

const Separator: React.FC = () => {
	const styles: {
			[key: string]: CSSProperties;
	} = {
		separator: {
			background: theme.colors.white,
			width: '100%',
			height: '2px',
			marginBottom: '10px',
		},
	};

	return (
		<div style={styles.separator}/>
	);
};

export default Separator;