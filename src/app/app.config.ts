import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthInterceptor} from './iam/services/auth.interceptor';
import {AuthService} from './iam/services/auth.service';
import {InstitutionService} from './iam/services/institution.service';
import {StudentService} from './iam/services/student.service';
import {GamesService} from './mathplayopen/services/games.service';
import {ReviewsService} from './mathplayopen/services/reviews.service';
import {ScoresService} from './mathplayopen/services/scores.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), provideAnimationsAsync(), provideAnimationsAsync(),
    AuthService,
    InstitutionService,
    StudentService,
    GamesService,
    ReviewsService,
    ScoresService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
