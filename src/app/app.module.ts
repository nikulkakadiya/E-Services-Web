import { AuthInterceptorService } from './allServices/auth-interceptor.service';
import { PaginationComponent } from './pagination/pagination.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app.routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostService } from './allServices/post.service';
import { AdminService } from './admin/authentication/admin.service';
import { AdminInterceptorService } from './admin/authentication/admin-interceptor.service';
// import { CrudComponent } from './crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    // LoadingSpinnerComponent,
    PaginationComponent,
    // CrudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
