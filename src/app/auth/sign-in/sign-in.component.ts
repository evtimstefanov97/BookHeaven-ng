import { AuthService } from '../auth.service';
import { Component, OnInit } from "@angular/core";
import { logging } from "protractor";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() { }
  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signIn(email, password);
  }
}
