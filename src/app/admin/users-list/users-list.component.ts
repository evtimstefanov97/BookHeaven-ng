import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { IUser } from './../../auth/interfaces/IUser';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Observable<IUser[]>;
  usersSubscription: Subscription;
  displayedColumns: string[] = ['UserName', 'Email', 'Joined', 'BooksCreated'];

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.users = this.auth.getUsers()
  }

}
