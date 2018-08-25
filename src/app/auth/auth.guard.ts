import { BookEditSharedService } from '../books/shared-service/book-edit-shared.service';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import * as firebase from 'firebase';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
    private sharedService: BookEditSharedService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.check() || this.editAccess()
  }

  check(): boolean {
    if (this.authService.isAuthenticated() || this.authService.admin || localStorage.getItem("token")) {
      return true;
    }


    this.router.navigate(["/auth/signin"]);
    return false;
  }
  editAccess(): boolean {
    let bookCreatorId = this.sharedService.BookCreatorId;
    if (bookCreatorId == firebase.auth().currentUser.uid) {
      return true
    } else {
      this.router.navigate(["/auth/noaccess"], {
        skipLocationChange: true
      })
      return false
    }
  }
}
