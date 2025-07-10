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
import { AdminComponent } from './components/AdminF/admin/admin.component';
import { adminGuard } from './Guards/admin.guard';
import { AdminSidebarComponent } from './components/AdminF/admin/admin-sidebar/admin-sidebar.component';
import { AddProductComponent } from './components/AdminF/admin/add-product/add-product.component';
import { UpdateProductComponent } from './components/AdminF/admin/update-product/update-product.component';
import { DeleteProductComponent } from './components/AdminF/admin/delete-product/delete-product.component';
import { AddressManagementComponent } from './components/address-management/address-management.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EmailVerificationSentComponent } from './components/email-verification-sent/email-verification-sent.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard, adminGuard],
  children: [
    { path: '', redirectTo: 'add-product', pathMatch: 'full' },
    { path: 'add-product', component: AddProductComponent },
    { path: 'update-product', component: UpdateProductComponent },
    { path: 'delete-product', component: DeleteProductComponent },
    { path: 'admin-sidebar', component: AdminSidebarComponent }
  ]
},
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products/category/:categoryId', component: ProductsComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'products/brand/:brandId', component: ProductsComponent },
  {
    path: 'shippingAddress/:id',
    canActivate: [authGuard],
    component: ShippingAddressComponent,
  },
  { path: 'allorders', canActivate: [authGuard], component: OrdersComponent },
  {
    path: 'allWishList',
    canActivate: [authGuard],
    component: AllWishListComponent,
  },

  { path: 'login', canActivate: [noAuthGuard], component: LoginComponent },
  {
    path: 'register',
    canActivate: [noAuthGuard],
    component: RegisterComponent,
  },
  {
    path: 'forget-password',
    canActivate: [noAuthGuard],
    component: ForgetPasswordComponent,
  },
  {
    path: 'verify-reset-code',
    canActivate: [noAuthGuard],
    component: VerifyResetCodeComponent,
  },
  {
    path: 'reset-password',
    canActivate: [noAuthGuard],
    component: ResetPasswordComponent,
  },
  { path: 'user', canActivate: [authGuard], component: UserComponent },
  { path: 'user/addresses', component: AddressManagementComponent },
  { path: 'user/changepassword', component: ChangePasswordComponent },
  {
    path: 'email-verification-sent',
    component: EmailVerificationSentComponent,
  },
  { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'user-sidebar',
    canActivate: [authGuard],
    component: UserSidebarComponent,
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
