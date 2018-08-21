import { BookModel } from '../models/BookModel';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Observable<BookModel[]>
  shouldBooksBlurr: boolean = false;

  constructor(private booksServce: BooksService) { }

  ngOnInit() {
    this.books = this.booksServce.getAllBooks();
  }
  blurrBooks(event: boolean) {
    if (event) {
      this.shouldBooksBlurr = true;
    } else {
      this.shouldBooksBlurr = false;
    }
  }
}
