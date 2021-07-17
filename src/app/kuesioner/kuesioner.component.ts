import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SendData } from '../SendData';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-kuesioner',
  templateUrl: './kuesioner.component.html',
  styleUrls: ['./kuesioner.component.scss'],
})
export class KuesionerComponent implements OnInit {
  gejala : any = []
  gejala_id : any 
  myForm: FormGroup;
  tampung_itung : any = []
  kuesioner : any = [
    {
      pertanyaan : 'TEST Kudis 1',
      penyakit : '2'
    },
    {
      pertanyaan : 'TEST Kudis 2',
      penyakit : '2'
    },
    {
      pertanyaan : 'TEST Kudis 3',
      penyakit : '2'
    }
  ];

  pertanyaan : any
  penyakit : any
  penyakits : any = []
  check : any

  iteration : any = 0;
  iterations : any = 0;

  stop : any = "no"

  constructor(private fb: FormBuilder,public alertController: AlertController,private app : SendData,private activatedRoute: ActivatedRoute,public navCtrl: NavController,private nativeStorage: NativeStorage,private sqlite: SQLite) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      listOptions: ['']
    })
    //this.createtablegejala();
    this.getpenyakit();
    console.log("GEJALA");
    console.log(this.gejala);
  }

  lanjut(){
    console.log(this.kuesioner.length)
    console.log(this.iteration)
      if(this.check == "ya"){
        this.myForm.controls.listOptions.reset();
        this.iterations++;
        console.log(this.iteration)
        this.check = "";
        if(this.iterations == this.gejala.length){
          this.getpenyakitbyidx(this.penyakits[this.iteration]);
        }else{
          this.pertanyaan = this.gejala[this.iterations].pertanyaan;
          this.penyakit = this.gejala[this.iterations].penyakit;
          this.gejala_id = this.gejala[this.iterations].gejala;
        }
        //this.couting_premise(this.penyakit,this.gejala_id);
      }else if(this.check == "tidak"){
        this.myForm.controls.listOptions.reset();
        this.iterations = 0;
        this.iteration++;
        if(this.iteration == this.penyakits.length){
          this.navCtrl.pop().then(() => {
            this.presentAlert("IGUANA ANDA SEHAT");
          });
        }else{
          this.getgejalabyid(this.penyakits[this.iteration]);
        }
        
        console.log(this.iteration)
        this.check = "";
        //this.couting_premise(this.penyakit,this.gejala_id);
      }
  }

  // getpenyakitbyidx(id){
  //   this.app.penyakit = [];
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('SELECT nama_penyakit,id_penyakit,foto_penyakit,desc_penyakit,desc_pengobatan FROM penyakit WHERE id_penyakit = ?', [id])
  //         .then((data) => {
  //           for (let i = 0; i < data.rows.length; i++) {
  //             console.log(data);
  //             let item = data.rows.item(i);
  //             // do something with it
  //             this.app.detail_penyakit = [];
  //             this.app.detail_penyakit.push(item);
  //             db.executeSql('SELECT a.desc_gejala,a.desc_kuesioner,b.nama_penyakit,a.id_gejala FROM gejala a JOIN penyakit b ON a.id_penyakit = b.id_penyakit WHERE a.id_penyakit = ?',[id]).then((data2) => {
  //               this.app.detail_gejalas = [];
  //               for (let i = 0; i < data2.rows.length; i++) {
  //                 let item2 = data2.rows.item(i);
  //                 this.app.detail_gejalas.push(item2)
  //               }
  //               this.presentAlert("Iguana Anda Terindikasi Terkena Penyakit "+ this.app.detail_penyakit[0].nama_penyakit);
  //             })
  //             // this.navCtrl.pop().then(() => {
  //             //   this.navCtrl.navigateForward('detail_penyakit',{animated : false});
  //             // });
  //           }
  //         })
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  getpenyakitbyidx(id){
    this.app.get_penyakit_by_id(id).subscribe(
      (data : any = []) => {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          this.app.detail_penyakit = [];
          this.app.detail_penyakit.push(item);
          // do something with it
          this.app.get_gejala_join_by_id(id).subscribe(
            (data2 : any = []) => {
              this.app.detail_gejalas = [];
              for (let i = 0; i < data2.length; i++) {
                let item2 = data2[i];
                this.app.detail_gejalas.push(item2)
                // do something with it
              }
              this.presentAlert2("Iguana Anda Terindikasi Terkena Penyakit "+ this.app.detail_penyakit[0].nama_penyakit);
            },
            error => {
              console.log(error);
            }
          );
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
      message: alerttext
    });

    await alert.present();
  }

  async presentAlert2(alerttext : string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'MyIguana',
      subHeader: '',
      message: alerttext,
      buttons: [{
        text: 'Lihat Detail Penyakit',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.navCtrl.navigateForward('detail_penyakit');
        }
      }]
    });

    await alert.present();
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.check = event.detail.value;
  }

  dismiss() {
    this.navCtrl.back();
  }

  // getgejala(){
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('SELECT a.id_gejala,a.id_penyakit,a.desc_gejala,a.desc_kuesioner,b.nama_penyakit FROM gejala a JOIN penyakit b ON a.id_penyakit = b.id_penyakit ORDER BY a.id_penyakit DESC', [])
  //         .then((data) => {
  //           for (let i = 0; i < data.rows.length; i++) {
  //             let item = data.rows.item(i);
  //             // do something with it
  //             this.gejala.push({
  //               pertanyaan : item.desc_kuesioner,
  //               penyakit : item.id_penyakit,
  //               gejala : item.id_gejala
  //             });
  //             if(i == 0){
  //               this.pertanyaan = item.desc_kuesioner;
  //               this.penyakit = item.id_penyakit;
  //             }
  //             // }else if(i == (data.rows.length - 1)){
  //             //   this.app.kuesioner_all = this.groupByKey(this.gejala, 'make');
  //             //   console.log(this.app.kuesioner_all);
  //             //   console.log("MAPPING --------- " + this.app.kuesioner_all);
  //             // }
  //           }
  //         })
  //         .catch(e => console.log(e));
  //     })
  //     .catch(e => console.log(e));
  // }

  getgejala(){
    this.app.get_kuesioner_order().subscribe(
      (data : any = []) => {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          this.gejala.push({
            pertanyaan : item.desc_kuesioner,
            penyakit : item.id_penyakit,
            gejala : item.id_gejala
          });
          if(i == 0){
            this.pertanyaan = item.desc_kuesioner;
            this.penyakit = item.id_penyakit;
          }
          // do something with it
        }
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
  //             this.penyakits.push(item.id_penyakit);
  //           }
  //           this.getgejalabyid(this.penyakits[this.iteration]);
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
          this.penyakits.push(item.id_penyakit);
          // do something with it
        }
        this.getgejalabyid(this.penyakits[this.iteration]);
      },
      error => {
        console.log(error);
      }
    );
  }

  createtablegejala(){
    this.sqlite.create({
      name: 'penyakit.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists gejala(id_gejala INTEGER PRIMARY KEY AUTOINCREMENT,id_penyakit INTEGER,desc_gejala TEXT,desc_kuesioner TEXT)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  couting_premise(id_penyakit,id_gejala){
    this.tampung_itung.push({
      id_penyakit : id_penyakit,
      id_gejala : id_gejala
    })
  }

  groupBy(list, keyGetter) {
    var i = 0
    console.log(list)
    console.log(keyGetter)
    
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         //const key2 = keyGetter2(item);

         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
             i = 0;
         } else if(i < 3){
             collection.push(item);
             i++;
         }
    });
    return map;
  }

  groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
  }
 
  // getgejalabyid(id){
  //   this.gejala = [];
  //   this.sqlite.create({
  //     name: 'penyakit.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql('SELECT a.desc_gejala,a.desc_kuesioner,b.nama_penyakit FROM gejala a JOIN penyakit b ON a.id_penyakit = b.id_penyakit WHERE a.id_penyakit = ?', [id])
  //         .then((data) => {
  //           for (let i = 0; i < data.rows.length; i++) {
  //             let item = data.rows.item(i);
  //             // do something with it
  //             this.gejala.push({
  //               pertanyaan : item.desc_kuesioner,
  //               penyakit : item.id_penyakit,
  //               gejala : item.id_gejala
  //             });
  //             if(i == 0){
  //               this.pertanyaan = item.desc_kuesioner;
  //               this.penyakit = item.id_penyakit;
  //             }
  //           }
  //         })
  //         .catch(e => {this.presentAlert("Iguana Anda Sehat")});
  //     })
  //     .catch(e => console.log(e));
  // }

  getgejalabyid(id){
    this.gejala = [];
    this.app.get_gejala_join_by_id(id).subscribe(
      (data : any = []) => {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          this.gejala.push({
            pertanyaan : item.desc_kuesioner,
            penyakit : item.id_penyakit,
            gejala : item.id_gejala
          });
          if(i == 0){
            this.pertanyaan = item.desc_kuesioner;
            this.penyakit = item.id_penyakit;
          }
          if(data.length == 0){
            this.presentAlert("Iguana Anda Sehat")
          }
          // do something with it
        }
      },
      error => {
        this.presentAlert("Iguana Anda Sehat")
      }
    );
  }


}
