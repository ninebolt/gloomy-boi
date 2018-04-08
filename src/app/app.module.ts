import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UiSwitchModule } from 'ngx-toggle-switch';

import { AppComponent } from './app.component';
import { ActionBarComponent } from './containers/action-bar/action-bar.component';
import { MonsterModalComponent } from './components/monster-modal/monster-modal.component';
import { InitativeTrackerComponent } from './containers/initative-tracker/initative-tracker.component';
import { InitativeComponent } from './components/initative/initative.component';
import { MonsterCardComponent } from './components/monster-card/monster-card.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { SearchDropdownComponent } from './components/search-dropdown/search-dropdown.component';
import { HealthTrackerComponent } from './containers/health-tracker/health-tracker.component';
import { MonsterHealthComponent } from './components/monster-health/monster-health.component';
import { MonsterBandComponent } from './containers/monster-band/monster-band.component';
import { MonsterDeckComponent } from './components/monster-deck/monster-deck.component';

import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

import { LineParserService } from './services/line-parser.service';
import { RetrievalService } from './services/retrieval.service';
import { ScenarioService } from './services/scenario.service';
import { MonsterCardService } from './services/monster-card.service';

@NgModule({
  declarations: [
    AppComponent,
    ActionBarComponent,
    MonsterModalComponent,
    InitativeTrackerComponent,
    InitativeComponent,
    MonsterBandComponent,
    MonsterCardComponent,
    MonsterDeckComponent,
    MonsterCardComponent,
    ActionButtonComponent,
    SearchDropdownComponent,
    HealthTrackerComponent,
    MonsterHealthComponent,
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiSwitchModule
  ],
  providers: [
    LineParserService,
    RetrievalService,
    ScenarioService,
    MonsterCardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
