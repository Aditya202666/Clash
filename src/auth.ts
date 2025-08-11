import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LOGIN_ENDPOINT } from "./lib/apiEndPoints";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },

    async jwt({ token, user }) {
    //   console.log("from jwt", user, "from jwt");
      if (user) {
        return { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }) {

    //     console.log("from session", {
    //     ...session,
    //     user: {
    //         ...token
    //     }
    //   }, "from session");

      return {
        ...session,
        user: {
            ...token
        }
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

        console.log("user", user, "from api");
        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
});
