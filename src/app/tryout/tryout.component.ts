import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription, merge } from 'rxjs';
import { share, throttleTime, filter, map, debounceTime } from 'rxjs/operators';

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
	topLeft$: Subscription;
	topRight$: Subscription;
	bottomLeft$: Subscription;
	bottomRight$: Subscription;
	map$: Subscription;
	merged$: Subscription;

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

		this.top$ = this.click$.pipe(
			filter((event: MouseEvent) => event.clientY > HEADER_HEIGHT && event.clientY < this.centerHeigth)
		);

		this.bottom$ = this.click$.pipe(
			filter((event: MouseEvent) => event.clientY > this.centerHeigth)
		);

		// TOP LEFT Corner
		// this.topleft$ = this.top$
		// 	.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth))
		// 	.subscribe(() => console.log('TOP LEFT CORNER'));

		// // TOP RIGHT Corner
		// this.topRight$ = this.top$
		// 	.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth))
		// 	.subscribe(() => console.log('TOP RIGHT CORNER'));

		// // BOTTOM LEFT Corner
		// this.bottomleft$ = this.bottom$
		// 	.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth))
		// 	.subscribe(() => console.log('BOTTOM LEFT CORNER'));

		// // BOTTOM RIGHT Corner
		// this.bottomRight$ = this.bottom$
		// 	.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth))
		// 	.subscribe(() => console.log('BOTTOM RIGHT CORNER'));

		// Merged Streams
		// const bR$ = this.bottom$.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth));
		// const tL$ = this.top$.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth));

		// this.merged$ = merge(bR$, tL$).subscribe((event: MouseEvent) => console.log('Position', event));

		// #### MAP
		this.map$ = this.click$
			.pipe(
				debounceTime(200),
				map((event: MouseEvent) => {
					const zone = '';

					return zone
						.concat(event.clientY > this.centerHeigth ? 'BOTTOM' : 'TOP')
						.concat(event.clientX > this.centerWidth ? ' RIGHT' : ' LEFT');
				})
			).subscribe((zone: string) => {
				console.log(`The Event Zone is ${zone}`);
			});


		// #### Keyboard
		// fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => console.log('Keyboard UP Event', event));
	}

	ngOnDestroy() {
		this.map$ && this.map$.unsubscribe();
		this.topLeft$ && this.topLeft$.unsubscribe();
		this.topRight$ && this.topRight$.unsubscribe();
		this.bottomLeft$ && this.bottomLeft$.unsubscribe();
		this.bottomRight$ && this.bottomRight$.unsubscribe();
		this.merged$ && this.merged$.unsubscribe();
	}
}
