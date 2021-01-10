import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, ShortUrlService } from './core';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ShortUrlComponent } from './modules/short-url/short-url.component';
import { AdminComponent } from './modules/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShortUrlComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ShortUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
