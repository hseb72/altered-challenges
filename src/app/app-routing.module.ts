import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from "./core/guards/auth.guard" ;

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { PersonalComponent } from './personal/personal.component';
import { FriendComponent } from './friend/friend.component';
import { ChallengeComponent } from './challenge/challenge.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'personal',  component: PersonalComponent, canActivate: [authGuard] },
  { path: 'friend',  component: FriendComponent, canActivate: [authGuard] },
  { path: 'challenge',  component: ChallengeComponent, canActivate: [authGuard] },
  { path: 'de',  component: HomeComponent, pathMatch: 'full' },
  { path: 'en',  component: HomeComponent, pathMatch: 'full' },
  { path: 'es',  component: HomeComponent, pathMatch: 'full' },
  { path: 'fr',  component: HomeComponent, pathMatch: 'full' },
  { path: 'it',  component: HomeComponent, pathMatch: 'full' },
  { path: 'pt',  component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
