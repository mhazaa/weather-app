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