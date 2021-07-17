import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailPenyakitComponent } from './detail-penyakit/detail-penyakit.component';
import { EditgejalaComponent } from './editgejala/editgejala.component';
import { EditpenyakitComponent } from './editpenyakit/editpenyakit.component';
import { GejalaAddComponent } from './gejala-add/gejala-add.component';
import { KuesionerComponent } from './kuesioner/kuesioner.component';
import { LoginPageUserComponent } from './login-page-user/login-page-user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PenyakitAddComponent } from './penyakit-add/penyakit-add.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start_page',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'penyakit_add',
    component: PenyakitAddComponent
  },
  {
    path: 'gejala_add',
    component: GejalaAddComponent
  },
  {
    path: 'kuesioner',
    component: KuesionerComponent
  },
  {
    path: 'detail_penyakit',
    component: DetailPenyakitComponent
  },
  {
    path: 'edit_gejala',
    component: EditgejalaComponent
  },
  {
    path: 'edit_penyakit',
    component: EditpenyakitComponent
  },
  {
    path: 'start_page',
    component: StartPageComponent
  },
  {
    path: 'register_user',
    component: RegisterUserComponent
  },
  {
    path: 'login_page_user',
    component: LoginPageUserComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
