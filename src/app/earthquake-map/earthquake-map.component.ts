import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CONTINENTS_CENTER_POINT, DEFAULT_CONTINENT, Quake, PERIODS, DEFAULT_PERIOD } from '../config/map.config';
import * as L from 'leaflet';
import { QuakeService } from '../services/quake.service';

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

	constructor(private route: ActivatedRoute, private quakeService: QuakeService) { }

	ngAfterViewInit(): void {
		this.initMap();
		this.subscribeContinentChanges();
		this.subscribeQuakeService();

		this.quakeService.load();
	}

	initMap() {
		this.map = L.map('map');

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
		tiles.addTo(this.map);

		this.layerGroup = L.layerGroup();
		this.layerGroup.addTo(this.map);
		this.layerGroup.on('click', this.onCircleClick);
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
				console.log(quakes);

				quakes.forEach(quake => this.addCircle(quake));
			});
	}

	addCircle(quake: Quake) {
		const circle = L.circle([quake.lat, quake.lng], quake.size);
		circle.on('click', this.onCircleClick);
		circle.addTo(this.layerGroup);
	}

	onPeriodChanged(period: string) {
		this.layerGroup.clearLayers();
		this.selectedPeriod = period;
		this.quakeService.load(period);
	}

	onCircleClick(ev) {
		console.log('asdasdasdas', ev);
	}
}
