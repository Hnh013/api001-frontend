import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();

  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),

    })
  }

  signup(): void {
    this.authService
    .signup(this.signupForm.value)
    .subscribe(res => {
      alert(res["message"]);

     

      console.log(res["status"]);
    });
  }

}
