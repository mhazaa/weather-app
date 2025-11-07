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

export interface Location {
	city: string | null;
	state: string;
	latitude: number;
	longitude: number;
};