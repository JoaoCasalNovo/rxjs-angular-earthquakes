import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CONTINENTS_CENTER_POINT, DEFAULT_CONTINENT } from '../config/map.config';
import * as L from 'leaflet';

@Component({
	selector: 'earthquake-map',
	templateUrl: './earthquake-map.component.html',
	styleUrls: ['./earthquake-map.component.less']
})
export class EarthquakeMapComponent implements AfterViewInit {
	map: L.Map;

	constructor(private route: ActivatedRoute) { }

	ngAfterViewInit(): void {
		this.initMap();
		this.subscribeContinentChanges();
	}

	initMap() {
		this.map = L.map('map');

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
		tiles.addTo(this.map);
	}

	subscribeContinentChanges() {
		this.route.queryParams
			.subscribe((params: Params) => {
				const continentKey = params.continent || DEFAULT_CONTINENT;
				const coord = CONTINENTS_CENTER_POINT[continentKey];
				this.map.setView(new L.LatLng(coord.lat, coord.lng), coord.center);
			});
	}
}
