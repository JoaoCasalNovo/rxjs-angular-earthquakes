import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarthquakeMapComponent } from './earthquake-map.component';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [EarthquakeMapComponent],
	declarations: [EarthquakeMapComponent]
})
export class EarthquakeMapModule { }
