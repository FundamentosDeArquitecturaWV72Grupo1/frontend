import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {User} from '../../models/user.entity';
import {Router} from '@angular/router';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-user-signin',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatButton,
    FormsModule
  ],
  templateUrl: './user-signin.component.html',
  styleUrl: './user-signin.component.css'
})
export class UserSigninComponent implements OnInit{
  users:User[] =[]
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.getAllUsers();

  }
  private getAllUsers(){
    this.usersApiService.getAll().subscribe((response:User[]) => {
      this.users = response;
      console.log(this.users)
    })
  }
  constructor(private router: Router, private usersApiService: UsersApiService) {

  }

  redirectToPasswordRecovery() {
    this.router.navigate(['/password-recovery']);
  }

  redirectToSignin() {
    this.router.navigate(['/sign-in']);
  }

  loginUser() {
    const user = this.users.find(user => user.email === this.email);
    if (user) {
      if (user.password === this.password) {
        this.router.navigate(['/home',user.id,user.role]);
      } else {
        this.errorMessage = 'Contraseña incorrecta';
      }
    } else {
      this.errorMessage = 'Usuario no encontrado';
    }
  }
}
