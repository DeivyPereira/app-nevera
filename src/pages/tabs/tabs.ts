import { Component } from '@angular/core';
import {
	NavController,
	AlertController,
	LoadingController,
	Platform,
	ActionSheetController,
	App
} from "ionic-angular";
import { HomePage } from "../home/home";
import { CameraPage } from "../camera/camera";
import { PerfilPage } from "../perfil/perfil";
import { AddOrderPage } from "../add-order/add-order";
import { MapsPage } from "../maps/maps";
import { Storage } from "@ionic/storage";

@Component({
	templateUrl: 'tabs.html',
})
export class TabsPage {
	tab1Root = HomePage;
	tab2Root = CameraPage;
	tab3Root = PerfilPage;
	roles: any;
	company:any;
	constructor(public actionSheetCtrl: ActionSheetController,
		private readonly storage: Storage, public app: App) {
	}

	ionViewWillEnter() {
		//this.resumen()
		this.storage.get("role").then(val => {
			this.roles = val;
			console.log(this.roles)
		});
		this.storage.get("company").then(val => {
			this.company = val;
			console.log(this.roles)
		});
	}
/*
	presentAdd(e) {
		if (this.roles == "Cliente") {
			const actionSheet = this.actionSheetCtrl.create({
				title: 'Crear nuevo',
				buttons: [
					{
						text: 'Solicitud de Trabajo',
						icon: 'clipboard',
						handler: () => {
							//
							this.app.getRootNav().push(AddPreOrderPage,{rol: this.roles, company: this.company });
							console.log('Destructive clicked');
						}
					}
				]
			});
			
		actionSheet.present();
		}else{
			const actionSheet = this.actionSheetCtrl.create({
				title: 'Crear nuevo',
				buttons: [
					{
						text: 'Orden de Trabajo',
						icon: 'clipboard',
						handler: () => {
							//AddOrderPage
							this.app.getRootNav().push(AddOrderPage);
							console.log('Destructive clicked');
						}
					}, {
						text: 'Ubicación',
						icon: 'map',
						handler: () => {
							this.app.getRootNav().push(MapsPage);
	
							console.log('Archive clicked');
						}
					}
				]
			});
			actionSheet.present();
		}
	}
	*/


}
