import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ProductosProvider {

  pagina:number = 0;
  categoria:any = "";

  constructor(public http: HttpClient) {
    console.log('Hello ProductosProvider Provider');
  }

  obtenerTodos(){
    let url = URL_SERVICIOS + "/app/productos/todos/" + this.pagina;
  }

  obtenerCateg(){
    let url = URL_SERVICIOS + "/app/productos/" + this.categoria + "/" + this.pagina;
  }




}
