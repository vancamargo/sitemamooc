import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CursoService} from "./curso.service";

import {CursoformPage} from "../cursoform/cursoform";

/**
 * Generated class for the CursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-curso',
  templateUrl: 'curso.html',
})
export class CursoPage {

  cursos =[];

  constructor(public navCtrl: NavController,
              public cursoService: CursoService,
              public alertCrl: AlertController,
              public toastCrl: ToastController,
              public navParams: NavParams) {


  }

  showMessage(msg){
    this.toastCrl.create({
      message: msg,
      duration:4000
    }).present();
  }

  list(){
    this.cursoService.list().subscribe(dados => {
      this.cursos = dados;
    })
  }


  ionViewWillEnter() {
    this.list();

  }


  goToForm(){
    this.navCtrl.push(CursoformPage);
  }

  goToEdit(curso){
    this.navCtrl.push(CursoformPage,{curso: curso});
  }


  deleteCurso(curso, $event){
    $event.preventDefault();
    $event.stopImmediatePropagation();
    $event.stopPropagation();


    let prompt = this.alertCrl.create({
      title: 'Deletar',
      message: "Tem certeza que deseja deletar?",
      buttons:[
        {
          text: 'Cancel',
          handler: data =>{
            console.log('cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Delete clicked');

            this.cursoService.delete(curso).subscribe(dados => {
              this.list()
              this.showMessage("Curso deletado com Sucesso");

            })


          }
        }
      ]
    });
    prompt.present();




  }
}
