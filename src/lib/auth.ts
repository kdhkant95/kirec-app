import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { DEV_USER_ID } from "@/lib/mock-data"

const hasGoogle = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
const hasDb = !!(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("[PASSWORD]"))

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...(hasGoogle && hasDb ? { adapter: PrismaAdapter(prisma) } : {}),
  providers: [
    ...(hasGoogle
      ? [Google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })]
      : []),
    Credentials({
      id: "dev",
      credentials: {},
      authorize: () => ({
        id: DEV_USER_ID,
        name: "테스트 사용자",
        email: "dev@kirec.test",
        image: null,
      }),
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
})
