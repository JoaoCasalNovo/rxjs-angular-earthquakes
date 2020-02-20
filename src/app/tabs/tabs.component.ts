import { Component, Input } from '@angular/core';

export interface ITab {
	label: string;
	onClickAction: () => void;
}

@Component({
	selector: 'tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.less']
})
export class TabsComponent {
	@Input() items: ITab[] = [];

	selectedItemIndex = 0;

	onTabSelected(item: ITab, index: number) {
		this.selectedItemIndex = index;

		item.onClickAction();
	}
}
