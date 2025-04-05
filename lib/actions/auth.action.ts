'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const {uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists.Pls sign in instead',
            }
        }

        await db.collection('users').doc(uid).set({
            name,
            email,
            createdAt: new Date().toISOString(),
        });
    } catch (err: any) {
        console.log('error creating user', err)

        if (err.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already exists',
            }
        }
    }
}

export async function setSeesionCookie(idToken: string) {
    const cookieStore = await cookies()

    const seesionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session', seesionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    })
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email)
        if (!userRecord) {
            throw new Error('User not found')
        }
        await setSeesionCookie(idToken)
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, message: 'Error signing in' }
    }

}