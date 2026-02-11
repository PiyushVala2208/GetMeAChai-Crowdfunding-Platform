"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react' // Lucide icons use kar raha hoon
import Lenis from 'lenis'

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [showSecret, setShowSecret] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // React Hook Form Initialization
    const { register, handleSubmit, reset, setValue } = useForm()

    useEffect(() => {
        // 1. Better Lenis Config for "Butter Smooth" feel
        const lenis = new Lenis({
            lerp: 0.1, // Smoothness intensity
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        // 2. Auth & Data Fetching
        if (status === "unauthenticated") {
            router.push('/login')
        }
        else if (status === "authenticated" && session?.user?.name) {
            getData()
        }

        return () => lenis.destroy()
    }, [session, status])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        // Set values in React Hook Form
        Object.keys(u).forEach(key => {
            setValue(key, u[key])
        })
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            await updateProfile(data, session.user.name)
            toast.success('🚀 Profile Updated Successfully!', {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce,
            })
        } catch (error) {
            toast.error('❌ Update failed')
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputStyle = "block w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 outline-none transition-all duration-300 placeholder:text-gray-600 text-sm md:text-base";
    const labelStyle = "block mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest ml-1";

    if (status === "loading") return null;

    return (
        <div className="min-h-screen text-white pb-20 selection:bg-yellow-500/30">
            {/* BACKGROUND */}
            <div className="fixed inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff15_1px,#00091d_1px)] bg-[size:30px_30px]" />

            <ToastContainer />

            <div className='container mx-auto pt-32 md:pt-40 px-4 sm:px-6 relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-8 md:mb-12">
                        <motion.h1
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className='text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-3 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent'
                        >
                            Creator Dashboard
                        </motion.h1>
                        <p className="text-gray-500 text-sm md:text-lg font-light italic">
                            Fuel your creativity, one chai at a time.
                        </p>
                    </div>

                    <motion.div
                        className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 md:p-12 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                            {/* SECTION: Profile Details */}
                            <div className="space-y-6">
                                <h3 className="text-yellow-500 text-sm font-bold tracking-widest uppercase">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className='space-y-1'>
                                        <label className={labelStyle}>Full Name</label>
                                        <input {...register("name")} placeholder="Your Name" className={inputStyle} />
                                    </div>
                                    <div className='space-y-1'>
                                        <label className={labelStyle}>Email</label>
                                        <input {...register("email")} placeholder="email@domain.com" className={inputStyle} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className='space-y-1'>
                                        <label className={labelStyle}>Username</label>
                                        <input {...register("username")} placeholder="username" className={inputStyle} />
                                    </div>
                                    <div className='space-y-1'>
                                        <label className={labelStyle}>Profile Picture</label>
                                        <input {...register("profilepic")} placeholder="URL" className={inputStyle} />
                                    </div>
                                </div>

                                <div className='space-y-1'>
                                    <label className={labelStyle}>Cover Picture</label>
                                    <input {...register("coverpic")} placeholder="URL" className={inputStyle} />
                                </div>
                            </div>

                            {/* SECTION: Payments */}
                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <h3 className="text-yellow-500 text-sm font-bold tracking-widest uppercase">Payment Credentials</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className='space-y-1'>
                                        <label className={labelStyle}>Razorpay ID</label>
                                        <input {...register("razorpayid")} className={inputStyle} />
                                    </div>
                                    <div className='space-y-1 relative'>
                                        <label className={labelStyle}>Razorpay Secret</label>
                                        <div className="relative group">
                                            <input
                                                {...register("razorpaysecret")}
                                                type={showSecret ? "text" : "password"}
                                                className={`${inputStyle} pr-12`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowSecret(!showSecret)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <motion.button
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-5 px-6 text-black bg-yellow-400 hover:bg-yellow-300 font-black rounded-2xl transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(250,204,21,0.4)] uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                                {isSubmitting ? 'Saving...' : 'Update Dashboard'}
                            </motion.button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push(`/${session?.user?.name}`)}
                                className="w-full py-4 px-6 text-white bg-white/5 border border-white/10 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm uppercase tracking-widest"
                            >
                                <span>View Your Public Page</span>
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>

            </div>
        </div>
    )
}

export default Dashboard