import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { InitativeTrackerComponent } from './containers/initative-tracker/initative-tracker.component';
import { CharacterInitativeComponent } from './components/character-initative/character-initative.component';
import { OrderByPipe } from './pipes/orderBy.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InitativeTrackerComponent,
    CharacterInitativeComponent
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
