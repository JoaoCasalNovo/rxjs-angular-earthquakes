import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsModule } from './tabs/tabs.module';
import { EarthquakeMapModule } from './earthquake-map/earthquake-map.module';
import { TryoutModule } from './tryout/tryout.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		TabsModule,
		EarthquakeMapModule,
		TryoutModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
