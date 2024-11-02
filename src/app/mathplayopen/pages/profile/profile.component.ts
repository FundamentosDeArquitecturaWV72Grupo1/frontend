import { Component } from '@angular/core';
import {User} from '../../models/user.entity';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User = new User(1, 'username', 'Full Name', 'user@example.com', '', 'User'); // Ejemplo de datos iniciales

  constructor() {}

  onSubmit() {
    console.log('User data submitted:', this.user);

  }
}
