import { Component } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { NavController, ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';

import { ServicesProvider } from '../../providers/services/services';

import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public id;
  public token;

  public stats;

  public devices = [];
  constructor(public firebase: Firebase, public navCtrl: NavController, public toastCtrl: ToastController, public services:ServicesProvider,private uid: UniqueDeviceID) {
    this.stats = "Conectando...";

    // Listen to incoming messages, showing them inside app
    this.services.listenToNotifications().pipe(
      tap(msg => {
        this.getNotifications();
        // show a toast
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    ).subscribe();
  }
  ionViewDidLoad() {
    this.uid.get()
      .then((uuid: any) => {
        this.id = uuid;

        //getting the TOKEN
        this.firebase.getToken()
          .then(tokenTMP => {
            this.stats = "Conectado";
            this.token = tokenTMP;

            this.doService();
          })
          .catch((error) => { this.stats = "ERROR:" + error; } );

        this.firebase.onTokenRefresh()
          .subscribe((tokenTMP) => {
            this.stats = "Conectado";
            this.token = tokenTMP;

            this.doService();
          });
      })
      .catch((error) => { this.stats = "ERROR:" + error; } );
  }
  public doService() {
    let data = {
      uid:this.id,
      token:this.token,
    }
    this.services.doPost("http://10.10.2.162:777/updatetoken",data).subscribe(
        res => { this.onServiceResult(res); },
        err => { this.stats = "Error: 404 Server Error"; }
      );
  }
  public onServiceResult(data) {
    if (data.success == "ok") this.getNotifications();
    else this.stats = data.errorMessage;
  }
  public onClick() {
    this.navCtrl.push(AddPage, {
      uid: this.id
    })
  }
  public getNotifications() {
    let data = { uid:this.id }
    this.services.doPost("http://10.10.2.162:777/getnotifications",data).subscribe(
        res => { this.onNotificationsResult(res); },
        err => { this.stats = "Error: 404 Server Error"; }
      );
  }
  public onNotificationsResult(data) {
    if (data.success == "ok") {
      this.devices = [];
      for (let i = 0; i < data.result.length;i++) {
        let obj = {
          checked:data.result[i].CHECKED,
          color:"#cccccc",
          deviceid:data.result[i].DEVICEID,
          name:data.result[i].NAME,
          desc:data.result[i].DESC
        }
        this.devices.push(obj);
      }
      this.stats = "notificaciiones cargadas: " + data.result.length + " " + data.result[0].NAME;
    } else this.stats = data.errorMessage;
  }

  public onCheck(deviceid) {
    let data = { deviceid:deviceid }
    this.services.doPost("http://10.10.2.162:777/checknotification",data).subscribe(
        res => { this.onNotificationCheckResult(res); },
        err => { this.stats = "Error: 404 Server Error"; }
      );
  }
  public onNotificationCheckResult(data) {
    this.stats = "Notificacion actualizada";
    this.getNotifications();
  }
}
