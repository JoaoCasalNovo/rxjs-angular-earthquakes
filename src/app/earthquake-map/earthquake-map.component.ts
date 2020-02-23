import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CONTINENTS_CENTER_POINT, DEFAULT_CONTINENT, Quake, PERIODS, DEFAULT_PERIOD, GeoPoint } from '../config/map.config';
import * as L from 'leaflet';
import { QuakeService } from '../services/quake.service';
import { fromEvent, Observable, from } from 'rxjs';
import { share, map, filter, flatMap } from 'rxjs/operators';

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
		this.route.queryParams
			.subscribe((params: Params) => {
				const continentKey = params.continent || DEFAULT_CONTINENT;
				const coord = CONTINENTS_CENTER_POINT[continentKey];
				this.map.setView(new L.LatLng(coord.lat, coord.lng), coord.center);
			});
	}

	// EXERCICIO
	subscribeQuakeService() {
		this.quakeService.quakes
			.subscribe((quakes: Quake[]) => {
				this.quakes = quakes;
				quakes.forEach(quake => this.addCircle(quake));
			});

		this.quakeService.load();
	}

	// EXERCICIO
	subscribePopup() {
		this.mousemove$ = fromEvent(this.map, 'mousemove')
			.pipe(map((mouseMove: any) => ({
				lat: mouseMove.latlng.lat,
				lng: mouseMove.latlng.lng
			} as GeoPoint)));

		this.mousemove$
			.pipe(
				flatMap((point: GeoPoint) => {
					return (this.quakes && this.quakes.filter(quake => {
						return quake.lat.toFixed(1) === point.lat.toFixed(1) && quake.lng.toFixed(1) === point.lng.toFixed(1);
					}));
				})
			).subscribe(quake => this.openPopup(quake));
	}

	addCircle(quake: Quake) {
		L.circle([quake.lat, quake.lng], quake.size).addTo(this.layerGroup);
	}

	onPeriodChanged(period: string) {
		this.layerGroup.clearLayers();
		this.selectedPeriod = period;
		this.quakeService.load(period);
	}

	openPopup(quake: Quake) {
		L.popup()
			.setLatLng({ lat: quake.lat, lng: quake.lng })
			.setContent('<p><h4>' + quake.place + '</h4><ul><li>' + quake.type + '</li><li>' + quake.time + '</li></ul></p>')
			.openOn(this.map);
	}
}
