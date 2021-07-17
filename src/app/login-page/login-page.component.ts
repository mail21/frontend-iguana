import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  username : string = ""
  password : string = ""

  constructor(private alertController: AlertController,public menuCtrl: MenuController,public navCtrl: NavController,private nativeStorage: NativeStorage) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login(){
    if(this.username == "root" && this.password == "root"){
      this.menuCtrl.enable(true);
      this.nativeStorage.setItem('login_data', {level: 'admin'})
      this.navCtrl.navigateRoot('folder/Home');
    }else{
      this.presentAlert("Password / Username Salah");
    }
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
