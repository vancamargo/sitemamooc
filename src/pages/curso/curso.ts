import {Component} from '@angular/core';
import {
  AlertController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
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

  public cursos = [];
  public cursosFilter = [];

  constructor(public navCtrl: NavController,
              public cursoService: CursoService,
              public alertCrl: AlertController,
              public toastCrl: ToastController,
              public navParams: NavParams) {



  }

  showMessage(msg) {
    this.toastCrl.create({
      message: msg,
      duration: 4000
    }).present();
  }

  list() {
    this.cursoService.list().subscribe(dados => {
      this.cursos = dados;
      this.cursosFilter = dados;
    })
  }

  ionViewDidLoad() { 
    this.list();
  }

  goToForm() {
    this.navCtrl.push(CursoformPage);
  }

  goToEdit(curso) {
    this.navCtrl.push(CursoformPage, {curso: curso});
  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.cursosFilter = this.cursos.filter((item) => {

        return (item.nomecurso.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.cursosFilter = this.cursos;
    }
  }


  deleteCurso(curso, $event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    $event.stopPropagation();


    let prompt = this.alertCrl.create({
      title: 'Deletar',
      message: "Tem certeza que deseja deletar?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
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
