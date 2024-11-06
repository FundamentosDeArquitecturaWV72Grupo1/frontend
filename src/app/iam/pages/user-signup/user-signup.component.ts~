import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption, MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {StudentService} from '../../services/student.service';
import {Institution} from '../../model/intitution.models';
import {InstitutionService} from '../../services/institution.service';
import {StudentRegistration} from '../../model/student.models';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthCredentials} from '../../model/auth.models';
import {tap} from 'rxjs';

interface Rol {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatFormField,
    MatInputModule,
    MatLabel,
    FormsModule,
    MatSelectModule,
    MatOption,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit{
  step = 1;
  credentialsForm: FormGroup;
  studentDetailsForm: FormGroup;
  institutions: Institution[] = [];
  errorMessage = '';
  roles = ['ROLE_STUDENT', 'ROLE_INSTRUCTOR'];


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private studentService: StudentService,
    private institutionService: InstitutionService,
    private router: Router
  ) {
    this.credentialsForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ROLE_STUDENT', Validators.required]
    });

    this.studentDetailsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      institutionId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadInstitutions();
  }

  loadInstitutions() {
    this.institutionService.getAllInstitutions().subscribe({
      next: (institutions) => {
        this.institutions = institutions;
        console.log('Institutions loaded:', this.institutions);
      },
      error: (error) => {
        console.error('Error loading institutions:', error);
        this.errorMessage = 'Error loading institutions';
      }
    });
  }

  onCredentialsSubmit(): void {
    if (this.credentialsForm.valid) {
      const username = this.credentialsForm.get('username')?.value;
      console.log('Username captured:', username);

      const credentials: AuthCredentials = {
        username: username,
        password: this.credentialsForm.get('password')?.value,
        roles: [this.credentialsForm.get('role')?.value]
      };

      console.log('Credentials to send:', credentials);

      this.authService.signUp(credentials).pipe(
        tap(response => {
          console.log('Auth Response:', response);
          console.log('Token stored:', localStorage.getItem('token'));
        })
      ).subscribe({
        next: () => {
          if (credentials.roles[0] === 'ROLE_STUDENT') {
            this.step = 2;
          } else {
            this.router.navigate(['/news']);
          }
        },
        error: (error) => {
          this.errorMessage = 'Error registering credentials';
          console.error('Auth Error:', error);
        }
      });
    }else {
      console.log('Credentials form is invalid:', this.credentialsForm.errors);
    }
  }

  onStudentDetailsSubmit(): void {
    if (this.studentDetailsForm.valid) {
      const studentData: StudentRegistration = {
        firstName: this.studentDetailsForm.get('firstName')?.value,
        lastName: this.studentDetailsForm.get('lastName')?.value,
        email: this.studentDetailsForm.get('email')?.value,
        institutionId: this.studentDetailsForm.get('institutionId')?.value,
      };

      const token = localStorage.getItem('token');
      console.log('Token before student registration:', token);
      console.log('Student data to send:', studentData);

      if (!token) {
        this.errorMessage = 'No authentication token found';
        return;
      }

      this.studentService.registerStudent(studentData).pipe(
        tap(response => console.log('Student Registration Response:', response))
      ).subscribe({
        next: () => {
          this.router.navigate(['/news']);
        },
        error: (error) => {
          this.errorMessage = 'Error registering student details';
          console.error('Student Registration Error:', error);
          if (error.status === 401) {
            this.errorMessage = 'Authentication error. Please try again';
            this.step = 1;
          }
        }
      });
    }else {
      console.log('Student details form is invalid:', this.studentDetailsForm.errors);
    }
  }
}
