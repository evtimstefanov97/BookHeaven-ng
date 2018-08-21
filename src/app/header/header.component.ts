import { AuthService } from '../auth/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  dropdownLiUser: string = "nav-item dropdown";
  dropdownLiAdmin: string = "nav-item dropdown";

  dropdownMenuUser: string = "dropdown-menu";
  dropdownMenuAdmin: string = "dropdown-menu";


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  expandUser(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.dropdownLiUser.endsWith('show')
      ? this.dropdownLiUser = "nav-item dropdown"
      : (this.dropdownLiUser = "nav-item dropdown show",
        this.dropdownLiAdmin = "nav-item dropdown",
        this.dropdownMenuAdmin = "dropdown-menu")

    this.dropdownMenuUser.endsWith('show')
      ? this.dropdownMenuUser = "dropdown-menu"
      : this.dropdownMenuUser = "dropdown-menu show";


  }

  expandAdmin(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.dropdownLiAdmin.endsWith('show')
      ? this.dropdownLiAdmin = "nav-item dropdown"
      : (this.dropdownLiAdmin = "nav-item dropdown show",
        this.dropdownLiUser = "nav-item dropdown",
        this.dropdownMenuUser = "dropdown-menu")

    this.dropdownMenuAdmin.endsWith('show')
      ? this.dropdownMenuAdmin = "dropdown-menu"
      : this.dropdownMenuAdmin = "dropdown-menu show";
  }
  closeAll() {
    this.dropdownLiAdmin = "nav-item dropdown";
    this.dropdownMenuAdmin = "dropdown-menu";
    this.dropdownLiUser = "nav-item dropdown";
    this.dropdownMenuUser = "dropdown-menu";
  }
  logout() {
    this.authService.logout();
  }

  getAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  getAdmin(): boolean {
    return this.authService.admin;
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.closeAll();
  }
}
