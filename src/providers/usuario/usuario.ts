
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UsuarioProvider {

  usuario: Credenciales = {};

  constructor(private platform: Platform, private afAuth: AngularFireAuth) {

  }

  cargarUsuario(  nombre:string,
                  email: string,
                  imagen: string,
                  uid: string,
                  provider: string ) {


    this.usuario.nombre = nombre;
    this.usuario.email = email;
    this.usuario.imagen = imagen;
    this.usuario.uid = uid;
    this.usuario.provider = provider;

  }
  
}


export interface Credenciales {
  nombre?:string;
  email?:string;
  imagen?:string;
  uid?:string;
  provider?:string;
}
