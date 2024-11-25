import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module'
import { AppComponent } from './app.component'
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {NgxSonnerToaster} from "ngx-sonner";
import {privateGuard, publicGuard} from "./auth/auth.guard";


const routes = [
  {
    path: 'owner-profile',
    loadChildren: () =>
      import('./pages/owner-profile/owner-profile.module').then(
        (m) => m.OwnerProfileModule
      ),
  },
  {
    path: 'care-qa',
    loadChildren: () =>
      import('./pages/care-qa/care-qa.module').then((m) => m.CareQaModule),
  },
  {
    path: 'pet-profile',
    loadChildren: () =>
      import('./pages/pet-profile/pet-profile.module').then(
        (m) => m.PetProfileModule
      ),
  },
  {
    path: 'qa',
    loadChildren: () => import('./pages/qa/qa.module').then((m) => m.QaModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    canActivate: [publicGuard],
  },
  {
    path: 'user-owner-profile',
    loadChildren: () =>
      import('./pages/user-owner-profile/user-owner-profile.module').then((m) => m.UserOwnerProfileModule),
  },
  {
    path: 'saves',
    loadChildren: () =>
      import('./pages/saves/saves.module').then((m) => m.SavesModule),
    canActivate: [privateGuard],
  },
  {
    canActivate: [privateGuard],
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'mailbox',
    loadChildren: () =>
      import('./pages/mailbox/mailbox.module').then((m) => m.MailboxModule),
    canActivate: [privateGuard],
  },
  {
    path: 'adoption-qa',
    loadChildren: () =>
      import('./pages/adoption-qa/adoption-qa.module').then(
        (m) => m.AdoptionQaModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [publicGuard],
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./pages/form/form.module').then((m) => m.FormModule),
    canActivate: [privateGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [privateGuard],
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./pages/map/map.module').then((m) => m.MapModule),
    canActivate: [privateGuard],
  },
  {
    path: 'user-pet-profile',
    loadChildren: () =>
      import('./pages/user-pet-profile/user-pet-profile.module').then(
        (m) => m.UserPetProfileModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ComponentsModule,
      NgxSonnerToaster,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
