import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TryoutComponent } from './tryout.component';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [TryoutComponent],
	declarations: [TryoutComponent]
})
export class TryoutModule { }
