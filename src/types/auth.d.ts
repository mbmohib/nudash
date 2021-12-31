export interface User {
  email?: string;
  name?: string;
  avatar?: string;
  role?: string;
}

export interface Auth {
  user: User;
  isAuthorized: boolean;
  token?: string;
  expiredIn?: number;
}

export interface Token {
  data: { email: string };
  iat: number;
  exp: number;
}
