import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-signin',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatInputModule,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './user-signin.component.html',
  styleUrl: './user-signin.component.css'
})
export class UserSigninComponent implements OnInit{
  signInForm: FormGroup;
  errorMessage = '';

  ngOnInit() {
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe({
        next: () => {
          this.router.navigate(['/news']);
        },
        error: (error) => {
          this.errorMessage = 'Error en las credenciales';
          console.error('Error:', error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

  redirectToPasswordRecovery() {
    //this.authService.signOut()
    this.router.navigate(['/password-recovery']);
  }

  redirectToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
