import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './Guards/auth.guard';
import { noAuthGuard } from './Guards/no-auth.guard';
 import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AllWishListComponent } from './components/all-wish-list/all-wish-list.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { BrandsDetailsComponent } from './components/brands-details/brands-details.component';
import { UserComponent } from './components/user/user.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},

   {path:'home',component:HomeComponent},
   {path:'cart',component:CartComponent},
  {path:'products',component:ProductsComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'product/category/:id',canActivate:[authGuard],component:CategoryProductComponent},
  {path:'brands',component:BrandsComponent},
  {path:'brands/:id',canActivate:[authGuard],component:BrandsDetailsComponent},
   {path:'shippingAddress/:id',canActivate:[authGuard],component:ShippingAddressComponent},
  {path:'allorders',canActivate:[authGuard],component:OrdersComponent},
  {path:'allWishList',canActivate:[authGuard],component:AllWishListComponent},

  {path:'login',canActivate:[noAuthGuard],component:LoginComponent},
  {path:'register',canActivate:[noAuthGuard],component:RegisterComponent},
  {path:'forget-password',canActivate:[noAuthGuard],component:ForgetPasswordComponent},
  {path:'verify-reset-code',canActivate:[noAuthGuard],component:VerifyResetCodeComponent},
  {path:'reset-password',canActivate:[noAuthGuard],component:ResetPasswordComponent},
  {path:'user',component:UserComponent},
  {path:'user-sidebar',component:UserSidebarComponent},


  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
