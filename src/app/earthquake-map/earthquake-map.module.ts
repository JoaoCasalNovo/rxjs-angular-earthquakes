import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarthquakeMapComponent } from './earthquake-map.component';
import { EarthquakeMapRoutingModule } from './earthquake-map.routing';

@NgModule({
	imports: [
		CommonModule,
		EarthquakeMapRoutingModule
	],
	exports: [EarthquakeMapComponent],
	declarations: [EarthquakeMapComponent]
})
export class EarthquakeMapModule { }
