export interface Coords {
	latitude: number;
	longitude: number;
};

export interface Temperature {
	degree: number;
	unit: 'F' | 'C';
}

export interface WeeklyForecastData {
	day: string;
	temperature: Temperature;
};

export interface HourlyForecastData {
	hour: string;
	temperature: Temperature;
};

export interface SVGOptions {
	fill: string;
	stroke: string;
	strokeWidth: number;
};

export interface Place {
	displayName: string;
	county?: string;
	town?: string;
	city?: string;
	state: string
	latitude: number;
	longitude: number;
};