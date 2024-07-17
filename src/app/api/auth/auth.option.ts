import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { callFetchAccount, callLogin } from "src/services/api"

export const authOptions = {
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
                    return {
                        access_token: res?.data?.access_token,
                        email: res?.data.user.email,
                        avatar: res.data.user.avatar,
                        id: res.data.user.id,
                        phone: res.data.user.phone,
                        role: res.data.user.role,
                        fullName: res.data.user.fullName
                    }
                }
                // Return null if user data could not be retrieved
                throw new Error(res?.message as string);
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }: { token: IUser, user: IUser, account: any, profile: any, trigger: any }) {
            // if (trigger === 'signIn' && account?.provider !== "credentials") {
            //     // const res = await sendRequest<IBackendRes<JWT>>({
            //     //     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
            //     //     method: "POST",
            //     //     body: {
            //     //         type: account?.provider?.toLocaleUpperCase(),
            //     //         username: user.email,
            //     //     },
            //     // })
            //     const res = await callFetchAccount();
            //     if (res.data) {
            //         token.access_token = res.data?.access_token;
            //         token.user = res.data?.user;
            //         // token.refresh_token = res.data?.refresh_token;
            //         // token.access_expire = dayjs(new Date()).add(
            //         //     +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
            //         // ).unix();
            //     }
            // }
            if (trigger === 'signIn' && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token;
                //@ts-ignore
                // token.refresh_token = user.refresh_token;
                //@ts-ignore
                token.user = user.user;
                //@ts-ignore
                // token.access_expire = dayjs(new Date()).add(
                //     +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
                // ).unix();
            }

            // const isTimeAfter = dayjs(dayjs(new Date())).isAfter(dayjs.unix((token?.access_expire as number ?? 0)))
            // if (isTimeAfter) {

            // }
            return token;
        },
        session({ session, token, user }: { session: IUser, token: IUser, user: IUser }) {
            if (token) {
                session.access_token = token.access_token;
                // session.refresh_token = token.refresh_token;
                session.user = token.user;
                //@ts-ignore
                // session.access_expire = token.access_expire;
                //@ts-ignore
                // session.error = token.error;
            }
            return session;
        }
    },
}
