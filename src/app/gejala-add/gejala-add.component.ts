import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { SendData } from '../SendData';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-gejala-add',
  templateUrl: './gejala-add.component.html',
  styleUrls: ['./gejala-add.component.scss'],
})
export class GejalaAddComponent implements OnInit {
  id_penyakit : any
  penyakit : any = []
  gejala : any
  kuesioner : any

  constructor(public alertController: AlertController,private sqlite: SQLite,public navCtrl: NavController,private app : SendData) { }

  ngOnInit() {
    this.getpenyakit();
  }

  dismiss() {
    this.navCtrl.back();
  }

  // insert_gejala(){
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('INSERT INTO gejala (id_penyakit,desc_gejala,desc_kuesioner) VALUES (?,?,?)', [this.id_penyakit,this.gejala,this.kuesioner])
  //         .then(e => {this.presentAlert("Sukses Tambah Data");this.navCtrl.navigateRoot('folder/Home')})
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  insert_gejala(){
    this.app.create_gejala(this.id_penyakit,this.gejala,this.kuesioner).subscribe(
      (data : any = []) => {
        this.presentAlert("Sukses Tambah Data");this.navCtrl.navigateRoot('folder/Home')
      },
      error => {
        console.log(error);
      }
    );
  }

  // getpenyakit(){
  //   this.app.penyakit = [];
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('SELECT nama_penyakit,id_penyakit FROM penyakit', [])
  //         .then((data) => {
  //           for (let i = 0; i < data.rows.length; i++) {
  //             console.log(data);
  //             let item = data.rows.item(i);
  //             // do something with it
  //             this.penyakit.push(item);
  //             this.app.penyakit.push(item);
  //           }
  //         })
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  getpenyakit(){
    this.app.get_penyakit().subscribe(
      (data : any = []) => {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
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
