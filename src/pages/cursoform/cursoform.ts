import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {CursoService} from "../curso/curso.service";

/**
 * Generated class for the CursoformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cursoform',
  templateUrl: 'cursoform.html',
})
export class CursoformPage {
  curso: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCrl: ToastController,
              public cursoService: CursoService) {
    this.curso ={};
    let cursoParam = this.navParams.get("curso");

    if (cursoParam != null){
      this.curso = cursoParam;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CursoformPage');
  }
  showMessage(msg){
    this.toastCrl.create({
      message: msg,
      duration:4000
    }).present();
  }


  save(){
    if(this.curso.id){
      this.cursoService.update(this.curso).subscribe(item=>{
        this.navCtrl.pop();
        this.showMessage("Curso foi atualizado com sucesso")

      }, error =>{

        this.showMessage("Erro ao atualizar")
      } )

    }else{

      this.cursoService.save(this.curso).subscribe(item=>{
        this.navCtrl.pop();
        this.showMessage("Curso foi salvo com sucesso")

      }, error =>{

        this.showMessage("Erro ao salvar")

      } )

    }

  }





}
