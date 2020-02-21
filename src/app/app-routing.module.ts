import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'try-out',
				loadChildren: () => import('./tryout/tryout.module').then(m => m.TryoutModule)
			},
			{
				path: 'map',
				loadChildren: () => import('./earthquake-map/earthquake-map.module').then(m => m.EarthquakeMapModule)
			},
			{
				path: '',
				redirectTo: 'try-out',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '**',
		redirectTo: 'try-out',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
