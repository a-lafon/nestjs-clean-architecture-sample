export interface JwtOptions {
  expiresIn?: string;
}

export interface IJwtService {
  sign(payload: object, options?: JwtOptions): string;
  verify<T extends object = any>(token: string): Promise<T>;
}
