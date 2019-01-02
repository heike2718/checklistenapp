import { Routes } from '@angular/router';
import { ChecklistenListeComponent } from './checklisten-liste/checklisten-liste.component';
import { ConfigureChecklisteComponent } from './checkliste-detail/config-checkliste/configure-checkliste.component';
import { ExecuteChecklisteComponent } from './checkliste-detail/execute-checkliste/execute-checkliste.component';
import { ConfigureChecklisteResolver } from './checkliste-detail/config-checkliste/configure-checkliste.resolver';
import { ExecuteChecklisteResolver } from './checkliste-detail/execute-checkliste/execute-checkliste.resolver';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routerConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'listen',
        component: ChecklistenListeComponent
    },
    {
        path: 'checkliste/configuration/:kuerzel',
        component: ConfigureChecklisteComponent,
        resolve: {
            detail: ConfigureChecklisteResolver
        }
    },
    {
        path: 'checkliste/execution/:kuerzel',
        component: ExecuteChecklisteComponent,
        resolve: {
            detail: ExecuteChecklisteResolver
        }
    },
    {
        path: 'error',
        component: ErrorComponent
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


