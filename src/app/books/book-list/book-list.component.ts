import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { BookModel } from '../models/BookModel';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BooksService } from '../books.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: BookModel[] = new Array<BookModel>();
  items = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10];
  viewPortItems = new Array<any>();
  rows: number;
  length: number;
  genres$: Observable<string[]>;
  bookSubscription: Subscription = new Subscription();
  booksLoaded: boolean = false;
  showLoading: boolean = true;
  contentPrinted: boolean = false;

  constructor(private booksService: BooksService, private changeDetector: ChangeDetectorRef) {

  }


  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
  async ngOnInit() {
    this.genres$ = await this.booksService.getAllGenres();
    this.bookSubscription = this.booksService.getAllBooks()
      .subscribe(result => {
        result.map((book: BookModel) => {
          this.books.push(book);
        })
        this.length = result.length;
        this.booksLoaded = true;
        this.showLoading = false;
        this.changeDetector.detectChanges();
      })
  }


  tbFn(index, item) {
    return item.id;
  }
  // blurrBooks(event: boolean) {
  //   if (event) {
  //     this.shouldBooksBlurr = true;
  //   } else {
  //     this.shouldBooksBlurr = false;
  //   }
  // }
  getByGenre(genre: string) {
    if (genre) {
      this.books = [];
      this.bookSubscription = this.booksService.getByGenre(genre).subscribe(data => {
        data.map((book: BookModel) => {
          this.books.push(book);
        })
        this.bookSubscription.unsubscribe();
      })
    } else {
      this.bookSubscription = this.booksService.getAllBooks()
        .subscribe(result => {
          result.map((book: BookModel) => {
            this.books.push(book);
          })
          this.changeDetector.detectChanges();
          this.bookSubscription.unsubscribe();
        })
    }

  }
  logAnimation(_event) {
    console.log(_event)
  }
}
