import { MyProductComponent } from './my-product/my-product.component';
import { AddressComponent } from './address/address.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { CategoryComponent } from './category/category.component';
import { PostProductComponent } from './post-product/post-product.component';

// will be refactored, relaxxx
const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'categories', component: CategoryComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/setting', component: SettingComponent, canActivate: [AuthGuard]},
  { path: 'profile/address', component: AddressComponent, canActivate: [AuthGuard]},
  { path: 'profile/post-product', component: PostProductComponent, canActivate: [AuthGuard] },
  { path: 'profile/my-product', component: MyProductComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
