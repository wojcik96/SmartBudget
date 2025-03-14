export interface JwtUser {
  sub: string;
  name: string;
  iat: number;
  exp: number;
}
