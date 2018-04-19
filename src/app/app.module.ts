import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';

import { ServicesProvider } from '../providers/services/services';

const firebase = {
  apiKey:"AIzaSyA6h-xgbPCaGTYXJcRcHtFUU2OuwpNsEJo",
  projectId:"danieriraul-be936",
  /*
  authDomain:"",
  databaseURL:"",
  storageBucket:"",
  messagingSenderId:""*/
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,
    Firebase,
    UniqueDeviceID,
    BarcodeScanner,
  ]
})
export class AppModule {}
