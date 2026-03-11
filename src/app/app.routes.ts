import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './Guards/authGuard.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'properties', pathMatch: 'full' },
      {
        path: 'properties',
        loadComponent: () =>
          import('./pages/property/properties/properties.component').then(
            (c) => c.PropertiesComponent,
          ),
      },
      {
        path: 'add-property',
        loadComponent: () =>
          import('./pages/property/add-property/add-property.component').then(
            (c) => c.AddPropertyComponent,
          ),
      },

      {
        path: 'property-details/:id',
        loadComponent: () =>
          import('./pages/property/property-detail/property-detail.component').then(
            (c) => c.PropertyDetailComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact-us/contact/contact.component').then(
            (c) => c.ContactComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about-us/about/about.component').then(
            (c) => c.AboutComponent,
          ),
      },
      {
        path: 'fav-properties',
        loadComponent: () =>
          import('./pages/property/fav-properties/fav-properties.component').then(
            (c) => c.FavPropertiesComponent,
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./pages/auth/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent,
          ),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (c) => c.NotfoundComponent,
      ),
  },
];
