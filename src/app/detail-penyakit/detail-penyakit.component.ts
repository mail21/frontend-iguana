import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-penyakit',
  templateUrl: './detail-penyakit.component.html',
  styleUrls: ['./detail-penyakit.component.scss'],
})
export class DetailPenyakitComponent implements OnInit {
  judul_penyakit : any
  deskripsi_penyakit : any
  deskripsi_pengobatan : any
  foto_penyakit : any
  picImage : any
  gejala : any = []

  constructor(private sanitizer: DomSanitizer,public alertController: AlertController,private app : SendData,private activatedRoute: ActivatedRoute,public navCtrl: NavController,private nativeStorage: NativeStorage,private sqlite: SQLite) { }

  ngOnInit() {
    this.judul_penyakit = this.app.detail_penyakit[0].nama_penyakit;
    this.deskripsi_penyakit = this.app.detail_penyakit[0].desc_penyakit;
    this.deskripsi_pengobatan = this.app.detail_penyakit[0].desc_pengobatan;
    this.foto_penyakit = this.app.detail_penyakit[0].foto_penyakit;
    this.gejala = this.app.detail_gejalas;
    this.picImage = this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+this.foto_penyakit);
  }

  dismiss() {
    this.navCtrl.back();
  }

}
