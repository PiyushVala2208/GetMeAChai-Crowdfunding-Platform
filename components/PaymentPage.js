"use client"
import React, { useEffect, useState, useCallback } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import { useForm } from 'react-hook-form'

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Real-time validation
    defaultValues: {
      name: "",
      message: "",
      amount: ""
    }
  });

  // Amount ko watch kar rahe hain buttons ke liye
  const amountValue = watch("amount");

  // 2. Form Submission Handler
  const onSubmit = async (data) => {
    try {
      // Amount ko paise mein convert karna (INR to Paise)
      await pay(Number.parseInt(data.amount) * 100, data);
    } catch (error) {
      toast.error("Payment initiation failed!");
    }
  };

  // 3. Quick Pay Helper
  const quickPay = (val) => {
    setValue("amount", val, { shouldValidate: true });
    // Optional: Turant pay karwana ho toh handleSubmit(onSubmit)() call kar sakte ho
  };


  // 1. SMOOTH SCROLL (LENIS)
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  const getData = useCallback(async () => {
    let u = await fetchuser(username)
    setcurrentUser(u)
    let dbpayments = await fetchpayments(username)
    setPayments(dbpayments)
  }, [username])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast.success('🦄 Thanks for your donation!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      const newRelativePathQuery = window.location.pathname;
      window.history.replaceState(null, '', newRelativePathQuery);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    const rzpKey = currentUser.razorpayid || process.env.NEXT_PUBLIC_KEY_ID;

    var options = {
      "key": rzpKey,
      "amount": amount,
      "currency": "INR",
      "name": "Get Me A Chai",
      "description": `Support ${username}`,
      "image": currentUser.profilepic || "/logo.png",
      "order_id": orderId,
      "callback_url": `${window.location.origin}/api/razorpay`,
      "prefill": { "name": paymentform.name || "Anonymous" },
      "theme": { "color": "#facc15" }
    }

    if (window.Razorpay) {
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      toast.error("Razorpay SDK not loaded.");
    }
  }

  return (
    <div className="min-h-screen text-white pb-20">
      {/* BACKGROUND  */}
      <div className="fixed inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload"></Script>

      {/* SECTION: COVER & AVATAR  */}
      <div className='relative w-full flex flex-col items-center'>
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            className='object-cover w-full h-full shadow-2xl'
            src={currentUser.coverpic || "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070"}
            alt="cover"
          />
        </div>

        {/* Profile Pic - Perfect Circle Centering */}
        <div className='absolute bottom-[-64px] md:bottom-[-80px]'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className='rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]'
          >
            <div className="bg-[#00091d] rounded-full p-1">
              <img
                className='rounded-full object-cover size-32 md:size-40 border-2 border-white/10'
                src={currentUser.profilepic || "/avatar.gif"}
                alt="profile"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="info flex justify-center items-center mt-24 md:mt-32 flex-col gap-3 px-4 text-center">
        {/* Heading with extra padding to prevent italic clipping */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='font-black text-4xl md:text-6xl tracking-tighter bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent italic px-4 py-1'
        >
          @{username}
        </motion.h1>

        {/* Slower fade-in for the subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-gray-400 font-medium text-sm md:text-base max-w-md'
        >
          Helping <span className="text-white font-bold">{username}</span> fuel their creativity! ☕
        </motion.p>

        {/* Badges with better spacing and hover effect */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='flex flex-wrap justify-center gap-3 mt-4'
        >
          <div className="px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] md:text-xs font-black uppercase tracking-widest text-yellow-500 shadow-xl backdrop-blur-md">
            ⚡ {payments.length} Payments
          </div>
          <div className="px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] md:text-xs font-black uppercase tracking-widest text-gray-300 shadow-xl backdrop-blur-md">
            💰 ₹{payments.reduce((a, b) => a + b.amount, 0)} Raised
          </div>
        </motion.div>
      </div>

      {/* MAIN GRID */}
      <div className="container mx-auto max-w-6xl px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-8">


          {/* LEFT: SUPPORTERS (ONLY TOP 5) */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl h-fit"
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className='text-2xl font-black italic'>Recent Supporters</h2>
              <span className="text-xs font-bold bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full uppercase tracking-tighter">
                TOP 5 Supporter
              </span>
            </div>

            <ul className='space-y-4'>
              {payments.length === 0 && (
                <li className="text-gray-400 italic py-10 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                  No payments yet. Be the first to support! ☕
                </li>
              )}

              {/* .slice(0, 5) use kiya hai latest 5 dikhane ke liye */}
              {payments.slice(0, 5).map((p, i) => (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className='bg-white/5 p-4 rounded-2xl flex gap-4 items-center border border-white/5 hover:border-yellow-500/30 transition-all group'
                >
                  <div className="size-11 flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-[2px]">
                    <div className="bg-[#0c1120] w-full h-full rounded-full flex items-center justify-center text-yellow-500 font-bold group-hover:scale-110 transition-transform">
                      {p.name ? p.name.charAt(0).toUpperCase() : "A"}
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <p className="text-sm text-white truncate">
                      <span className='font-bold'>{p.name}</span> donated
                      <span className='text-yellow-500 font-extrabold ml-1'>₹{p.amount}</span>
                    </p>
                    <p className='text-xs text-gray-400 italic mt-0.5 truncate italic opacity-80'>
                      "{p.message || "Supported with a chai!"}"
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {payments.length > 5 && (
              <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest font-bold opacity-50">
                + {payments.length - 5} more supporters
              </p>
            )}
          </motion.div>

          {/* RIGHT: PAYMENT FORM */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 h-fit shadow-2xl"
          >
            <h2 className='text-2xl font-black mb-6 italic border-b border-white/10 pb-4'>Fuel Creativity</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>

              {/* NAME INPUT - Added Max Length 30 */}
              <div className="flex flex-col gap-1">
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum 3 chars" },
                    maxLength: { value: 30, message: "Maximum 30 chars" }
                  })}
                  type="text"
                  className={`w-full p-4 rounded-2xl bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600`}
                  placeholder='👤 Enter Name'
                />
                {errors.name && <span className="text-red-500 text-[10px] ml-2 font-bold uppercase tracking-wider">{errors.name.message}</span>}
              </div>

              {/* MESSAGE INPUT - Fixed Max 100 */}
              <div className="flex flex-col gap-1">
                <input
                  {...register("message", {
                    maxLength: { value: 100, message: "Max 100 chars" }
                  })}
                  type="text"
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600"
                  placeholder='💬 Enter Message'
                />
                {errors.message && <span className="text-red-500 text-[10px] ml-2 font-bold uppercase tracking-wider">{errors.message.message}</span>}
              </div>

              {/* AMOUNT INPUT - Added Max 1 Lakh */}
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <input
                    {...register("amount", {
                      required: "Amount is required",
                      pattern: { value: /^[0-9]*$/, message: "Only numbers allowed" },
                      min: { value: 1, message: "Min amount is ₹1" },
                      max: { value: 100000, message: "Max amount is ₹1,00,000" }
                    })}
                    type="text"
                    className={`w-full p-4 rounded-2xl bg-white/5 border ${errors.amount ? 'border-red-500' : 'border-white/10'} focus:border-yellow-500 outline-none transition-all pr-12 text-yellow-500 font-bold`}
                    placeholder='💰 Enter Amount'
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">INR</span>
                </div>
                {errors.amount && <span className="text-red-500 text-[10px] ml-2 font-bold uppercase tracking-wider">{errors.amount.message}</span>}
              </div>

              {/* ANIMATED BUTTON */}
              <motion.button
                whileHover={isValid ? {
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                } : {}}
                whileTap={isValid ? { scale: 0.97 } : {}}
                type="submit"
                disabled={!isValid}
                className="group relative w-full py-4 rounded-2xl bg-yellow-400 text-black font-black uppercase tracking-[0.2em] overflow-hidden shadow-[0_10px_20px_-10px_rgba(250,204,21,0.5)] disabled:opacity-20 disabled:grayscale cursor-pointer flex items-center justify-center gap-3"
              >
                {/* 1. ULTRA SMOOTH GRADIENT OVERLAY */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500"
                />

                {/* 2. WAVE SHINE EFFECT (Framer Motion Optimized) */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={isValid ? {
                    x: ["100%", "-100%"],
                  } : {}}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
                />

                {/* 3. DYNAMIC GLOW (Hover karne par piche se light ayegi) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-yellow-400/30 -z-10" />

                {/* 4. CONTENT */}
                <div className="relative z-10 flex items-center gap-2">
                  <span className="drop-shadow-sm">Pay Now</span>
                  <motion.span
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 5 }
                    }}
                    initial="initial"
                    whileHover="hover"
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.span>
                </div>
              </motion.button>
            </form>

            {/* QUICK PAY BUTTONS */}
            <div className='flex gap-2 mt-6 justify-between'>
              {[10, 20, 50].map((val) => (
                <button
                  key={val}
                  className={`flex-1 p-3 rounded-xl border transition-all font-bold text-sm flex items-center justify-center gap-1 ${amountValue == val ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 'bg-white/5 border-white/10 hover:border-yellow-500/50 hover:bg-white/[0.08]'}`}
                  onClick={() => quickPay(val)}
                >
                  <span className="text-[10px] opacity-70">₹</span>{val}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage