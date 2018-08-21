import { map } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { ToastrService } from "ngx-toastr";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const adminUrl = 'https://book-heaven.firebaseio.com/userAdmins/';

@Injectable({
  providedIn: "root"
})

export class AuthService {
  token: string;
  admin: boolean = false;
  user: boolean = false;

  constructor(private toastr: ToastrService, private router: Router, private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    }
    if (localStorage.getItem('admin')) {
      this.admin = true
    }

  }

  signUp(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.toastr.success("Signed Up", "Success");
        this.router.navigate(["/auth/signin"]);
      })
      .catch(err => {
        this.toastr.error(err.message, "Warning");
      });
  }

  signIn(email: string, password: string) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then((value) => {
      debugger;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          firebase
            .auth()
            .currentUser.getIdToken()
            .then((token: string) => {
              this.token = token;
              this.router.navigate(["/books/list"])
            })
            .then(async () => {
              await this.isAdmin();
              localStorage.setItem('admin', 'true');
              this.toastr.success("Logged In", "Success");
            })
        })
        .catch(err => {
          this.toastr.error(err.message, "Warning");
        });
    })

  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.router.navigate(["/auth/signin"]);
        this.token = null;
        this.admin = false;
        this.user = false;
        localStorage.clear();
      });
  }

  getToken() {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((token: string) => {
          this.token = token;
        });
    } else {
      return undefined;
    }


    return this.token;
  }

  isAuthenticated() {
    let currentUser = !!firebase.auth().currentUser;

    return this.token != null || currentUser
  }
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = true;
        } else {
          this.user = false;
        }
        resolve(user);
      }, reject);
    });
  }
  async isAdmin() {
    await this.http.get(`${adminUrl}.json`)
      .pipe(map((res: Response) => {
        const id = Object.keys(res);
        if (firebase.auth().currentUser.uid == id[0] && res[id[0]].admin) {
          return true;
        } else {
          return false
        }
      })).subscribe(result => {
        this.admin = result;
      })

  }

}
