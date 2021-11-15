import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, App, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginPage } from "../pages/login/login";
import { AuthProvider } from "../providers/auth/auth";
import { OneSignal } from "@ionic-native/onesignal";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { PresionPage } from "../pages/presion/presion";


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  roles: any;
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any, icon: string}>;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public app: App,
    public authProvider: AuthProvider,
    private oneSignal: OneSignal,
    public jwtHelper: JwtHelperService
  ) {
    this.initializeApp();
	authProvider.authUser.subscribe(jwt => {
      if (jwt && jwt !== null) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    authProvider.checkLogin();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
      if (this.platform.is("cordova")) {
       /* this.oneSignal.startInit(
          "06476789-b116-4b85-a34c-306654746af4",
          "321200270973"
        );
        this.oneSignal.inFocusDisplaying(
          this.oneSignal.OSInFocusDisplayOption.InAppAlert
        );
        this.oneSignal.handleNotificationReceived().subscribe(data => {
          console.log(JSON.stringify(data));
          // do something when notification is received
        });
        this.oneSignal.handleNotificationOpened().subscribe((data) => {
          // Abrio la aplicación por primera vez o tienes la pantalla abierta 
          // se muestra inFocusDisplay y luego este
          let dat = data;
          let seccion= dat.notification.payload.additionalData.seccion;
          let _id= dat.notification.payload.additionalData._id;
          switch (seccion){
            case "test":
              this.nav.push(TabsPage);
              break;
            case "declaration":
              this.nav.push(TabsPage);
              break;
          }
        });
        this.oneSignal.endInit();

        */
      }
    });
   /* this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
	  console.log(activeView)
      if (activeView.name === "HomePage") {
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          const alert = this.alertCtrl.create({
            title: "Cerrar la App",
            message: "¿Estás seguro?",
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  this.nav.setRoot("HomePage");
                  console.log("** Saída do App Cancelada! **");
                }
              },
              {
                text: "Cerrar el App",
                handler: () => {
                  this.logout();
                  this.platform.exitApp();
                }
              }
            ]
          });
          alert.present();
        }
      }
    });*/
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
	if(page.component == 'Logout'){
		 this.logout();
	}else{
		this.nav.setRoot(page.component);
	}
  }
  logout() {
    if (window.confirm("Seguro deseas salir del sistema?")) {
      this.authProvider.logout();
      //this.storage.remove("jwt_token");
    }
  }
}
