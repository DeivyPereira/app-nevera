import { Component } from "@angular/core";
import {
	NavController,
	AlertController,
	LoadingController,
	Platform,
	ActionSheetController
} from "ionic-angular";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ApiProvider } from "../../providers/api/api";
import { UrlProvider } from "../../providers/url/url";
import { Diagnostic } from "@ionic-native/diagnostic";
import { AuthProvider } from "../../providers/auth/auth";
import { Storage } from "@ionic/storage";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { PreOrdenPage } from "../pre-orden/pre-orden";
import { PerfilPage } from "../perfil/perfil";
import { TemperaturePage } from "../temperature/temperature";
import { Tp100Page } from "../tp100/tp100";
import { PresionPage } from "../presion/presion";
import { ConfigurationPage  } from "../configuration/configuration";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";


declare var google;
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	saludo: any;
	loading: any;
	id: any;
	dni: any;
	company: any;
	name: any;
	information: any;
	avatar: any;
	covid: any;
	roles: any;
	role: number;
	decode: string;
	cargo: string;
	response: any;
	paso: boolean = false;
	change: boolean = false;
	list: any;
	pending: any;
	codeBar: any;
	birthday: any;
	successful: any;
	logs: any;
	textHome: any;
	total: number = 0;
	logoActive: boolean = false;
	listLogo: any;
	isNotClient: boolean = false;
	isAdmnin: boolean = false;
	isPlanificador: boolean = false;
	isPlan: boolean = false;
	latitud: number;
	longitud: number;
	buttonQR: boolean = false;
	buttonProduct1: boolean = true;
	buttonHelp: boolean = false;
	buttonLogout: boolean = false;

	constructor(
		public navCtrl: NavController,
		public url: UrlProvider,
		public authProvider: AuthProvider,
		public api: ApiProvider,
		public jwtHelper: JwtHelperService,
		private readonly storage: Storage,
		private alertCtrl: AlertController,
		public loadingController: LoadingController,
		public actionSheetCtrl: ActionSheetController,
		private geolocation: Geolocation,
		private diagnostic: Diagnostic,
		public platform: Platform,
		private _barcodeScanner: BarcodeScanner
	) {
		this.comprobar();
	}
	scanQR() {
		this.loading = true;
		this._barcodeScanner.scan().then(
		  barcodeData => {
			if (barcodeData.cancelled) {
			  console.log("Usuario cancelo scaneo.");
			  this.loading = false;
			  return false;
			}
			this.codeBar = barcodeData.text;
			console.log("Scaneo Exitoso.!");
			console.log(barcodeData.text);
			const alert = this.alertCtrl.create({
				title: 'Dispositivo QR',
				subTitle: 'No se encontro codigo MAC enlazado!',
				buttons: ['OK']
			  });
			  alert.present();
		  },
		  err => {
			this.loading = false;
			console.log(err);
		  }
		);
	  }
	comprobar() {
		this.authProvider.authUser.subscribe(jwt => {
			if (jwt) {
				let data = jwt;
				data = JSON.parse(data);
				const decoded = this.jwtHelper.decodeToken(jwt);
				this.decode = decoded;
				this.id = decoded.iduser;
				this.roles = decoded.role;
				this.name = decoded.name;
				this.dni = decoded.dni;
				this.company = decoded.company;
				this.information = decoded.information;
				this.storage.set("id", decoded.iduser);
				this.storage.set("dni", decoded.dni);
				this.storage.set("company", decoded.company);
				this.storage.set("register", decoded.register);
				this.storage.set("name", decoded.name);
				this.storage.set("phone", decoded.phone);
				this.storage.set("role", decoded.role);
				this.storage.set("token", data.token);
				console.log('Compañia es ' + this.company);
				console.log('id es ' + decoded.iduser);
				console.log('El rol es: ' + this.roles);
				if (this.roles != "Cliente") this.isNotClient = true;
				if (this.roles == "administrador" || this.roles == 'Planificador') this.isAdmnin = true;
				if (this.roles == 'Planificador') this.isPlanificador = true;

			}
		},
			err => {
				console.log('Error en Authentificar Auth')
				this.authProvider.logout();
				this.storage.remove("jwt_token");
			});

		if (this.roles == "Cliente") {
			this.logoActive = true;
			this.api.get('company' + '/' + this.company)
				.subscribe(
					jwt => {
						if (jwt) {
							this.listLogo = jwt;
							this.listLogo = this.listLogo.data;
							console.log(this.listLogo.logo);
						} else {
							console.log("Error de Conexion");
						}
					},
					err => {
						console.log('No capto información de documentos')
					});
		}

	}

	goToTest(params) {
		console.log(params)
		if (!params) params = {};
	}


	goToTp() {
		this.navCtrl.push(Tp100Page);
	}
	goToTemperature(){
		this.navCtrl.push(TemperaturePage);
	}
	goToPresion(){
		this.navCtrl.push(PresionPage);
	}

	goToConfiguration(){
		this.navCtrl.push(ConfigurationPage);
	}
	goTOPerfil(){
		this.navCtrl.push(PerfilPage);
	}

	goToQuestion(){
		const alert = this.alertCtrl.create({
			title: 'Preguntas frecuentes',
			subTitle: 'En construcción',
			buttons: ['OK']
		  });
		  alert.present();
	}
	
	addQR() {
		const confirm = this.alertCtrl.create({
		  title: 'Desea agregar otra camara de frio?',
		  message: 'Puedes escanear el codigo QR del dispositivo para enlazarlo',
		  buttons: [
			{
			  text: 'Cancelar',
			  handler: () => {
				console.log('Disagree clicked');
			  }
			},
			{
			  text: 'Agregar',
			  handler: () => {
				console.log('Agree clicked');
				this.scanQR()
			  }
			}
		  ]
		});
		confirm.present();
	}
	CameraSelect(){
		const alert = this.alertCtrl.create({
			title: 'Camara de Frio #5688',
			subTitle: 'Ya esta seleccionada esta camara de frio',
			buttons: ['OK']
		  });
		  alert.present();
	}

}
