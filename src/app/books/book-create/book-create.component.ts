import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { BookModel } from '../models/BookModel';
import { BooksService } from './../books.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  bindingModel: BookModel;

  constructor(
    private bookService: BooksService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.bindingModel = new BookModel("", "", "", "", "");
  }

  ngOnInit() {
  }

  create() {
    this.bookService.createBook(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Book created!', 'Success');
        this.router.navigate(['/books/list']);
      })
  }
}
