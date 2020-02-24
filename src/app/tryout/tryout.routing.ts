import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TryoutComponent } from './tryout.component';

const routes: Routes = [
	{
		path: '',
		component: TryoutComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TryoutRoutingModule { }
