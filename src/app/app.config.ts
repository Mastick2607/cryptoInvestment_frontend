import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- Y ESTE PROVIDER

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(),provideAnimations()],
};
