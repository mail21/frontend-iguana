import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';
import { MenuController } from '@ionic/angular';
import {
  Capacitor,
  Plugins,
  CameraResultType,
  FilesystemDirectory,
} from '@capacitor/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  constructor(
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private app: SendData,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    private sqlite: SQLite
  ) {}

  ngOnInit() {
    // this.create_table_admin();
    // this.create_table_user();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login_user() {
    this.navCtrl.navigateForward('login_page_user');
  }

  login_admin() {
    this.navCtrl.navigateForward('login');
  }

  daftar_user() {
    this.navCtrl.navigateForward('register_user');
  }

  // create_table_user(){
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('create table if not exists user(id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(64),password TEXT,role VARCHAR(64))', [])
  //         .then(() => console.log('Executed SQL'))
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  // create_table_admin(){
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('create table if not exists admin(id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(64),password TEXT,role VARCHAR(64))', [])
  //         .then(() => console.log('Executed SQL'))
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));

  // }

  async presentAlert(alerttext: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'MyIguana',
      subHeader: '',
      message: alerttext,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
