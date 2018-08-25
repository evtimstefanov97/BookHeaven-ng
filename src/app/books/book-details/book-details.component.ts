import { AuthService } from './../../auth/auth.service';
import { UserPayload } from './../../auth/models/UserPayload';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from '../models/BookModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  bindingModel: BookModel;
  id: string;
  genres$: Observable<string[]>;
  userSubscription: Subscription = new Subscription();
  bookSubscription: Subscription = new Subscription();

  constructor(
    private bookService: BooksService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.bindingModel = new BookModel("", "", "", "", "", "", "", new Date());
  }


  async  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.genres$ = await this.bookService.getAllGenres();
    this.bookSubscription = this.bookService.getById(this.id)
      .subscribe((data) => {
        this.bindingModel = data;
      })
  }
  isCreator(): boolean {
    let currentUser = firebase.auth().currentUser
    if (currentUser) {
      return this.bindingModel.CreatorId == currentUser.uid;

    }
    return false;
  }
  isAdmin(): boolean {
    return this.auth.admin;
  }
  delete() {
    this.userSubscription = this.auth.getUserById(firebase.auth().currentUser.uid)
      .pipe(
        switchMap((user: UserPayload) => {
          let userUpdate = this.auth.updateUserBooksCreated(user.UserFireBaseObjectId,
            {
              ...user.userData,
              BooksCreated: user.userData.BooksCreated - 1
            }
          )
          let bookCreate = this.bookService.createBook(
            this.bindingModel)

          return forkJoin(userUpdate, bookCreate);
        }
        ),
      )
      .subscribe(() => {
        this.toastr.success('Book delted!', 'Success!');
        this.router.navigate(['/books/list']);
      })
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }

}
