import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { callFetchAccount, callFreshToken, callLogin } from "src/services/api"
import dayjs from "dayjs";
import { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT) {
    const res = await callFreshToken();
    if (res?.data) {
        return {
            ...token,
            access_token: res?.data?.access_token ?? "",
            // time to refesh token
            access_expire: dayjs(new Date()).add(
                +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
            ).unix(),
            error: ""

        }
    } else {
        // Failed fresh token => do nothing
        return {
            ...token,
            error: "RefreshAccessTokenError" // this is used in the front-end, 
        }
    }
}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                const res = await callLogin(credentials?.username, credentials?.password);

                // If no error and we have user data, return it
                if (res?.data) {
                    return res.data as any;
                }
                // Return null if user data could not be retrieved
                throw new Error(res?.message as string);
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger, session }) {
            if (trigger === 'signIn' && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token;
                //@ts-ignore
                token.user = user.user;
                token.access_expire = dayjs(new Date()).add(
                    +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
                ).unix();
            }
            if (trigger === 'update' && session?.fullName && session?.phone) {
                //@ts-ignore
                token.user.fullName = session?.fullName;
                //@ts-ignore
                token.user.phone = session?.phone;
            }
            const isTimeAfter = dayjs(dayjs(new Date())).isAfter(dayjs.unix((token?.access_expire as number ?? 0)))
            if (isTimeAfter) {

            }
            return token;
        },
        session({ session, token, user }) {
            if (token) {
                //@ts-ignore
                session.access_token = token.access_token;
                //@ts-ignore
                session.user = token.user;
                //@ts-ignore
                session.access_expire = token.access_expire;
                //@ts-ignore
                session.error = token.error;
            }
            return session;
        }
    },
}
