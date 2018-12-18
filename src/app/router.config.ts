import { Routes } from '@angular/router';
import { ChecklistenListeComponent } from './checklisten-liste/checklisten-liste.component';
import { ChecklisteDetailComponent } from './checkliste-detail/checkliste-detail.component';
import { ChecklisteDetailResolver } from './checkliste-detail/checkliste-detail.resolver';

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
        path: 'all-listen',
        component: ChecklistenListeComponent
    },
    {
        path: 'checkliste/:kuerzel',
        component: ChecklisteDetailComponent,
        resolve: {
            detail: ChecklisteDetailResolver
        }
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


