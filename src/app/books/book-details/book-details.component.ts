import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from '../models/BookModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
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
  delete() {
    this.bookService.deleteBook(this.id)
      .subscribe((data) => {
        this.toastr.success('Book delted!', 'Success!');
        this.router.navigate(['/books/list']);
      })
  }

}
