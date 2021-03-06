import { Component, OnInit, AfterViewChecked } from "@angular/core";
import * as firebase from "firebase";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "book-heaven";
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyC9j2qtYfvOprrTuCvG06iLJguJUI64eOg",
      authDomain: "book-heaven.firebaseapp.com"
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.email);
      } else {
        console.log('No user');
      }
    })
  }
}
