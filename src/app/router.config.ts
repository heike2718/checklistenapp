import { Routes } from '@angular/router';
import { ChecklistenListeComponent } from './checklisten-liste/checklisten-liste.component';
import { ConfigureChecklisteComponent } from './checkliste-detail/config-checkliste/configure-checkliste.component';
import { ExecuteChecklisteComponent } from './checkliste-detail/execute-checkliste/execute-checkliste.component';

export const routerConfig: Routes = [
    // {
    //     path: 'home',
    //     component: HomeComponent
    // },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    {
        path: 'listen',
        component: ChecklistenListeComponent
    },
    {
        path: 'checkliste/configuration/:kuerzel',
        component: ConfigureChecklisteComponent
    },
    {
        path: 'checkliste/execution/:kuerzel',
        component: ExecuteChecklisteComponent,
    },
    // {
    //     path: 'lesson/new',
    //     component: CreateLessonComponent
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/'
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/'
    }
];


