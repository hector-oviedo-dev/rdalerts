import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  constructor(public firebaseNative: Firebase, public http: HttpClient) {
    //this.connect();
  }
  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
  public doPost(service, data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(service, data, {headers: headers});
  }
}
