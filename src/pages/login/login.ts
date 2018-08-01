// Componentes
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { Storage } from '@ionic/storage';

//Providers
import { UsuarioProvider } from '../../providers/usuario/usuario';

//Paginas
import { HomePage } from '../home/home';

//Plugins
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              private afAuth: AngularFireAuth,
              public usuarioProv: UsuarioProvider,
              private platform: Platform,
              private fb: Facebook,
              private googlePlus: GooglePlus,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController) {

    //this.menuCtrl.enable(false, "MainMenu");
  }

  signInGoogle() {

    let loader = this.loadingCtrl.create({
      content: "Iniciando sesión..."
    });


    loader.present().then( () => {

      this.googlePlus.login({
        'webClientId': '88022630668-n2pshtfh8ibjuetdqfq94ivf8h8nsb1u.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then( user => {
            this.usuarioProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              'google.com'
            );

            this.navCtrl.setRoot(HomePage);
          })
          .catch( error => console.log("Firebase failure: " + JSON.stringify(error)) );
        }).catch( err => console.error("Error: "+ JSON.stringify(err)) );

      loader.dismiss();
    });
  }

  signInWithFacebook() {

    if (this.platform.is('cordova')) {

      let loader = this.loadingCtrl.create({
        content: "Iniciando sesión..."
      });


      loader.present().then( () => {
        this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential).then( user => {

            console.log(res);

            this.usuarioProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL+"?type=large",
              user.uid,
              user.providerData[0].providerId
            );

            this.navCtrl.setRoot(HomePage);
          }).catch(e => console.log( 'Error con la autentificación. ' + JSON.stringify(e) ) );
        });

        loader.dismiss();
      })

    } else {
      let loader = this.loadingCtrl.create({
        content: "Iniciando sesión..."
      });

      loader.present().then( () => {
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {

          console.log(res);
          let user = res.user;

          this.usuarioProv.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL+"?type=large",
            user.uid,
            'facebook'
          );

          loader.dismiss();
          this.navCtrl.setRoot(HomePage);

        });
      });



    }
  }

}
