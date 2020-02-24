import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarthquakeMapComponent } from './earthquake-map.component';
import { EarthquakeMapRoutingModule } from './earthquake-map.routing';
import { QuakeService } from '../services/quake.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		EarthquakeMapRoutingModule,
		HttpClientModule
	],
	exports: [EarthquakeMapComponent],
	declarations: [EarthquakeMapComponent],
	providers: [QuakeService]
})
export class EarthquakeMapModule { }
