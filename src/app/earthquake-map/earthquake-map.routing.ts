import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarthquakeMapComponent } from './earthquake-map.component';

const routes: Routes = [
	{
		path: '',
		component: EarthquakeMapComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EarthquakeMapRoutingModule { }
