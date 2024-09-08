import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ArraySortPipe } from './core/helpers/arraySortPipe' ;

// UI Add-ons
//import { DragDropModule } from '@angular/cdk/drag-drop';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Localization
//import { registerLocaleData } from '@angular/common';
// import localeFr from '@angular/common/locales/fr';
// import localeFrExtra from '@angular/common/locales/extra/fr';
//import { LocalDatePipe } from './core/pipes/local-date.pipe';

// Authentication
import { SocialLoginModule,  SocialAuthServiceConfig,} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
//import { TorpeedoLoginProvider} from 'angularx-social-login';

// Interceptors
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/error.interceptor';

import { LocalizeFn } from '@angular/localize/init';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Mateial UI modules
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

import { A11yModule } from '@angular/cdk/a11y';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const uiModules = [
  A11yModule,
  MatBadgeModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatDialogModule,
  MatRadioModule,
  MatInputModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSortModule,
  MatPaginatorModule,
  MatGridListModule,
];

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FriendComponent } from './friend/friend.component';
import { PersonalComponent } from './personal/personal.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { NewsComponent } from './news/news.component';
//  import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    FriendComponent,
    PersonalComponent,
    ChallengeComponent,
    NewsComponent
  ],
  imports: [
    uiModules,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
/*
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
   }),
*/
],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    { 
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('497387296496-92inc3c9oqnmtbjok3u40fbo4pl1h163.apps.googleusercontent.com', {oneTapEnabled: false}),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('6614387431952014'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  logged: boolean = false;
}
