import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../books.service';
import { BookModel } from '../models/BookModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bindingModel: BookModel;
  id: string;

  constructor(
    private bookService: BooksService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bindingModel = new BookModel("", "", "", "", "");
  }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.bookService.getById(this.id)
      .subscribe((data) => {
        this.bindingModel = data;
      })
  }
  edit() {
    const body = {
      [this.id]: this.bindingModel
    }

    this.bookService.editBook(body)
      .subscribe((data) => {
        this.toastr.success('Book edited!', 'Success!');
        this.router.navigate(['/books/list']);
      })
  }

}
