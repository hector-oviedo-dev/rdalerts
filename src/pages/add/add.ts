import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ServicesProvider } from '../../providers/services/services';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  public stats;

  public uid;
  public deviceid;
  public name;
  public desc;
  constructor(public navCtrl: NavController, public navParams: NavParams,public brScanner: BarcodeScanner, public services:ServicesProvider) {
    this.uid = navParams.get("uid");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }
  public onScanClick() {
    this.brScanner.scan().then(barcodeData => {
      this.deviceid = barcodeData.text;
    }, (err) => {
      this.deviceid = "";
    });
  }

  public onClick() {
    let data = {
      uid:this.uid,
      deviceid:this.deviceid,
      name:this.name,
      desc:this.desc,
    }
    this.services.doPost("http://rdalerts.cloudno.de/updatedevice",data).subscribe(
        res => { this.onServiceResult(res); },
        err => { this.stats = "Error: 404 Server Error"; }
      );
  }
  public onServiceResult(data) {
    if (data.success == "ok") this.stats = "Dispositivo asosiado exitosamente";
    else { this.stats = data.errorMessage; }
  }
}
