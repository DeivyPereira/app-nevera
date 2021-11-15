import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import {
  ApiProvider
} from "../../providers/api/api";
/**
 * Generated class for the PreOrdenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-orden',
  templateUrl: 'pre-orden.html',
})
export class PreOrdenPage {
  listPreOrden: any;
  listPreOrdenStatus: any;
  id: any;
  rol: any;
  isAdministrator: any;
  query: any;
  isEmployee: any;
  company:any;
  filter = {
    status: '',
    dateStar: '',
    dateFinal: '',
    dateEnd: '',
    company_id:''
  }
  pendiente:any;
  whitStatus : any
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {
    this.rol = navParams.get('rol');
    this.company = navParams.get('company');
    this.pendiente = navParams.get('pendiente');
    if(this.pendiente == "si"){
      this.whitStatus = "go"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreOrdenPage');
    this.getPreOrder();
  }

  getPreOrder() {
    let loading = this.loadingCtrl.create({
      content: 'Espere un momento...'
    });
    loading.present();
    if (this.rol == 'administrador' || this.rol == 'Planificador') {
      this.isAdministrator = true;
      this.query = 'preorden-administrador-jobs';
    }
    if (this.rol == 'Trabajador') {
      this.isEmployee = true;
      this.query = 'preorden-assigned-jobs';
    }
    if (this.rol == 'Cliente') {
      this.isEmployee = true;
      this.query = 'preorden-client-jobs'
      this.filter.company_id = this.company
      console.log(this.filter);
    }
    console.log(this.query);
    this.api.get(this.query + '?status=' + this.filter.status +
      '&dateStar=' + this.filter.dateStar +
      '&dateFinal=' + this.filter.dateFinal +
      '&dateEnd=' + this.filter.dateEnd +
      '&company_id=' + this.filter.company_id+
      '&withstatus=' +this.whitStatus)
      .subscribe(
        jwt => {
          if (jwt) {
            this.listPreOrden = jwt;
            if (this.isAdministrator) this.listPreOrden = this.listPreOrden.response
            if (this.isEmployee) this.listPreOrden = this.listPreOrden.response
            console.log(this.listPreOrden);
            loading.dismiss();
          } else {
            console.log("Error de Conexion");
          }
        },
        err => {
          console.log('No capto información de Pre Orden')
        });   

  }
/*
  showPreOrdenDetails(id) {
    this.navCtrl.push(PreOrdenDetailsPage, { id: id , rol:this.rol});;
  }

  showFilter() {
    let profileModal = this.modalCtrl.create(FilterModalPage);
    profileModal.onDidDismiss(data => {
      if (data) {
        this.filter.status = data.status;
        this.filter.dateStar = data.datetart;
        this.filter.dateFinal = data.dateFinal;
        this.filter.dateEnd = data.dateEnd;
        this.getPreOrder();
        console.log(data)
      }
    });
    profileModal.present();
  }
  */
    
  setStatus(status) {
    if (status == 1) return "Pendiente"; //amarillo
    if (status == 2) return "Aprobado";  //azul
    if (status == 3) return "En Curso";  //azul oscuro
    if (status == 4) return "Completado"; //verde
    if (status == 5) return "Vencido"; //gris
    if (status == 6) return "Pre-Aprobado"; //morado
    if (status == 7) return "Archivado";   //naranja
  }
}
