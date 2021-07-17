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
  selector: 'app-login-page-user',
  templateUrl: './login-page-user.component.html',
  styleUrls: ['./login-page-user.component.scss'],
})
export class LoginPageUserComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private app: SendData,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    private sqlite: SQLite
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login() {
    // this.sqlite.create({
    //   name: 'penyakit.db',
    //   location: 'default'
    // })
    //   .then((db: SQLiteObject) => {
    //     db.executeSql('SELECT * FROM user WHERE username = ? AND password = ?', [this.username,this.password])
    //       .then(data => {
    //         if(data.rows.length !== 0){
    //           this.nativeStorage.setItem('login_data', {level: 'user'})
    //           this.navCtrl.navigateRoot('folder/Home');
    //         }else{
    //           this.presentAlert("User Tidak Ditemukan")
    //         }
    //     })
    //       .catch(e => {this.presentAlert("User Tidak Ditemukan")});
    //   })
    //   .catch(e => {this.presentAlert("Login Gagal")});
    this.menuCtrl.enable(true);
    this.nativeStorage.setItem('login_data', { level: 'user' });
    this.navCtrl.navigateRoot('folder/Home');
  }

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
