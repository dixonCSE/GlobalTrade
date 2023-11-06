import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((mod) => mod.AuthModule),
        data: {
            preload: false,
            moduleName: 'auth',
        },
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./user/user.module').then((mod) => mod.UserModule),
        data: {
            preload: false,
            moduleName: 'user',
        },
    },
    {
        path: 'login',
        redirectTo: '/auth/login',
    },
    {
        path: 'signup',
        redirectTo: '/auth/signup',
    },
    {
        path: '',
        //redirectTo: '/home',
        redirectTo: '/auth/login',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
