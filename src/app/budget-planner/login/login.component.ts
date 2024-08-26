import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    if(this.loginForm.valid){
      console.log("Login info==>", this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      // this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
      console.log("Login Error");
    }
  }

  register(){
    if(this.registerForm.valid){  // Ensure we're checking the correct form
      console.log("Register info==>", this.registerForm.value);
      setTimeout(()=>{
        window.location.reload();
      }, 2000);
      this.router.navigate(['/budget-planner/login']);
    } else {
      // this.snackBar.open('Invalid registration details!', 'Close', { duration: 3000 });
      console.log("Register Error");
    }
  }

  toggleForm(form: 'login' | 'register'){
    this.activeForm = form;
  }
}
