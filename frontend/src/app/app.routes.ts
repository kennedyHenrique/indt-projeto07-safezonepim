
import { CanActivate } from '@angular/router';
import { Routes } from '@angular/router';
import {authGuard} from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { Cargo } from './core/models/cargo.enum';


export const routes: Routes = [
    {path: '', redirectTo: 'registros', pathMatch: 'full'},
    {path:'login', loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),},
    {path: '403', loadComponent: () => import('./features/auth/forbidden/forbidden.component').then((m) => m.ForbiddenComponent),},
    {
        path: 'registros', canActivate:[authGuard], children:[
            {
                path: '', loadComponent: () => import('./features/registros/list/registros-list.component').then((m) => m.RegistrosListComponent),
            },
            {   
                path:'nova', canActivate:[roleGuard(Cargo.OPERADORDESEGURANCA, Cargo.GESTORDESEGURANCA)],
                loadComponent: () => import('./features/registros/form/registro-form.component').then((m)=>m.RegistroFormComponent,),
            },
            {
                path: ':id', loadComponent: () => import('./features/registros/detail/registro-detail.component').then((m)=>m.RegistroDetailComponent,),
            },
            {
                path:':id/editar', canActivate:[roleGuard(Cargo.GESTORDESEGURANCA,Cargo.OPERADORDESEGURANCA)], loadComponent: () =>
                import('./features/registros/form/registro-form.component').then((m) => m.RegistroFormComponent,),
            },
        ],
    },
    {
        path:'colaboradores', canActivate: [authGuard, roleGuard(Cargo.GESTORDESEGURANCA)],
        children:[
            {
                path:'', loadComponent: () => import('./features/colaboradores/list/colaboradores-list.component').then((m) => m.ColaboradoresListComponent,),
            },
            {
                path: 'novo', loadComponent: () => import('./features/colaboradores/form/colaborador-form.component').then((m) => m.ColaboradorFormComponent,),
            },
        ],
    },
    {
        path: 'areas', canActivate:[authGuard], children:[
            {
                path: '', loadComponent: () => import('./features/areas/list/areas-list.component').then((m)=> m.AreasListComponent,),
            },
            {
                path: 'novo', canActivate:[roleGuard(Cargo.GESTORDESEGURANCA)], loadComponent: () => import('./features/areas/form/area-form.component').then((m)=>m.AreaFormComponent,),
            },
            {
                path: ':id/editar', canActivate:[roleGuard(Cargo.GESTORDESEGURANCA)], loadComponent: () => import('./features/areas/form/area-form.component').then((m)=>m.AreaFormComponent,),
            },
        ],
    },
    {
        path: '**', redirectTo: 'registros'
    },
];
