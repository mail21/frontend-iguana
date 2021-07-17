import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';
import {  MenuController } from '@ionic/angular';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  username : string = ""
  password : string = ""
  password2 : string = ""

  constructor(public menuCtrl: MenuController,public alertController: AlertController,private app : SendData,private activatedRoute: ActivatedRoute,public navCtrl: NavController,private nativeStorage: NativeStorage,private sqlite: SQLite) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
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

  register(){
    if(this.password === this.password2){
      this.sqlite.create({
        name: 'penyakit.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO user (username,password) VALUES (?,?)', [this.username,this.password])
            .then(e => {this.presentAlert("Registrasi Berhasil")})
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }else{
      this.presentAlert("Password Tidak Cocok");
    }
  }

}
