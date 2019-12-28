import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { routerConfig } from './router.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChecklistenListeComponent } from './checklisten-liste/checklisten-liste.component';
import { ChecklisteComponent } from './checkliste/checkliste.component';
import { LoadingComponent } from './loading/loading.component';
import { LoggedInGuard } from './shared/logged-in.guard';
import { ChecklistentypBackgroundDirective } from './shared/directives/checklistentyp.directive';
import { ConfigureChecklisteComponent } from './checkliste-detail/config-checkliste/configure-checkliste.component';
import { ExecuteChecklisteComponent } from './checkliste-detail/execute-checkliste/execute-checkliste.component';
import { ConfigureVorschlagslisteComponent } from './checkliste-detail/config-checkliste/items/configure-vorschlagsliste.component';
import { ItemButtonComponent } from './checkliste-detail/config-checkliste/item-button/item-button.component';
import { EditableItemButtonComponent } from './checkliste-detail/config-checkliste/editable-item-button/editable-item-button.component';
import { ConfigureEditComponent } from './checkliste-detail/config-checkliste/items/configure-edit.component';
import { ExecuteItemlisteComponent } from './checkliste-detail/execute-checkliste/items/execute-itemliste.component';
import { HomeComponent } from './home/home.component';
import { StatistikChecklistePipe } from './shared/pipes/statistik-checkliste.pipe';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error/error-handler.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HewiNgLibModule } from 'hewi-ng-lib';
import { JokeComponent } from './joke/joke.component';
import { AboutComponent } from './about/about.component';
import { TemplateListeComponent } from './template-liste/template-liste.component';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { TemplateComponent } from './template/template.component';
import { StatistikTemplatePipe } from './shared/pipes/statistik-template.pipe';
import { TemplateItemButtonComponent } from './template-detail/string-button/template-item-button.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		ChecklistenListeComponent,
		ChecklisteComponent,
		LoadingComponent,
		ChecklistentypBackgroundDirective,
		ConfigureChecklisteComponent,
		ExecuteChecklisteComponent,
		ConfigureVorschlagslisteComponent,
		ConfigureEditComponent,
		ExecuteItemlisteComponent,
		HomeComponent,
		StatistikChecklistePipe,
		SignUpComponent,
		ItemButtonComponent,
		EditableItemButtonComponent,
		JokeComponent,
		AboutComponent,
		TemplateListeComponent,
		TemplateDetailComponent,
		TemplateComponent,
		StatistikTemplatePipe,
		TemplateItemButtonComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(routerConfig, { useHash: true }),
		HttpClientModule,
		FormsModule,
		NgbModule,
		NgbCollapseModule,
		HewiNgLibModule

	],
	providers: [
		GlobalErrorHandler,
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		LoggedInGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
