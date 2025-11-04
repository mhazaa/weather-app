import React from 'react';
import { SVGOptions } from '../types';

const FavoriteIcon: React.FC<SVGOptions> = ({
	fill,
	stroke,
	strokeWidth
}) => (
	<svg viewBox='0 0 110.06 99.3' fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
		<g>
			<path d='M109.93,29.7h0v-1.1C109.93,13.3,97.03.1,81.13.1s-21.6,7.5-26.2,17h0C50.43,7.5,40.43,0,28.83,0S.03,13.2.03,28.5.03,29.3.03,29.6H.03s-1.6,18.1,18.6,38c9.2,9.2,19.5,17.9,36.4,31.7,16.9-13.7,27.2-22.5,36.4-31.7,20.2-19.8,18.6-38,18.6-38l-.1.1Z' />
		</g>
	</svg>
);

export default FavoriteIcon;