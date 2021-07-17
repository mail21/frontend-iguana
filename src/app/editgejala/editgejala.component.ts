import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';


@Component({
  selector: 'app-editgejala',
  templateUrl: './editgejala.component.html',
  styleUrls: ['./editgejala.component.scss'],
})
export class EditgejalaComponent implements OnInit {
  id_penyakit : any
  penyakit : any = []
  gejala : any
  kuesioner : any
  id_gejala : any

  constructor(public alertController: AlertController,private app : SendData,private activatedRoute: ActivatedRoute,public navCtrl: NavController,private nativeStorage: NativeStorage,private sqlite: SQLite) { }

  ngOnInit() {
    this.id_penyakit = this.app.detail_gejala[0].id_penyakit;
    this.penyakit = this.app.detail_gejala[0].nama_penyakit;
    this.gejala = this.app.detail_gejala[0].desc_gejala;
    this.kuesioner = this.app.detail_gejala[0].desc_kuesioner;
    this.id_gejala = this.app.detail_gejala[0].id_gejala;
  }

  dismiss() {
    this.navCtrl.back();
  }

  // edit_gejala(){
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('UPDATE gejala SET desc_gejala = ?,desc_kuesioner = ? WHERE id_gejala = ?', [this.gejala,this.kuesioner,this.id_gejala])
  //         .then(e => {this.presentAlert("Sukses Edit Gejala");this.navCtrl.navigateRoot('folder/Home')})
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  edit_gejala(){
    this.app.update_gejala(this.id_gejala,this.gejala,this.kuesioner).subscribe(
      data => {
        console.log(data)
        this.presentAlert("Sukses Edit Gejala");this.navCtrl.navigateRoot('folder/Home')
        // for (let i = 0; i < data.length; i++) {
        //   let item = data[i];
        //   console.log(item);
        //   // do something with it
        // }
      },
      error => {
        console.log(error);
      }
    );
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


}
