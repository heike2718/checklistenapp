import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgLoggerModule, Level } from '@nsalaun/ng-logger';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from '../environments/environment';
import { MessagesComponent } from './messages/messages.component';
import { ChecklistenListeComponent } from './checklisten-liste/checklisten-liste.component';
import { ChecklistenitemComponent } from './items/checklistenitem/checklistenitem.component';
import { ChecklisteComponent } from './checkliste/checkliste/checkliste.component';
import { HttpModule } from '@angular/http';
import { ChecklisteDetailComponent } from './checkliste-detail/checkliste-detail.component';

// Set different log level depending on environment.
let LOG_LEVEL = Level.ERROR;
if (!environment.production) {
  LOG_LEVEL = Level.DEBUG;
}
console.log('LOG_LEVEL=' + LOG_LEVEL);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessagesComponent,
    ChecklistenListeComponent,
    ChecklistenitemComponent,
    ChecklisteComponent,
    ChecklisteDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgLoggerModule.forRoot(LOG_LEVEL),
    NgbModule.forRoot(),
    NgbCollapseModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
