import { Routes } from '@angular/router';
import {UserSigninComponent} from './mathplayopen/components/user-signin/user-signin.component';
import {UserSignupComponent} from './mathplayopen/components/user-signup/user-signup.component';
import {NewsComponent} from './mathplayopen/pages/news/news.component';

export const routes: Routes = [
  { path: 'news', component: NewsComponent},
  { path: 'sign-up', component: UserSignupComponent},
  { path: 'sign-in', component: UserSigninComponent},
  { path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];
