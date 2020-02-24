import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CONTINENTS_CENTER_POINT, DEFAULT_CONTINENT, Quake, PERIODS, DEFAULT_PERIOD, GeoPoint } from '../config/map.config';
import * as L from 'leaflet';
import { QuakeService } from '../services/quake.service';
import { fromEvent, Observable } from 'rxjs';
import { map, flatMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'earthquake-map',
	templateUrl: './earthquake-map.component.html',
	styleUrls: ['./earthquake-map.component.less']
})
export class EarthquakeMapComponent implements AfterViewInit {
	periods = PERIODS;
	selectedPeriod = DEFAULT_PERIOD;

	map: L.Map;
	layerGroup;

	quakes: Quake[];

	mousemove$: Observable<GeoPoint>;
	popup$;

	constructor(private route: ActivatedRoute, private quakeService: QuakeService) { }

	ngAfterViewInit(): void {
		this.initMap();
		this.subscribeContinentChanges();
		this.subscribeQuakeService();
		this.subscribePopup();
	}

	initMap() {
		this.map = L.map('map');

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
		tiles.addTo(this.map);

		this.layerGroup = L.layerGroup();
		this.layerGroup.addTo(this.map);
	}

	// EXERCICIO
	subscribeContinentChanges() {
	}

	// EXERCICIO
	subscribeQuakeService() {
	}

	// EXERCICIO
	subscribePopup() {
	}

	addCircle(quake: Quake) {
		L.circle([quake.lat, quake.lng], quake.size).addTo(this.layerGroup);
	}

	onPeriodChanged(period: string) {
		this.selectedPeriod = period;
		this.quakeService.load(period);
	}

	openPopup(quake: Quake) {
		L.popup()
			.setLatLng({ lat: quake.lat, lng: quake.lng })
			.setContent(`<p><h4>${quake.place}</h4><ul><li>${quake.size / 20000}</li><li>${quake.type}</li><li>${quake.time}</li></ul></p>`)
			.openOn(this.map);
	}
}
