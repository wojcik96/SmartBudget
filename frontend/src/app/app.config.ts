import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
registerLocaleData(localeFr, 'fr')

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './shared/interceptors/auth-interceptor'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { provideMomentDateAdapter } from '@angular/material-moment-adapter'
import { DATE_FORMATS } from './shared/defs/date-format'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideCharts(withDefaultRegisterables()),
    provideMomentDateAdapter(DATE_FORMATS),
  ],
}
