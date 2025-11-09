import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './db'
import type { UserRole } from '@prisma/client'

// FIX: Use '@auth/core/types' for next-auth v5 module augmentation.
declare module '@auth/core/types' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface User {
      role: UserRole;
  }
}

// FIX: Use '@auth/core/jwt' for next-auth v5 module augmentation.
declare module '@auth/core/jwt' {
  interface JWT {
    role: UserRole;
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // TODO: implement password hashing
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
      }
      return session
    },
  },
})
