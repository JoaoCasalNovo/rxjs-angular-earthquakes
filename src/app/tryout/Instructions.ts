import { fromEvent } from 'rxjs';


//  ########################## 1. Create Observable
fromEvent(document, 'click’)

// a) Neste momento convertemos o click numa stream
// vamos experimentar - não imprime nada.
// Porque não subscrevemos nada. Ou seja, uma stream só vai arrancar a partir do momento que alguem subscreve algum evento.

//  ########################## 2. Subscribe
fromEvent(document, 'click').subscribe(event => console.log(event));
// b) Agora subscrevemos e agora já aparece.
// Agora mudamos de tab e vejam a consola, continua a imprimir e já não queremos.
// Então temos que fechar a stream, ou dizer que jã não queremos subscrever mais.

//  ########################## 3. Unsubscribe
this.click$ = fromEvent(document, 'click').subscribe(event => console.log(event));

this.click$.unsubscribe();


//  ########################## 4. Filter Header section
// Agora se já conseguimos converter o click numa stream.
// Podemos fazer todo o tipo de manipulações através de operadores.
// Até agora usamos o fromEvent que é um creator, ou seja, cria uma stream a partir de um event.
// Há mais exemplos como por exemplo from(http.get), of(5)
// O que vamos usar agora são os operators, que são operadores sobre a stream.

// Exemplo, filtrar o Header do nosso click

this.click$ = fromEvent(document, 'click').pipe(filter(event.clientY > HEADER_HEIGHT)).subscribe(event => console.log(event));

//  ########################## 5. Agora vamos mais longe, vamos criar duas streams a partir de uma única.

this.click$ = fromEvent(document, 'click').pipe(share());

this.top$ = this.click$.pipe(
	filter((event: MouseEvent) => event.clientY > HEADER_HEIGHT && event.clientY < this.centerHeigth)
);

this.bottom$ = this.click$.pipe(
	filter((event: MouseEvent) => event.clientY > this.centerHeigth)
);

// TOP LEFT Corner
this.topleft$ = this.top$
	.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth))
	.subscribe(() => console.log('TOP LEFT CORNER'));

// TOP RIGHT Corner
this.topRight$ = this.top$
	.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth))
	.subscribe(() => console.log('TOP RIGHT CORNER'));

// BOTTOM LEFT Corner
this.bottomleft$ = this.bottom$
	.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth))
	.subscribe(() => console.log('BOTTOM LEFT CORNER'));

// BOTTOM RIGHT Corner
this.bottomRight$ = this.bottom$
	.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth))
	.subscribe(() => console.log('BOTTOM RIGHT CORNER'));

//  ########################## 7. Map and Debounce
// Só para terem ideia de mais alguns operadores e da facilidade como algumas coisas são com Rxjs.
// Por exemplo, se estivermos sempre a clicar vamos estar sempre a emitir eventos e não queremos.
// Podemos usar o debounceTime que é um operador que só deixa o evento passar, se nos 200 milissegundos seguintes a esse evento,
// mais nenhum é emitido, senão volta a esperar 200 milisegundos.
// E depois em vez de termos aquelas streams todas podemos usar um Map, em que podemos manipular os dados que recebemos
// e enviar algo novo para a stream.

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


//  ########################## 6. Agora vamos juntar streams
// Vamos juntar três streams com numa só para podermos reagir aos dois da mesma maneira.

const bR$ = this.bottom$.pipe(filter((event: MouseEvent) => event.clientX > this.centerWidth));
const tL$ = this.top$.pipe(filter((event: MouseEvent) => event.clientX <= this.centerWidth));
const kb$ = fromEvent(document, 'keyup');

this.merged$ = merge(bR$, tL$, kb$).subscribe((event: MouseEvent | KeyboardEvent) => console.log('Position', event));


// HELP: Unsubscribe
this.map$ && this.map$.unsubscribe();
this.topLeft$ && this.topLeft$.unsubscribe();
this.topRight$ && this.topRight$.unsubscribe();
this.bottomLeft$ && this.bottomLeft$.unsubscribe();
this.bottomRight$ && this.bottomRight$.unsubscribe();
this.merged$ && this.merged$.unsubscribe();
