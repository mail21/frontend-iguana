import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [];
  status: any;
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private nativeStorage: NativeStorage) {
    console.log('asdasd');
    this.status = 'user';

    // this.nativeStorage.getItem('login_data')
    // .then(
    //   data => {
    //     this.status = data.level
    //   },
    //   error => console.error(error)
    // );

    // this.appPages = [
    //   { title: 'Home', url: '/folder/Home', icon: 'home' },
    //   { title: 'Daftar Penyakit', url: '/folder/Daftar Penyakit', icon: 'book' },
    //   { title: 'Daftar Gejala', url: '/folder/Daftar Gejala', icon: 'book' },
    //   { title: 'Kuesioner Gejala', url: '/folder/Kuesioner Gejala', icon: 'list-circle' },
    //   { title: 'About', url: '/folder/About', icon: 'help' },
    //   { title: 'Log Out', url: '/login', icon: 'log-out' },
    //   // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    //   // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    // ];

    this.appPages = [
      { title: 'Home', url: '/folder/Home', icon: 'home' },
      //{ title: 'Kuesioner Gejala', url: '/folder/Kuesioner Gejala', icon: 'list-circle' },
      { title: 'About', url: '/folder/About', icon: 'help' },
      { title: 'Bantuan', url: '/folder/Bantuan', icon: 'help' },
      { title: 'Log Out', url: '/start_page', icon: 'log-out' },
      // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
      // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    ];
  }
}
