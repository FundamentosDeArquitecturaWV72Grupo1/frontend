import { Routes } from '@angular/router';
import {UserSigninComponent} from './mathplayopen/components/user-signin/user-signin.component';

export const routes: Routes = [
  { path: 'sign-in', component: UserSigninComponent},
  { path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];
