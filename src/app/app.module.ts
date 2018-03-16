import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActionBarComponent } from './containers/action-bar/action-bar.component';
import { InitativeTrackerComponent } from './containers/initative-tracker/initative-tracker.component';
import { CharacterInitativeComponent } from './components/character-initative/character-initative.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { SearchDropdownComponent } from './components/search-dropdown/search-dropdown.component';

import { NameFilterPipe } from './pipes/name-filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

import { LineParserService } from './services/line-parser/line-parser.service';

@NgModule({
  declarations: [
    AppComponent,
    ActionBarComponent,
    InitativeTrackerComponent,
    CharacterInitativeComponent,
    ActionButtonComponent,
    SearchDropdownComponent,
    NameFilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    LineParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
