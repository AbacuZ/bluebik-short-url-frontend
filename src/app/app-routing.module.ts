import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { ShortUrlComponent } from './modules/short-url/short-url.component';


const routes: Routes = [
  {
    path: '',
    component: ShortUrlComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
