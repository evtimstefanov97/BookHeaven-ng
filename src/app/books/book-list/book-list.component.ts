import { animateChild, keyframes, stagger, useAnimation } from '@angular/animations';
import { animate, animation, query, style, transition, trigger } from '@angular/animations';
import { BookModel } from '../models/BookModel';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../books.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter',
        [style({ opacity: 0 }), animate('0.9s ease')]
      )
    ]),
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('0.5s', [animateChild()]), { optional: true })
      ])
    ])
  ]
})
export class BookListComponent implements OnInit {
  books: Observable<BookModel[]>
  viewPortItems = new Array<any>();
  rows: number;
  length: number;
  shouldBooksBlurr: boolean = false;
  booksLoaded: boolean = false;
  showLoading: boolean = true;
  contentPrinted: boolean = false;

  constructor(private booksServce: BooksService) {

  }



  async ngOnInit() {
    this.books = await this.booksServce.getAllBooks();
    this.books.subscribe(data => {
      this.rows = Math.ceil(data.length);
      this.length = data.length;
    })
  }
  tbFn(index, item) {
    return item.id;
  }
  onContentPrinted() {
    this.contentPrinted = true;
    this.showLoading = false;
  }
  blurrBooks(event: boolean) {
    if (event) {
      this.shouldBooksBlurr = true;
    } else {
      this.shouldBooksBlurr = false;
    }
  }
}
