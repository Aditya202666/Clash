import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string ;
      name: string ;
      email: string ;
      avatar?: string ;
      token: string ;
      tokenExpireAt: number ;
    };
  }

  interface User {
    id?: string ;
    name?: string ;
    email?: string ;
    avatar?: string ;
    token?: string ;
  }
}

// Augmenting "next-auth/jwt"
declare module "next-auth/jwt" {
  interface JWT  {
    id?: string ;
    name?: string ;
    email?: string ;
    avatar?: string  ;
    token?: string ;
  }
}
