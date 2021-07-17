import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import {
  Capacitor,
  Plugins,
  CameraResultType,
  FilesystemDirectory,
} from '@capacitor/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';

@Component({
  selector: 'app-penyakit-add',
  templateUrl: './penyakit-add.component.html',
  styleUrls: ['./penyakit-add.component.scss'],
})
export class PenyakitAddComponent implements OnInit {
  imagepath: string;
  uri: any;
  filename: string;
  loaderToShow: any;

  imagefile: any;
  imagefilefinal: Blob;

  nama_penyakit: any;
  desc_penyakit: any;
  desc_pengobatan: any;

  status: any;

  constructor(
    public app: SendData,
    public alertController: AlertController,
    public navCtrl: NavController,
    private sqlite: SQLite
  ) {}

  ngOnInit() {
    this.status = this.app.status;
  }

  dismiss() {
    this.navCtrl.back();
  }

  async camerasimplified() {
    const { Camera, Filesystem } = Plugins;

    const options = {
      resultType: CameraResultType.Uri,
    };

    const originalPhoto = await Camera.getPhoto(options);
    const photoInTempStorage = await Filesystem.readFile({
      path: originalPhoto.path,
    });

    await Filesystem.readFile({ path: originalPhoto.path }).then((e) => {
      this.imagefile = e.data;
    });

    let date = new Date(),
      time = date.getTime(),
      fileName = time + '.jpeg';

    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: FilesystemDirectory.Data,
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: fileName,
    });

    this.filename = fileName;
    this.imagepath = Capacitor.convertFileSrc(finalPhotoUri.uri);
    console.log(this.imagefile);
    console.log('haloo');
    this.imagefilefinal = this.b64toBlob(this.imagefile);
    //do stuff here to give the blob some data...
    console.log(this.imagefilefinal);
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  // insert_penyakit(){
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('INSERT INTO penyakit (nama_penyakit,foto_penyakit,desc_penyakit,desc_pengobatan) VALUES (?,?,?,?)', [this.nama_penyakit,this.imagefile,this.desc_penyakit,this.desc_pengobatan])
  //         .then(e => {this.presentAlert("Sukses Menambah Penyakit");this.navCtrl.navigateRoot('folder/Home')})
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  insert_penyakit() {
    this.app
      .create_penyakit(
        this.nama_penyakit,
        this.imagefile,
        this.desc_penyakit,
        this.desc_pengobatan
      )
      .subscribe(
        (data: any = []) => {
          this.presentAlert('Sukses Menambah Penyakit');
          this.navCtrl.navigateRoot('folder/Home');
        },
        (error) => {
          console.log(error);
        }
      );
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
