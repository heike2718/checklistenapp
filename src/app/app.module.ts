import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgLoggerModule, Level } from '@nsalaun/ng-logger';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routerConfig } from './router.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from '../environments/environment';
import { MessagesComponent } from './messages/messages.component';
import { ChecklistenListeComponent } from './checklisten-liste/checklisten-liste.component';
import { ChecklisteComponent } from './checkliste/checkliste.component';
import { LoadingComponent } from './loading/loading.component';
import { ChecklistentypBackgroundDirective } from './shared/directives/checklistentyp.directive';
import { ConfigureChecklisteComponent } from './checkliste-detail/config-checkliste/configure-checkliste.component';
import { ExecuteChecklisteComponent } from './checkliste-detail/execute-checkliste/execute-checkliste.component';
import { ConfigureVorschlagslisteComponent } from './checkliste-detail/config-checkliste/items/configure-vorschlagsliste.component';
import { ConfigureEditComponent } from './checkliste-detail/config-checkliste/items/configure-edit.component';
import { ExecuteItemlisteComponent } from './checkliste-detail/execute-checkliste/items/execute-itemliste.component';
import { FilterChecklisteItemsPipe } from './shared/pipes/filter-checkliste-items.pipe';
import { HomeComponent } from './home/home.component';

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
    ChecklisteComponent,
    LoadingComponent,
    ChecklistentypBackgroundDirective,
    ConfigureChecklisteComponent,
    ExecuteChecklisteComponent,
    ConfigureVorschlagslisteComponent,
    ConfigureEditComponent,
    ExecuteItemlisteComponent,
    FilterChecklisteItemsPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routerConfig),
    HttpModule,
    NgLoggerModule.forRoot(LOG_LEVEL),
    NgbModule.forRoot(),
    NgbCollapseModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
