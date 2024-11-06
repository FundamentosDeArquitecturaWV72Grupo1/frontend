export interface AuthCredentials {
  username: string;
  password: string;
  roles: string[];
}

export interface AuthResponse {
  id: number;
  username: string;
  token: string;
}
