export interface GeoPoint {
	lat: number;
	lng: number;
	center?: number;
}

export interface ContinentGeoPoint {
	[key: string]: GeoPoint;
}

export const CONTINENTS = {
	NorthAmerica: 'North America',
	CentralAmerica: 'Central America',
	SouthAmerica: 'South America',
	Europe: 'Europe',
	Asia: 'Asia',
	Africa: 'Africa',
	Oceania: 'Oceania'
};

export const CONTINENTS_CENTER_POINT: ContinentGeoPoint = {
	NorthAmerica: { lat: 54.5260, lng: -105.2551, center: 3 },
	CentralAmerica: { lat: 17.571375, lng: -90.028152, center: 5 },
	SouthAmerica: { lat: -20.118480, lng: -59.414749, center: 3 },
	Europe: { lat: 54.5260, lng: 15.2551, center: 3 },
	Asia: { lat: 31.684355, lng: 77.404861, center: 4 },
	Africa: { lat: 8.7832, lng: 34.5085, center: 3 },
	Oceania: { lat: 0.263671, lng: 97.680817, center: 3 }
};

export const DEFAULT_CONTINENT = 'NorthAmerica';
