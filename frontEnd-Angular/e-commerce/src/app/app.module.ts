import { AuthGuard } from './services/auth.guard';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { JApiService } from './services/j-api.service';
import { MessageComponent } from './message/message.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { AddressComponent } from './address/address.component';
import { CategoryComponent } from './category/category.component';
import { PostProductComponent } from './post-product/post-product.component';
import { MyProductComponent } from './my-product/my-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SettingComponent,
    AddressComponent,
    CategoryComponent,
    PostProductComponent,
    MyProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ JApiService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
