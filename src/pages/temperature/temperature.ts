import { Component } from '@angular/core';
import { Observable } from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
import {
  IonicPage,
	NavController,
	AlertController,
	LoadingController,
  NavParams,
	Platform,
	ActionSheetController
} from "ionic-angular";
/**
 * Generated class for the TemperaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html',
})
export class TemperaturePage {
  temperature1: boolean = true;
  temperature2: boolean = false;
  buttonPositive: any;
  buttonNegative: any;
  temperatureActual: any;
  temperatureValue = 0;
  indicatorVal = 0;
  buttonToggle: boolean = true;
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

  TemperatureRanger(){
    if (!this.buttonToggle) return;
    this.temperatureActual = (Math.trunc(Math.random() * (16 - 18) + 16)) + this.temperatureValue;
    this.indicatorVal = ((270 * (this.temperatureActual / 100)) - 135)+this.temperatureValue;
  }

  goToSum() {
    if (this.temperatureActual == 100) return;
    this.temperatureValue++;
    if (this.temperature1) {
      this.temperature1 = false;
    } else {
      this.temperature1 = true;
    }
    this.indicatorVal = ((270 * (this.temperatureActual / 100)) - 135)+this.temperatureValue;
    console.log(this.indicatorVal);
  }
  goToRest() {
    if (this.temperatureActual == 0) return;
    this.temperatureValue--;
    this.indicatorVal = ((270 * (this.temperatureActual / 100)) - 135)+this.temperatureValue;
    console.log(this.indicatorVal);
    if (this.temperature1) {
      this.temperature1 = false;
      this.temperature2 = true;
    } else {
      this.temperature1 = true;
      this.temperature2 = false;
    }
  }

  goToToggle() {
    if (this.buttonToggle) {
      this.buttonToggle = false;
      this.temperatureActual = 0;
      this.indicatorVal = (270 * (0 / 100)) - 135;
      this.textToggle = 'Apagado';
    } else {
      this.textToggle = 'Encendido';
      this.buttonToggle = true;
    }
  }
  goToConfiguration() {
    if (this.buttonConfiguration) {
      this.buttonConfiguration = false;
    } else {
      this.buttonConfiguration = true;
    }
  }
  goToHistory() {
    if (this.buttonHistory) {
      this.buttonHistory = false;
    } else {
      this.buttonHistory = true;
      const fecha = new Date();
      const date1 = fecha.getDate() - 1;
      const date2 = fecha.getDate() - 2;
      const date3 = fecha.getDate() - 3;
      const date4 = fecha.getDate() - 4;
      const date5 = fecha.getDate() - 5;
      const date6 = fecha.getDate() - 6;
      const date7 = fecha.getDate() - 7;
      const promt = this.alertCtrl.create({
        title: 'Historial de Temperatura',
        message: "<ul>" +
        "<li>"+date1+"/11/2021 : 16°</li>"+
        "<li>"+date2+"/11/2021 : 17°</li>"+
        "<li>"+date3+"/11/2021 : 18°</li>"+
        "<li>"+date4+"/11/2021 : 16°</li>"+
        "<li>"+date5+"/11/2021 : 16°</li>",
        buttons: [
          {
            text: 'Cerrar',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      promt.present();
    }
  }

  goToConfigure(){
    const prompt = this.alertCtrl.create({
      title: 'Configuración ',
      message: "Configuración de Sensor de Temperatura Ambiente",
      inputs: [
        {
          name: 'Maxima Temperatura',
          placeholder: 'Maxima Temperatura'
        },
        {
          name: 'Minima Temperatura',
          placeholder: 'Minima Temperatura'
        },
        {
          name: 'Apagar a Temperatura',
          placeholder: 'Apagar a Temperatura'
        },
        {
          name: 'Encender a Temperatura',
          placeholder: 'Encender a Temperatura'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
