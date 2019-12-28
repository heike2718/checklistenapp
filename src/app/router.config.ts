import { Routes } from '@angular/router';
import { ChecklistenListeComponent } from './checklisten-liste/checklisten-liste.component';
import { ConfigureChecklisteComponent } from './checkliste-detail/config-checkliste/configure-checkliste.component';
import { ExecuteChecklisteComponent } from './checkliste-detail/execute-checkliste/execute-checkliste.component';
import { ConfigureChecklisteResolver } from './checkliste-detail/config-checkliste/configure-checkliste.resolver';
import { ExecuteChecklisteResolver } from './checkliste-detail/execute-checkliste/execute-checkliste.resolver';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoggedInGuard } from './shared/logged-in.guard';
import { AboutComponent } from './about/about.component';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { TemplateListeComponent } from './template-liste/template-liste.component';
import { EditTemplateResolver } from './template-detail/edit-template.resolver';

export const routerConfig: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path: 'listen',
		component: ChecklistenListeComponent,
		canActivate: [LoggedInGuard]
	},
	{
		path: 'checkliste/configuration/:kuerzel',
		component: ConfigureChecklisteComponent,
		resolve: {
			detail: ConfigureChecklisteResolver
		},
		canActivate: [LoggedInGuard]

	},
	{
		path: 'checkliste/execution/:kuerzel',
		component: ExecuteChecklisteComponent,
		resolve: {
			detail: ExecuteChecklisteResolver
		},
		canActivate: [LoggedInGuard]
	},
	{
		path: 'templates',
		component: TemplateListeComponent,
		canActivate: [LoggedInGuard]
	},
	{
		path: 'template/:typ',
		component: TemplateDetailComponent,
		resolve: {
			detail: EditTemplateResolver
		},
		canActivate: [LoggedInGuard]

	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/home'
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '/home'
	}
];
