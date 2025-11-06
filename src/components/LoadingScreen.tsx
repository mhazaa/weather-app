import React, { CSSProperties } from 'react';

interface LoadingScreenProps {
	loadingMessage: string;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
	loadingMessage,
}) => {
	const styles: {
			[key: string]: CSSProperties;
	} = {
		loadingScreen: {
			position: 'absolute',
			top: '0',
			left: '0',
			zIndex: '10',
			background: 'rgba(0, 0, 0, 0.75)',
			display: 'flex',
			width: '100vw',
			height: '100vh',
			justifyContent: 'center',
			alignItems: 'center',
		},
	};

	return (
		<div style={styles.loadingScreen}>
			<h4>{loadingMessage}</h4>
		</div>
	);
};

export default LoadingScreen;