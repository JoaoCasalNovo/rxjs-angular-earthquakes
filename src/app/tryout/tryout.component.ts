import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { share, filter, map, debounceTime } from 'rxjs/operators';

const HEADER_HEIGHT = 60;

@Component({
	selector: 'tryout',
	templateUrl: './tryout.component.html',
	styleUrls: ['./tryout.component.less']
})
export class TryoutComponent implements OnInit, OnDestroy {
	click$: Observable<Event>;
	top$: Observable<Event>;
	bottom$: Observable<Event>;

	@ViewChild('tryOut', { read: ElementRef, static: false }) tryOut: ElementRef;

	constructor() { }

	get tryOutHeight(): number {
		return window.innerHeight;
	}

	get tryOutWidth(): number {
		return window.innerWidth;
	}

	get centerHeigth(): number {
		return (this.tryOutHeight / 2) + HEADER_HEIGHT;
	}

	get centerWidth(): number {
		return this.tryOutWidth / 2;
	}

	ngOnInit() {
		/**
		 * Put code here
		 */
		this.click$ = fromEvent(document, 'click').pipe(share());

		// #### FILTER

		// this.top$ = this.click$.pipe(
		// 	filter((event: MouseEvent) => event.clientY > HEADER_HEIGHT && event.clientY < this.centerHeigth)
		// );

		// this.bottom$ = this.click$.pipe(
		// 	filter((event: MouseEvent) => event.clientY > this.centerHeigth)
		// );

		// TOP LEFT Corner
		// this.top$
		// 	.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth))
		// 	.subscribe(() => console.log('TOP LEFT CORNER'));

		// // TOP RIGHT Corner
		// this.top$
		// 	.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth))
		// 	.subscribe(() => console.log('TOP RIGHT CORNER'));
		// // BOTTOM LEFT Corner
		// this.bottom$
		// 	.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth))
		// 	.subscribe(() => console.log('BOTTOM LEFT CORNER'));

		// // BOTTOM RIGHT Corner
		// this.bottom$
		// 	.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth))
		// 	.subscribe(() => console.log('BOTTOM RIGHT CORNER'));

		// #### MAP
		this.click$
			.pipe(
				debounceTime(300),
				map((event: MouseEvent) => {
					const zone = '';

					return zone
						.concat(event.clientY > this.centerHeigth ? 'BOTTOM' : 'TOP')
						.concat(event.clientX > this.centerWidth ? ' RIGHT' : ' LEFT');
				})
			).subscribe((zone: string) => {
				console.log(`The Event Zone is ${zone}`);
			});
	}

	ngOnDestroy() {

	}
}
