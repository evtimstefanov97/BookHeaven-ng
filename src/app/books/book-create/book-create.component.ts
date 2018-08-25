import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookModel } from '../models/BookModel';
import { BooksService } from './../books.service';
import * as firebase from 'firebase';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { IUser } from './../../auth/interfaces/IUser';
import { UserPayload } from './../../auth/models/UserPayload';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit, OnDestroy {
  genres$: Observable<string[]>;
  userSubscription: Subscription = new Subscription();
  bindingModel: BookModel;

  constructor(
    private bookService: BooksService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService
  ) {
    this.bindingModel = new BookModel("", "", "", "", "", "", "", new Date());
  }

  async ngOnInit() {
    this.genres$ = await this.bookService.getAllGenres();
  }

  create() {
    let currentUserId = firebase.auth().currentUser.uid;
    let currentUserName = firebase.auth().currentUser.email

    this.bindingModel.CreatorId = currentUserId;
    this.bindingModel.CreatorName = currentUserName;

    this.userSubscription = this.auth.getUserById(firebase.auth().currentUser.uid)
      .pipe(
        switchMap((user: UserPayload) => {
          let userUpdate = this.auth.updateUserBooksCreated(user.UserFireBaseObjectId,
            {
              ...user.userData,
              BooksCreated: user.userData.BooksCreated + 1
            }
          )
          let bookCreate = this.bookService.createBook(
            this.bindingModel)

          return forkJoin(userUpdate, bookCreate);
        }
        ),
      )
      .subscribe(() => {
        this.toastr.success('Book created!', 'Success');
        this.router.navigate(['/books/list']);
      })
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
