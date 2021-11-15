import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
/**
 * Generated class for the PresionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-presion',
  templateUrl: 'presion.html',
})
export class PresionPage {
  temperature1: boolean = true;
  temperature2: boolean = false;
  buttonPositive: any;
  buttonNegative: any;
  temperatureActual: any = 0;
  temperatureTp1: any;
  temperatureTp2: any;
  temperatureTp3: any;
  temperatureTp4: any;
  temperatureTp5: any;
  temperatureTp6: any;
  indicatorVal = 0;
  buttonToggle: boolean = true;
  buttonToggle2: boolean = true;
  textToggle: any = "Encendido";
  buttonConfiguration: boolean = false;
  buttonHistory: boolean = false;
  observableVar: Subscription;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemperaturePage');

    this.observableVar = Observable.interval(1000).subscribe(() => {
      this.TemperatureRanger();
    });

  }
  ionViewDidLeave() {
    this.observableVar.unsubscribe();
  }

  TemperatureRanger() {
    if (this.buttonToggle) {
      this.temperatureTp1 = Math.trunc(Math.random() * (27 - 20) + 20);
    }
    if (this.buttonToggle2) {
      this.temperatureTp2 = Math.trunc(Math.random() * (27 - 20) + 20);
    }
  }


  goToToggle() {
    if (this.buttonToggle) {
      this.buttonToggle = false;
      this.temperatureTp1 = 0;
      this.textToggle = 'Apagado';
      const alert = this.alertCtrl.create({
        title: 'Sensor Evaporador',
        subTitle: 'Evaporador Apagado',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.textToggle = 'Encendido';
      this.buttonToggle = true;
      const alert = this.alertCtrl.create({
        title: 'Sensor Evaporador',
        subTitle: 'Evaporador Encendido',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  goToToggle2() {
    if (this.buttonToggle2) {
      this.buttonToggle2 = false;
      this.temperatureTp2 = 0;
      const alert = this.alertCtrl.create({
        title: 'Sensor Compresor',
        subTitle: 'Compresor Apagado',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.buttonToggle2 = true;
      const alert = this.alertCtrl.create({
        title: 'Sensor Compresor',
        subTitle: 'Compresor Encendido',
        buttons: ['OK']
      });
      alert.present();
    }
  }


  goToShow() {
    const alert = this.alertCtrl.create({
      title: 'Preguntas frecuentes',
      subTitle: 'En construcción',
      buttons: ['OK']
    });
    alert.present();
  }



}
