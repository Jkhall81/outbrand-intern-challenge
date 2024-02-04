import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onSignIn() {
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.authService.signIn(email, password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        // Handle success, maybe navigate to another page

        this.authService.setAuthenticated(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'User Login Successful',
        });

        localStorage.setItem('userEmail', email);

        // Delay redirect to home page
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 4000);
      },
      (error: any) => {
        console.error('Login failed:', error);
        // Handle error, show an error message, etc.

        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Please Try Again',
        });
      }
    );
  }
}
