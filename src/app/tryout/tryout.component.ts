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
		/* ********
			Put the code here
		********* */
	}

	ngOnDestroy() {
		/* ********
			Put the code here
		********* */
	}
}
