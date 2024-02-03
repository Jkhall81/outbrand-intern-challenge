import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      fullName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    }
  );
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  onRegister() {
    const registerData = this.registerForm.value;

    // post request to server
    this.http
      .post('http://localhost:3000/api/user/register', registerData)
      .subscribe(
        (response: any) => {
          console.log('Registration successful:', response);

          // Display success Toast
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'User successfully registered',
          });

          // Delay redirect to home page
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 4000);
        },
        (error: any) => {
          console.error('Registration failed:', error);
        }
      );
  }
}
