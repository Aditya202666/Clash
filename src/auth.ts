import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LOGIN_ENDPOINT } from "./lib/apiEndPoints";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt:{
    maxAge: 7 * 24 * 60 * 60
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },

    async jwt({ token, user }) {

      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {

      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          token: token.token,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user = null;

        const { data } = await axios.post(LOGIN_ENDPOINT, credentials);
        user = data?.data;

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
});
