import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CursoPage} from "../pages/curso/curso";
import {HttpModule} from "@angular/http";
import {CursoService} from "../pages/curso/curso.service";
import {CursoformPage} from "../pages/cursoform/cursoform";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CursoPage,
    CursoformPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CursoPage,
    CursoformPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CursoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
