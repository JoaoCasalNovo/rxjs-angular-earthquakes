import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TryoutComponent } from './tryout.component';
import { TryoutRoutingModule } from './tryout.routing';

@NgModule({
	imports: [
		CommonModule,
		TryoutRoutingModule
	],
	exports: [TryoutComponent],
	declarations: [TryoutComponent]
})
export class TryoutModule { }
