import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
    statusBar: StatusBar,
    splashScreen: SplashScreen, 
    private afAuth: AngularFireAuth, 
    public usuarioProv: UsuarioProvider){

    platform.ready().then(() => {
      
      this.afAuth.authState.subscribe( user => {

        statusBar.styleDefault();
        splashScreen.hide();

        if( user ){
          this.usuarioProv.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL+"?type=large",
            user.uid,
            user.providerData[0].providerId
          );
          this.rootPage = HomePage;
          console.log(user)
        } else {
          this.rootPage = LoginPage;
        }

      });

    });
  }

  cerrarSesion(){
    this.afAuth.auth.signOut().then( res => {
      this.usuarioProv.usuario = {};
      this.rootPage = LoginPage;
    });
  }
}

