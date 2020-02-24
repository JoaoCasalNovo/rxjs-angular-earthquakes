import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quake, DEFAULT_PERIOD } from '../config/map.config';
import { of, Subject } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Injectable()
export class QuakeService {
	private baseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/';

	// get quakes() {
	// 	return this.quakes$.asObservable();
	// }

	constructor(private http: HttpClient) { }

	// EXERCICIO
	load(period: string = DEFAULT_PERIOD) {
	}
}
