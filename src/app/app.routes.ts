import { Routes } from '@angular/router';
import {UserSigninComponent} from './iam/pages/user-signin/user-signin.component';
import {UserSignupComponent} from './iam/pages/user-signup/user-signup.component';
import {NewsComponent} from './mathplayopen/pages/news/news.component';
import {ProfileComponent} from './mathplayopen/pages/profile/profile.component';

export const routes: Routes = [
  { path: 'news', component: NewsComponent},
  { path: 'sign-up', component: UserSignupComponent},
  { path: 'sign-in', component: UserSigninComponent},
  {path: 'profile', component: ProfileComponent},
  { path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];
