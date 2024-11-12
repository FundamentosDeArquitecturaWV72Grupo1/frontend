export interface UserDto {
  id: number;
  username: string;
  roles: RoleDto[];
}

export interface RoleDto {
  name: string;
}

export interface StudentDto {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  institutionId: number;
}

export interface InstitutionDto {
  name: string;
  street: string;
  city: string;
  state: string;
}
