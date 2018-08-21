import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, FormsModule]
})

export class AuthModule {}
