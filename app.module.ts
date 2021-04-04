import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { AlphaThreeDComponent } from './alpha-three-d/alpha-three-d.component';
import { PlayerComponent } from './player/player.component';
import { RouterModule, Routes } from '@angular/router';
import { AlphaNavComponent } from './alpha-nav/alpha-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { AddPlayerComponent } from './add-player/add-player.component';
import { StatsComponent } from './stats/stats.component';

import { ChartModule } from 'angular-highcharts';

const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },
  { path: 'players', component: PlayerComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'three', component: AlphaThreeDComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AlphaThreeDComponent,
    PlayerComponent,
    AlphaNavComponent,
    AddPlayerComponent,
    StatsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ChartModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCommonModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
