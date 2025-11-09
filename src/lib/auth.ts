import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './db'
import type { UserRole } from '@prisma/client'

// FIX: Update module augmentation for next-auth v5 Session and User interfaces.
// The module 'next-auth' is incorrect for v5; it should be '@auth/core/types'.
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

// FIX: Update module augmentation for next-auth v5 JWT interface.
// The module '@auth/core/jwt' is incorrect. When using the `next-auth` package,
// the correct module to augment for JWT is 'next-auth/jwt'.
declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
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
