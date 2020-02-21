import { Component } from '@angular/core';
import { ITab } from './tabs/tabs.component';

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
			onClickAction: () => this.mapSelected = false
		},
		{
			label: 'Earthquakes Map',
			onClickAction: () => this.mapSelected = true
		}
	];

	tabsList: ITab[] = [
		{
			label: 'North America',
			onClickAction: () => this.navigateTo('North America')
		},
		{
			label: 'Central America',
			onClickAction: () => this.navigateTo('Central America')
		},
		{
			label: 'South America',
			onClickAction: () => this.navigateTo('South America')
		},
		{
			label: 'Europe',
			onClickAction: () => this.navigateTo('Europe')
		},
		{
			label: 'Asia',
			onClickAction: () => this.navigateTo('Asia')
		},
		{
			label: 'Africa',
			onClickAction: () => this.navigateTo('Africa')
		},
		{
			label: 'Oceania',
			onClickAction: () => this.navigateTo('Oceania')
		}
	];

	navigateTo(continent: string) {
		console.log(continent);
	}
}
