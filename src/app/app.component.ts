import { Component } from '@angular/core';
import { ITab } from './tabs/tabs.component';
import { Router } from '@angular/router';
import { CONTINENTS, DEFAULT_CONTINENT } from './config/map.config';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	mapSelected = false;

	viewTabs: ITab[] = [
		{
			label: 'Try Out',
			onClickAction: () => {
				this.router.navigate(['/try-out']);
				this.mapSelected = false;
			}
		},
		{
			label: 'Earthquakes Map',
			onClickAction: () => {
				this.navigateTo(DEFAULT_CONTINENT);
				this.mapSelected = true;
			}
		}
	];

	tabsList: ITab[] = this.initContinentsTab();

	constructor(private router: Router) { }

	initContinentsTab(): ITab[] {
		return Object.keys(CONTINENTS).map(keyContinent => ({
			label: CONTINENTS[keyContinent],
			onClickAction: () => this.navigateTo(keyContinent)
		}));
	}

	navigateTo(continent: string) {
		this.router.navigate(['/earthquake-map'], {
			queryParams: {
				continent
			}
		});
	}
}
