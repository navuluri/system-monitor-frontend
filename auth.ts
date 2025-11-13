import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Check if GitHub Enterprise is configured
const isGitHubEnterprise = !!process.env.GITHUB_ENTERPRISE_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // Support both GitHub.com and GitHub Enterprise
      ...(isGitHubEnterprise && {
        issuer: process.env.GITHUB_ENTERPRISE_URL,
        token: `${process.env.GITHUB_ENTERPRISE_URL}/login/oauth/access_token`,
        userinfo: `${process.env.GITHUB_ENTERPRISE_URL}/api/v3/user`,
        authorization: `${process.env.GITHUB_ENTERPRISE_URL}/login/oauth/authorize`,
      }),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
