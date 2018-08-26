import { BookEditSharedService } from './books/shared-service/book-edit-shared.service';
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { AuthModule } from "./auth/auth.module";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { BookStartComponent } from './books/book-start/book-start.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookPreviewComponent } from './books/book-preview/book-preview.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { BookEditComponent } from "./books/book-edit/book-edit.component";
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookStartComponent,
    BookListComponent,
    BookPreviewComponent,
    BookCreateComponent,
    BookEditComponent,
    BookDetailsComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    NgSelectModule,
    MatTableModule,
    MatPaginatorModule,
    VirtualScrollModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    BookEditSharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
