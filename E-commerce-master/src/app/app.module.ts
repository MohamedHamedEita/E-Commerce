import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressManagementComponent } from './components/address-management/address-management.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
//^ Template-driven forms **//
// import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
//^ owl-carousel
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeMainSliderComponent } from './components/home-main-slider/home-main-slider.component';
import { HomeCategoriesSliderComponent } from './components/home-categories-slider/home-categories-slider.component';

//^ Toaster
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddEGPPipe } from './pipes/add-egp.pipe';
import { TitleSlicePipe } from './pipes/title-slice.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { AllWishListComponent } from './components/all-wish-list/all-wish-list.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BrandsDetailsComponent } from './components/brands-details/brands-details.component';
import { CookieService } from 'ngx-cookie-service';
import { UserComponent } from './components/user/user.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { AdminComponent } from './components/AdminF/admin/admin.component';
import { AdminSidebarComponent } from './components/AdminF/admin/admin-sidebar/admin-sidebar.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { AddProductComponent } from './components/AdminF/admin/add-product/add-product.component';
import { UpdateProductComponent } from './components/AdminF/admin/update-product/update-product.component';
import { UsersComponent } from './components/AdminF/admin/users/users.component';
import { AdminProductsComponent } from './components/AdminF/admin/products/products.component';
import { AdminOrdersComponent } from './components/AdminF/admin/orders/orders.component';
import { AddCategoryComponent } from './components/AdminF/admin/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/AdminF/admin/update-category/update-category.component';
import { AdminCategoriesComponent } from './components/AdminF/admin/categories/categories.component';
import { AddBrandComponent } from './components/AdminF/admin/add-brand/add-brand.component';
import { UpdateBrandComponent } from './components/AdminF/admin/update-brand/update-brand.component';
import { AdminBrandsComponent } from './components/AdminF/admin/brands/brands.component';

@NgModule({
  declarations: [
    AddBrandComponent,
    UpdateBrandComponent,
    AdminBrandsComponent,
    AdminCategoriesComponent,
    AdminOrdersComponent,
    UsersComponent,
    AdminProductsComponent,
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    LoginComponent,
    NotfoundComponent,
    CategoriesComponent,
    RegisterComponent,
    ProductsComponent,
    BrandsComponent,
    ForgetPasswordComponent,
    VerifyResetCodeComponent,
    ResetPasswordComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeMainSliderComponent,
    HomeCategoriesSliderComponent,
    ShippingAddressComponent,
    OrdersComponent,
    AddEGPPipe,
    TitleSlicePipe,
    SearchPipe,
    AllWishListComponent,
    CategoryProductComponent,
    LoadingComponent,
    BrandsDetailsComponent,
    UserComponent,
    UserSidebarComponent,
    AdminComponent,
    AdminSidebarComponent,
    ProductFiltersComponent,
    AddressManagementComponent,
    ChangePasswordComponent,
    AddProductComponent,
    UpdateProductComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddBrandComponent,
    UpdateBrandComponent,
    AdminBrandsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //^ Template-driven forms **//
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CarouselModule,
    //^ Toaster
    // ToastrModule.forRoot({
    //   timeOut: 10000, // وقت عرض رسالة التوست
    //   positionClass: 'toast-top-right', // مكان عرض رسالة التوست
    //   preventDuplicates: true, // منع تكرار رسائل التوست
    //   closeButton: true, // عرض زر الإغلاق
    //   progressBar: true, // عرض شريط التقدم
    //   progressAnimation: 'increasing', // نوع حركة شريط التقدم
    //   messageClass: 'toast-message', // الفئة CSS لنص رسالة التوست

    //   tapToDismiss: true, // إغلاق رسالة التوست عند النقر عليها
    //   extendedTimeOut: 1000, // وقت الانتظار الإضافي بعد تمرير الماوس
    //   enableHtml: true, // تمكين عرض HTML
    //   titleClass: 'toast-title', // الفئة CSS لعنوان رسالة التوست
    //   easing: 'ease-in', // نوع التسهيل للرسوم المتحركة
    //   easeTime: 300, // وقت التسهيل للرسوم المتحركة
    //   onActivateTick: false, // تحديث عرض الرسوم المتحركة في الوقت المناسب
    // }),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
