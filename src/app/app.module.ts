// Librerias Angular / Ionic
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { Diagnostic } from '@ionic-native/diagnostic';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { MyApp } from "./app.component";
// Paginas
import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { AjustesPage } from "../pages/ajustes/ajustes";
import { PerfilPage } from "../pages/perfil/perfil";
import { LoginPage } from "../pages/login/login";
import { CameraPage } from "../pages/camera/camera";
import { TemperaturePage } from "../pages/temperature/temperature";
import { Tp100Page } from "../pages/tp100/tp100";
import { PresionPage } from "../pages/presion/presion";

import { AddOrderPage } from "../pages/add-order/add-order";
import { MapsPage } from "../pages/maps/maps";
import { PreOrdenPage } from "../pages/pre-orden/pre-orden";
import { ConfigurationPage } from "../pages/configuration/configuration"








// Librerias Externas
import { ChartsModule } from "ng2-charts";
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { OneSignal } from '@ionic-native/onesignal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

// Proveedores
import { AuthProvider } from "../providers/auth/auth";
import { ApiProvider } from "../providers/api/api";
import { UrlProvider } from "../providers/url/url";
import { InterceptorProvider } from "../providers/interceptor";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get("jwt_token");
    }
  };
}


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage, // Home
    AjustesPage,
    PerfilPage,
    LoginPage,
   CameraPage,
    MapsPage,
    TemperaturePage,
    Tp100Page,
    PresionPage,
    ConfigurationPage
    //PreOrdenPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    HttpClientModule,
    IonicImageViewerModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage, // Home
    AjustesPage,
    PerfilPage,
    LoginPage,
    CameraPage,
    MapsPage,
    TemperaturePage,
    Tp100Page,
    PresionPage,
    ConfigurationPage
   // PreOrdenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    },
    AuthProvider,
    Geolocation,
    File,
    FileTransfer,
    FileTransferObject,
    Camera,
    BarcodeScanner,
    ApiProvider,
    UrlProvider,
    Diagnostic,
    OneSignal,
    FingerprintAIO
  ]
})
export class AppModule { }