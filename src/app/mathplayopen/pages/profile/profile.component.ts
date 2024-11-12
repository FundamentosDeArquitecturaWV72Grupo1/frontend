import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {InstitutionDto, StudentDto, UserDto} from '../../models/student-profile.entity';
import {StudentProfileService} from '../../services/student-profile.service';
import {CommonModule, NgIf} from '@angular/common'; // Importa FormsModule aquí
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: UserDto | null = null;
  student: StudentDto | null = null;
  institution: InstitutionDto | null = null;
  defaultImage = 'https://thumbs.dreamstime.com/b/var%C3%B3n-silhoutte-avatar-defecto-imagen-del-perfil-placeholder-de-la-foto-130555183.jpg';

  constructor(private userService: StudentProfileService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser ().subscribe(user => {
      this.user = user;
      if (user) {
        this.userService.getStudentById(user.id).subscribe(student => {
          this.student = student;
          if (student) {
            this.userService.getInstitutionById(student.institutionId).subscribe(institution => {
              this.institution = institution;
            });
          }
        });
      }
    });
  }
}
