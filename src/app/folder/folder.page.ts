import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  menus : any
  status : any

  gejala : any = []
  penyakit : any = []

  constructor(public menuCtrl: MenuController,public alertController: AlertController,private app : SendData,private activatedRoute: ActivatedRoute,public navCtrl: NavController,private nativeStorage: NativeStorage,private sqlite: SQLite) { }

  ngOnInit() {
    //this.test_api();
    this.menuCtrl.enable(true);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.folder == "Daftar Penyakit"){
      //this.createtablepenyakit();
      this.getpenyakit();
    }else if(this.folder == "Daftar Gejala"){
      //this.createtablegejala();
      this.getgejala();
    }
    this.nativeStorage.getItem('login_data')
    .then(
      data => {
        this.status = data.level
        this.app.status = data.level
      },
      error => console.error(error)
    );
  }

  test_api(){
    this.app.get_gejala().subscribe(
      data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          console.log(item);
          // do something with it
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }


  toMenu(menu){
    this.menus = 'folder/' + menu
    this.navCtrl.navigateForward(this.menus);
  }

  toMenu2(menu){
    this.navCtrl.navigateForward(menu);
  }

  addgejala(){
    this.navCtrl.navigateForward('gejala_add');
  }

  addpenyakit(){
    this.navCtrl.navigateForward('penyakit_add');
  }

  editpenyakit(id){
    this.app.edit_penyakit = id;
    this.getpenyakitbyidedit(id);
  }

  editgejala(id){
    this.app.edit_gejala = id;
    this.getgejalabyidedit(id);
  }

  deletepenyakit(id){
    this.delpenyakit(id);
  }

  deletegejala(id){
    this.delgejala(id);
  }

  async presentAlert(alerttext : string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'MyIguana',
      subHeader: '',
      message: alerttext,
      buttons: ['OK']
    });

    await alert.present();
  }

  getgejala(){
    this.app.get_gejala_join().subscribe(
      (data : any = []) => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          console.log(item);
          this.gejala.push(item);
          // do something with it
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getpenyakit(){
    this.app.get_penyakit().subscribe(
      data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          console.log(item);
          this.penyakit.push(item);
          this.app.penyakit.push(item);
          // do something with it
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delpenyakit(id){
    this.app.delete_penyakit(id).subscribe(
      data => {
        console.log(data)
        this.presentAlert("SUKSES DELETE");this.navCtrl.navigateRoot('folder/Home')
      },
      error => {
        console.log(error);
      }
    );
  }

  delgejala(id){
    this.app.delete_gejala(id).subscribe(
      data => {
        console.log(data)
        this.presentAlert("SUKSES DELETE");this.navCtrl.navigateRoot('folder/Home')
      },
      error => {
        console.log(error);
      }
    );
  }

  getpenyakitbyid(id){
    this.app.get_penyakit_by_id(id).subscribe(
      data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          console.log(item);
          this.app.detail_penyakit = [];
          this.app.detail_penyakit.push(item);
          this.app.get_gejala_join_by_id(id).subscribe(
            (data2 : any = []) => {
              console.log(data2)
              this.app.detail_gejalas = [];
              for (let i = 0; i < data2.length; i++) {
                let item2 = data2[i];
                console.log(item2);
                this.app.detail_gejalas.push(item2)
                // do something with it
              }
              this.navCtrl.navigateForward('detail_penyakit')
            },
            error => {
              console.log(error);
            }
          );
          // do something with it
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getpenyakitbyidedit(id){
    this.app.get_penyakit_by_id(id).subscribe(
      (data : any = []) => {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          this.app.detail_penyakit = [];
          this.app.detail_penyakit.push(item);
          this.navCtrl.navigateForward('edit_penyakit')
          // do something with it
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getgejalabyidedit(id){
    this.app.get_gejala_join_by_id2(id).subscribe(
      (data : any = []) => {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          this.app.detail_gejala = [];
          this.app.detail_gejala.push(item);
          this.navCtrl.navigateForward('edit_gejala')
          // do something with it
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  detail_penyakit(id){
    this.getpenyakitbyid(id)
  }

}
