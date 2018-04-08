import { Category1Component } from './category1/category1.component';
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
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';

// will be refactored, relaxxx
// if you want to implement Lazy loading for opt then go ahead create features modules then add lazy children
const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full'},
  { path: 'categories', component: CategoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'categories/:id', component: Category1Component },
  { path: 'product/:id', component: ProductComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
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
