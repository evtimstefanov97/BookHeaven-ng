import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { Route, RouterModule } from "@angular/router";
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BookStartComponent } from './books/book-start/book-start.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Route[] = [
    {
        path: 'auth', children: [
            { path: 'signin', component: SignInComponent },
            { path: 'signup', component: SignUpComponent },
        ]
    },
    {
        path: 'books', children: [
            { path: '', pathMatch: 'full', component: BookStartComponent },
            { path: 'create', pathMatch: 'full', component: BookCreateComponent, canActivate: [AuthGuard] },
            //  { path: 'details/:id', pathMatch: 'full', component: BookDetailsComponent },
            //  { path: 'edit', pathMatch: 'full', component: BookEditComponent },
            { path: 'list', pathMatch: 'full', component: BookListComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: '', component: BookStartComponent
    }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }