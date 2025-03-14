import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        // LazyLoadComponent
        // loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component').then(c => c.DashboardPageComponent) // sin default
        loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
        children: [
            {
                path: 'trending',
                loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
            },
            {
                path: 'search',
                loadComponent: () => import('./gifs/pages/search-page/search-page.component')
            },
            {
                // Mandar argumentos dinamicos
                path: 'history/:query',
                loadComponent: () => import('./gifs/pages/gif-history/gif-history.component')
            },
            {
                path: '**',
                redirectTo: 'trending'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
