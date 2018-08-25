import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IUser } from '../../auth/interfaces/IUser';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Observable<IUser[]>;
  displayedColumns: string[] = ['UserName', 'Email', 'Joined', 'BooksCreated'];

  constructor(private auth: AuthService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.users = this.auth.getUsers()
  }

}
