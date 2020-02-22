import { fromEvent } from 'rxjs';


// 1. Create Observable
fromEvent(document, 'click’)

// 2. Subscribe
fromEvent(document, 'click').subscribe(event => console.log(event));


// 3. Unsubscribe
this.click$ = fromEvent(document, 'click').subscribe(event => console.log(event));

this.click$.unsubscribe();

// 4. Filter Header section


