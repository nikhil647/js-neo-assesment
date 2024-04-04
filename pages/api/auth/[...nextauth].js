import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../utils/connectMongo";
const User = require("../../../models/userModel");
const bcrypt = require("bcrypt");
/**
 * Main Server Auth Handler
 */
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENTID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      authorize: async (Credential) => {
        try {
          console.log("CONNECTING TO MONGO");
          await connectMongo();
        } catch (err) {
          console.log("err ->", err);
          return null;
        }
        const user = await User.findOne({ email: Credential.email });
        console.log("user ==>", user);
        const isMatch = bcrypt.compareSync(Credential.password, user.password);

        if (isMatch) {
          user.password = undefined;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      //console.log('token, user ==>',token, user)
      if (user) {
        token.id = user.id;
        token.profilepath = user.profilepath;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.profilepath = token.profilepath;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "/signin",
  },
};
export default NextAuth(authOptions);
