import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LearnPage } from '../pages/learn/learn';
import { TestPage } from '../pages/test/test';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LearningPage} from "../pages/learning/learning";
import {TestingPage} from "../pages/testing/testing";

import { IonicStorageModule } from '@ionic/storage';
import {Vibration} from "@ionic-native/vibration";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    LearnPage,
    TestPage,
    HomePage,
    TabsPage,
    LearningPage,
    TestingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LearnPage,
    TestPage,
    HomePage,
    TabsPage,
    LearningPage,
    TestingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
