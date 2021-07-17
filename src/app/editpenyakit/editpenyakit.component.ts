import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-editpenyakit',
  templateUrl: './editpenyakit.component.html',
  styleUrls: ['./editpenyakit.component.scss'],
})
export class EditpenyakitComponent implements OnInit {
  imagepath : any
  uri : any
  filename : string
  loaderToShow: any;

  imagefile : any
  imagefilefinal: Blob;

  nama_penyakit : any
  desc_penyakit : any
  desc_pengobatan : any
  id_penyakit : any

  foto_penyakit : any

  constructor(private sanitizer: DomSanitizer,public alertController: AlertController,private app : SendData,private activatedRoute: ActivatedRoute,public navCtrl: NavController,private nativeStorage: NativeStorage,private sqlite: SQLite) { }

  ngOnInit() {
    this.id_penyakit = this.app.detail_penyakit[0].id_penyakit;
    this.nama_penyakit = this.app.detail_penyakit[0].nama_penyakit;
    this.desc_penyakit = this.app.detail_penyakit[0].desc_penyakit;
    this.desc_pengobatan = this.app.detail_penyakit[0].desc_pengobatan;
    this.foto_penyakit = this.app.detail_penyakit[0].foto_penyakit;
    this.imagepath = this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+this.foto_penyakit);
    this.foto_penyakit = "";
  }

  async camerasimplified(){
    const { Camera, Filesystem } = Plugins;

    const options = {
      resultType: CameraResultType.Uri
    };

    const originalPhoto = await Camera.getPhoto(options);
    const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path });

    await Filesystem.readFile({ path: originalPhoto.path })
    .then((e) => {
      this.imagefile = e.data
      this.foto_penyakit = e.data
    });

    let date = new Date(),
      time = date.getTime(),
      fileName = time + ".jpeg";

    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: FilesystemDirectory.Data
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: fileName
    });

    this.filename = fileName
    this.imagepath = Capacitor.convertFileSrc(finalPhotoUri.uri);
    console.log(this.imagefile);
    this.imagefilefinal = this.b64toBlob(this.imagefile)
    //do stuff here to give the blob some data...
    console.log(this.imagefilefinal)
                    
  }

  b64toBlob(b64Data, contentType='', sliceSize=512){
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
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  dismiss() {
    this.navCtrl.back();
  }

  // edit_penyakit(){
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('UPDATE penyakit SET nama_penyakit = ?,foto_penyakit = ?,desc_penyakit = ?,desc_pengobatan = ? WHERE id_penyakit = ?', [this.nama_penyakit,this.foto_penyakit,this.desc_penyakit,this.desc_pengobatan,this.id_penyakit])
  //         .then(e => {this.presentAlert("Sukses Edit Penyakit");this.navCtrl.navigateRoot('folder/Home')})
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  edit_penyakit(){
    if(this.foto_penyakit == ""){
      this.app.update_penyakit2(this.id_penyakit,this.nama_penyakit,this.desc_penyakit,this.desc_pengobatan).subscribe(
        data => {
          console.log(data)
          this.presentAlert("Sukses Edit Penyakit");this.navCtrl.navigateRoot('folder/Home')
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
    }else{
      this.app.update_penyakit(this.id_penyakit,this.nama_penyakit,this.foto_penyakit,this.desc_penyakit,this.desc_pengobatan).subscribe(
        data => {
          console.log(data)
          this.presentAlert("Sukses Edit Penyakit");this.navCtrl.navigateRoot('folder/Home')
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
