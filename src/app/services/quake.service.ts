import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quake, DEFAULT_PERIOD } from '../config/map.config';
import { BehaviorSubject, from, zip, forkJoin, of } from 'rxjs';
import { flatMap, map, merge, combineAll, mergeAll } from 'rxjs/operators';

@Injectable()
export class QuakeService {
	private baseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/';

	private quakes$ = new BehaviorSubject<Quake[]>([]);
	private dataStore: { quakes: Quake[] } = { quakes: [] };

	get quakes() {
		return this.quakes$.asObservable();
	}

	constructor(private http: HttpClient) { }

	// EXERCICIO
	load(period: string = DEFAULT_PERIOD) {
		this.dataStore.quakes = [];
		this.http.get(`${this.baseUrl}/${period}.geojson`)
			.pipe(
				flatMap((data: any) => from(data.features)),
				map((quake: any) => ({
					lat: quake.geometry.coordinates[1],
					lng: quake.geometry.coordinates[0],
					size: quake.properties.mag * 10000,
					place: quake.properties.place,
					type: quake.properties.type,
					time: quake.properties.time
				} as Quake)),
			)
			.subscribe(
				quake => {
					this.dataStore.quakes.push(quake);
				},
				(err) => console.error('error: ', err),
				() => {
					this.quakes$.next(Object.assign({}, this.dataStore).quakes);
				}
			);
	}

}
