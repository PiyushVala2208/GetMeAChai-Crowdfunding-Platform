import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
    // 1. Unwrapping params at the top of the component
    const { username } = await params;

    const checkUser = async () => {
        await connectDb()
        // 2. Use the unwrapped 'username' variable
        let u = await User.findOne({ username: username })
        if (!u) {
            return notFound()
        }
    }
    await checkUser()

    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default Username

export async function generateMetadata({ params }) {
    // 3. Unwrapping params here too
    const { username } = await params;
    
    return {
        // 4. Use 'username' directly instead of 'params.username'
        title: `Support ${username} - Get Me A Chai`,
    }
}