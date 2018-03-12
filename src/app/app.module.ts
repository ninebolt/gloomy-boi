import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { InitativeTrackerComponent } from './containers/initative-tracker/initative-tracker.component';
import { CharacterInitativeComponent } from './components/character-initative/character-initative.component';
import { CardDeckComponent } from './containers/card-deck/card-deck.component';
import { MonsterCardComponent } from './components/monster-card/monster-card.component';
import { OrderByPipe } from './pipes/orderBy.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InitativeTrackerComponent,
    CharacterInitativeComponent,
    CardDeckComponent,
    MonsterCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    OrderByPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
