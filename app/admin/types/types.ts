
export interface IUser {
  id: string;
  name: string;
  email: string;
  // age?: string;        // optional
  password?: string;   // optional
  role: Role;
  isVerified: boolean;
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  
}