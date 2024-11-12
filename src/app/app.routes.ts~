import { Routes } from '@angular/router';
import {UserSigninComponent} from './iam/pages/user-signin/user-signin.component';
import {UserSignupComponent} from './iam/pages/user-signup/user-signup.component';
import {NewsComponent} from './mathplayopen/pages/news/news.component';
import {ProfileComponent} from './mathplayopen/pages/profile/profile.component';
import {GamesComponent} from './mathplayopen/pages/games/games.component';
import {GamesDetailsComponent} from './mathplayopen/pages/games-details/games-details.component';
import {FavoriteGamesComponent} from './mathplayopen/pages/favorite-games/favorite-games.component';

export const routes: Routes = [
  { path: 'news', component: NewsComponent},
  { path: 'sign-up', component: UserSignupComponent},
  { path: 'sign-in', component: UserSigninComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'games', component: GamesComponent},
  {path: 'games/:id', component: GamesDetailsComponent},
  {path: 'favorite-games', component: FavoriteGamesComponent},
  { path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];
