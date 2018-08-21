import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-start',
  templateUrl: './book-start.component.html',
  styleUrls: ['./book-start.component.css']
})
export class BookStartComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  getAuth() {
    return this.authService.isAuthenticated();
  }
}
