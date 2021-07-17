import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormBuilder, FormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SendData } from './SendData';
import { PenyakitAddComponent } from './penyakit-add/penyakit-add.component';
import { GejalaAddComponent } from './gejala-add/gejala-add.component';
import { KuesionerComponent } from './kuesioner/kuesioner.component';
import { EditgejalaComponent } from './editgejala/editgejala.component';
import { EditpenyakitComponent } from './editpenyakit/editpenyakit.component';
import { DetailPenyakitComponent } from './detail-penyakit/detail-penyakit.component';
import { StartPageComponent } from './start-page/start-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginPageUserComponent } from './login-page-user/login-page-user.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [StartPageComponent,LoginPageUserComponent,RegisterUserComponent,DetailPenyakitComponent,AppComponent,LoginPageComponent,PenyakitAddComponent,GejalaAddComponent,KuesionerComponent,EditgejalaComponent,EditpenyakitComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },NativeStorage,SQLite,SendData,FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
