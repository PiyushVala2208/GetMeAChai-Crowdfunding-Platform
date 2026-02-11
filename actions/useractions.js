"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()

    // 1. Fetch the user receiving the payment
    let user = await User.findOne({ username: to_username })
    if (!user) throw new Error("User not found")

    const secret = user.razorpaysecret
    var instance = new Razorpay({
        key_id: user.razorpayid,
        key_secret: secret
    })

    // 2. CRITICAL FIX: Razorpay expects amount in PAISA (e.g., ₹1 = 100 paisa)
    // You were parsing the amount but not ensuring it's in the smallest unit.
    let options = {
        amount: Number.parseInt(amount), // This should already be (actual_amount * 100)
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // 3. Create pending payment record
    // Note: Use x.id as the Order ID (oid)
    await Payment.create({
        oid: x.id,
        amount: amount / 100, // Store actual Rupee value in DB
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    })

    return x
}

export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) return null

    // Flattening for Next.js Client Components
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    // Using .lean() is great for performance
    let p = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .limit(10)
        .lean()

    // 4. FIX: Ensure ObjectIds and Dates are converted to strings for the client
    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt?.toISOString(),
        updatedAt: payment.updatedAt?.toISOString()
    }))
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // Check if username is being changed and if new one is taken
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }

        // Update User Profile
        await User.updateOne({ email: ndata.email }, ndata)

        // 5. IMPORTANT: Update all payments to reflect the new username
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
        return { success: true, message: "Profile and payments updated!" }
    } else {
        await User.updateOne({ email: ndata.email }, ndata)
        return { success: true, message: "Profile updated!" }
    }
}