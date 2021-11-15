import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    AlertController,
    LoadingController,
    ModalController,
    ActionSheetController,
    ToastController
} from 'ionic-angular';
import {
    ApiProvider
} from "../../providers/api/api";
import * as moment from 'moment';
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { elementAt } from 'rxjs/operator/elementAt';
import { Camera, CameraOptions } from "@ionic-native/camera";
import {
    FileTransfer,
    FileUploadOptions,
    FileTransferObject
} from "@ionic-native/file-transfer";
import { empty } from 'rxjs/Observer';
@IonicPage()
@Component({
    selector: 'page-add-order',
    templateUrl: 'add-order.html',
})
export class AddOrderPage {
    observaciones: any;
    addOrder = {
        type: "",
        client: "",
        clientData: "",
        point: "",
        taks: [],
        incidents: [],
        products: [],
        productsDelete: [],
        dateStar: "",
        dateEnd: "",
        company_id: "",
        observations: "",
        horaEntrada: "",
        horaSalida: ""
    };
    extraAdd = {
        id_pre_order: "",
        fecha: ""
    };
    contadorProductDelete = 0;
    pre_order_id: any;
    response: any;
    person: any;
    clientData: any;
    positionClient: any;
    listClients: any;
    isenabled: boolean = false;
    query: any;
    company_id: any;
    listTasks: any;
    productsNow: any;
    imageURI: any;
    imagenes: any = [];
    srcImage: boolean = true;
    horaEntrada: any;
    horaSalida: any;
    listPreordenWithId: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingController: LoadingController,
        public api: ApiProvider, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, private Camera: Camera, private toastCtrl: ToastController,
        private transfer: FileTransfer) {
        this.addOrder.dateStar = moment().format();
        this.pre_order_id = navParams.get('pre_order_id');
        this.company_id = navParams.get('company_id');
        console.log(this.pre_order_id);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddOrderPage');
        if (this.pre_order_id)
            this.getListPreorderWhitId();
        this.getClients();
        this.getTaks();
        this.getProdcts();
        this.horaEntrada = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    }

    /** Tareas asiganadas por el planificador **/
    getTaks() {
        this.query = "getTaskPreorder?id=" + this.pre_order_id;
        console.log(this.query);
        this.api.get(this.query)
            .subscribe(
                jwt => {
                    if (jwt) {
                        this.listTasks = jwt;
                        this.listTasks = this.listTasks.data;
                        console.log(this.listTasks)
                    } else {
                        console.log("Error de Conexion");
                    }
                },
                err => {
                    console.log('No capto información cliente')
                });
    }

    getListPreorderWhitId() {
        this.query = "preorden/" + this.pre_order_id;
        this.api.get(this.query)
            .subscribe(
                jwt => {
                    if (jwt) {
                        this.listPreordenWithId = jwt;
                        this.listPreordenWithId = this.listPreordenWithId.data;
                        console.log(this.listPreordenWithId)
                    } else {
                        console.log("Error de Conexion");
                    }
                },
                err => {
                    console.log('No capto información cliente')
                });
    }

    /** materiales asiganadas por el planificador **/
    getProdcts() {
        this.query = "getProducts?id=" + this.pre_order_id;
        console.log(this.query);
        this.api.get(this.query)
            .subscribe(
                jwt => {
                    if (jwt) {
                        this.productsNow = jwt;
                        this.productsNow = this.productsNow.data;
                        console.log(this.productsNow)
                    } else {
                        console.log("Error de Conexion");
                    }
                },
                err => {
                    console.log('No capto información cliente')
                });
    }

    /** Cliente **/
    getClients() {
        if (this.pre_order_id)
            this.query = "find-only-one-company?id=" + this.company_id;

        else
            this.query = "company";
        console.log(this.query);
        this.api.get(this.query)
            .subscribe(
                jwt => {
                    if (jwt) {
                        this.listClients = jwt;
                        this.listClients = this.listClients.data.items
                        console.log(this.listClients)
                    } else {
                        console.log("Error de Conexion");
                    }
                },
                err => {
                    console.log('No capto información cliente')
                });
    }

    /** Empresas **/
    getCompany() {
        this.api.get('listclients')
            .subscribe(
                jwt => {
                    if (jwt) {
                        this.listClients = jwt;
                        this.listClients = this.listClients.data
                        console.log(this.listClients)
                    } else {
                        console.log("Error de Conexion");
                    }
                },
                err => {
                    console.log('No capto información cliente')
                });
    }


    showClient() {
        let alert = this.alertCtrl.create();
        alert.setTitle("Seleccione el cliente");
        this.listClients.forEach(function (element, i) {
            alert.addInput({
                type: "radio",
                label: element.name,
                value: i
            });
        });
        alert.addButton("Cerrar");
        alert.addButton({
            text: "Seleccionar",
            handler: data => {
                console.log("Position:", data);
                this.positionClient = data;
                console.log(this.listClients[this.positionClient].id)
                console.log(this.listClients[this.positionClient].name)
                console.log(this.listClients[this.positionClient].point)
                this.addOrder.client = this.listClients[this.positionClient].name;
                this.addOrder.company_id = this.listClients[this.positionClient].id;
                console.log(this.addOrder);
            }
        });
        alert.present();

    }

    searchClient() {
        console.log(this.listClients[this.addOrder.client])
        const prompt = this.alertCtrl.create({
            title: "Identificador de " + this.listClients[this.positionClient].name,
            message: "Escribe el Identificador de " + this.listClients[this.positionClient].point,
            inputs: [{
                name: "code",
                placeholder: ""
            }],
            buttons: [{
                text: "Cerrar",
                handler: data => {
                    console.log("Cancel clicked");
                }
            },
            {
                text: "Buscar",
                handler: data => {
                    console.log(data.code);
                    this.searchPoint(data.code);
                }
            }
            ]
        });
        prompt.present();
    }

    searchPoint(code) {
        this.addOrder.horaEntrada = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        let loading = this.loadingController.create({
            content: "Cargando..."
        });
        loading.present();
        this.api
            .get(
                "client-point?point=" +
                code +
                "&client=" +
                this.listClients[this.positionClient].name +
                "&clientId=" +
                this.listClients[this.positionClient].id
            )
            .subscribe(
                jwt => {
                    loading.dismiss();
                    if (jwt) {
                        this.clientData = jwt;
                        if (this.clientData.status == false) {
                            let alert = this.alertCtrl.create({
                                subTitle: "Este identificador de " + this.listClients[this.positionClient].name + " no se encuentra registrado, verifique y vuelva a escribirlo.",
                                buttons: ["Verificar"]
                            });
                            alert.present();
                        } else {
                            this.clientData = this.clientData.data;
                            let alert = this.alertCtrl.create({
                                title: "Confirmación de Identificador de " + this.listClients[this.positionClient].name,
                                message: "<p> El Identificador seleccionado corresponde al </p>" +
                                    "<p>" +
                                    this.clientData.name +
                                    "</p>" +
                                    "<p> Identificador: " +
                                    code +
                                    "</p>" +
                                    "<p> Tipo: " +
                                    this.clientData.type +
                                    "</p>" +
                                    "<ul>" +
                                    "<li>" +
                                    this.clientData.district +
                                    "</li>" +
                                    "<li>" +
                                    this.clientData.province +
                                    "</li>" +
                                    "<li>" +
                                    this.clientData.department +
                                    "</li>" +
                                    "</ul>",
                                buttons: [{
                                    text: "No",
                                    role: "cancel",
                                    handler: () => {
                                        console.log('Close')
                                    }
                                },
                                {
                                    text: "Si",
                                    handler: () => {
                                        this.addOrder.point = code;
                                    }
                                }
                                ]
                            });
                            alert.present();
                        }
                    } else {
                        console.log("Error de Conexion");
                    }
                },
                err => {
                    loading.dismiss();
                    console.log(err);
                }
            );
    }

    /** Fin de Cliente **/

   
    removeProducts(index) {
        this.addOrder.products.splice(index, 1);
    }
    removeProductsNow(index) {
        this.addOrder.productsDelete[this.contadorProductDelete] = this.productsNow[index];
        this.contadorProductDelete++;
        this.productsNow.splice(index, 1);
    }
    /** Fin Incidents Modal **/

    showType() {
        let prompt = this.alertCtrl.create({
            title: "Tipo de trabajo a realizar",
            inputs: [{
                type: "radio",
                label: "Instalación",
                value: "Instalación"
            },
            {
                type: "radio",
                label: "Mantenimiento",
                value: "Mantenimiento"
            },
            {
                type: "radio",
                label: "Retiro",
                value: "Retiro"
            },
            {
                type: "radio",
                label: "Levantar Información",
                value: "Levantar Información"
            }
            ],
            buttons: [{
                text: "Cancelar",
                handler: data => {
                    console.log("cancel clicked");
                }
            },
            {
                text: "Seleccionar",
                handler: data => {
                    console.log("radio  data:", data);
                    this.addOrder.type = data;
                }
            }
            ]
        });
        prompt.present();
    }
    showImg(title, mapUrl) {
        if (!mapUrl) {
            mapUrl = 'https://www.fml.com.mx/wp-content/uploads/2016/04/Race-Registration-Image-Not-Found.png';
        }
        const alert = this.alertCtrl.create({
            title: title,
            message: `<img src="${mapUrl}" alt="g-maps" style="border-radius: 2px">`,
            buttons: ['Cerrar']
        });
        alert.present();
    }
    /** Guardar **/
    confirmation() {

        this.addOrder.dateEnd = moment().format();
        console.log(this.addOrder)
        console.log(this.clientData)
        this.save()
        /*
        const prompt = this.alertCtrl.create({
            title: "Confirmación",
            message: "Escribe el Identificador de " + this.listClients[this.positionClient].point,
            inputs: [{
                name: "code",
                placeholder: ""
            }],
            buttons: [{
                    text: "Cerrar",
                    handler: data => {
                        console.log("Cancel clicked");
                    }
                },
                {
                    text: "Buscar",
                    handler: data => {
                       save()
                    }
                }
            ]
        });
        prompt.present();	
        */
    }
    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Punto no identificado',
            subTitle: 'Para continuar debe indicar el punto',
            buttons: ['Cerrar']
        });
        alert.present();
    }
    save() {

        if (this.pre_order_id) {
            this.addOrder.client = this.listPreordenWithId.company.name
            this.addOrder.company_id = this.listPreordenWithId.company_id
            this.addOrder.horaEntrada = this.horaEntrada
            this.addOrder.point = this.listPreordenWithId.point
        }
        if (this.addOrder.point === "")
            this.presentAlert();
        else {
            this.addOrder.horaSalida = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
            this.extraAdd.fecha = moment().format();
            if (this.pre_order_id) this.extraAdd.id_pre_order = this.pre_order_id;
            else this.extraAdd.id_pre_order = "no";
            this.isenabled = false;
            let loading = this.loadingController.create({
                content: "Guardando..."
            });
            loading.present();
            alert(this.addOrder.observations);
            this.person = {
                order: this.addOrder,
                client: this.clientData,
                extra: this.extraAdd,
                task: this.listTasks,
                imagenes: this.imagenes
            };
            this.api.post("order", this.person).then(
                jwt => {
                    loading.dismiss();
                    if (jwt) {
                        this.response = jwt;
                        if (this.response.status) {
                            this.isenabled = true;
                            const alert = this.alertCtrl.create({
                                title: "Trabajo Guardado",
                                subTitle: "Verifica el historial para saber su estado.",
                                buttons: ["Ok"]
                            });
                            alert.present();
                            this.navCtrl.setRoot(TabsPage);
                        }
                    } else {
                        this.isenabled = true;
                        console.log("Error de Conexion");
                    }
                },
                err => {
                    loading.dismiss();
                }
            );
        }

    }


    /** Camara y Fotos */
    presentActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: "Abrir Libreria",
                    handler: () => {
                        this.getImage(0); // 0 == Library
                    }
                },
                {
                    text: "Camara",
                    handler: () => {
                        this.getImage(1); // 1 == Camera
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });
        actionSheet.present();
    }

    getImage(sourceType: number) {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.Camera.DestinationType.FILE_URI,
            sourceType
        };

        this.Camera.getPicture(options).then(
            imageData => {
                this.imageURI = imageData;
                this.uploadFile()
            },
            err => {
                let errores = JSON.parse(err.body);
                const toast = this.toastCtrl.create({
                    message: err.body,
                    duration: 8000
                });
                toast.present();
                console.log(err);
                console.log(err);
            }
        );
    }

    uploadFile() {
        let loader = this.loadingController.create({
            content: "Cargando..."
        });
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'file.jpg',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        }
        fileTransfer
            .upload(this.imageURI, "https://agentedev.artsignsoluciones.com/multimedia", options)
            .then(
                data => {
                    // let info = data
                    let info = JSON.parse(data.response);
                    this.addFieldValue(info)
                    loader.dismiss();
                    console.log("Imagen success");
                },
                err => {
                    loader.dismiss();
                    let errores = JSON.parse(err.body);
                    const toast = this.toastCtrl.create({
                        message: err.body,
                        duration: 8000
                    });
                    toast.present();
                    console.log("Imagen Failed");
                    console.log(err.body);
                    console.log(errores);
                }
            );
    }

    addFieldValue(data) {
        this.imagenes.push(data);
        this.srcImage = true;
        console.log(this.imagenes)
    }
    deleteFieldValue(index) {
        this.imagenes.splice(index, 1);
    }
    restart() {
        this.srcImage = false;
        this.presentActionSheet();
    }
}