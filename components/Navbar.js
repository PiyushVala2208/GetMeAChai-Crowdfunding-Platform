"use client"
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 flex justify-between items-center h-20 
            ${scrolled
                ? "bg-black/40 backdrop-blur-xl saturate-[1.8] border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "bg-transparent border-b border-transparent"
            }`}>

            <Link href="/" className="group relative flex items-center gap-4 no-underline outline-none">
                <div className="absolute -inset-3 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-12 h-12">
                        <div className="absolute inset-0 border-2 border-white/5 rounded-2xl group-hover:rotate-45 group-hover:border-orange-500/80 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"></div>
                        <span className="relative text-lg font-extrabold tracking-widest text-white group-hover:text-yellow-400 transition-colors duration-300">
                            Yo!
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <div className="overflow-hidden">
                            <span className="block text-xl font-bold tracking-tight text-white translate-y-0 group-hover:-translate-y-px transition-transform duration-300">
                                GetMeA<span className="text-yellow-400">Chai</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[1px] w-8 bg-yellow-500/80"></div>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-500 group-hover:text-gray-300 transition-colors">
                                Exclusive
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="relative flex items-center gap-6">
                {session ? (
                    <>
                        <div className="relative">
                            <button
                                onClick={() => setShowdropdown(!showdropdown)}
                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-2 px-4 rounded-full transition-all active:scale-95"
                            >
                                <img
                                    src={session.user.image || "https://ui-avatars.com/api/?name=" + session.user.name}
                                    alt="User"
                                    className="w-7 h-7 rounded-full border border-cyan-500"
                                />
                                <span className="text-sm font-medium hidden sm:block">Hi, {session.user.name.split(' ')[0]}</span>
                                <svg className={`w-4 h-4 transition-transform duration-300 ${showdropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {showdropdown && (
                                <div
                                    className="absolute right-0 mt-3 w-56 origin-top-right bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200"
                                    onClick={() => setShowdropdown(false)}
                                >
                                    <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                        <span className="mr-3">📊</span> Dashboard
                                    </Link>
                                    <Link href={`/${session.user.name}`} className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                        <span className="mr-3">☕</span> Your Page
                                    </Link>
                                    <div className="h-[1px] bg-white/10 my-1 mx-4"></div>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <span className="mr-3">🚪</span> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden font-medium text-white border-2 border-yellow-400 rounded-full shadow-md group transition-all duration-300">

                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white -translate-x-full bg-yellow-500 group-hover:translate-x-0 transition-transform duration-500 ease-[0.23,1,0.32,1]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>

                            <span className="absolute flex items-center justify-center w-full h-full text-yellow-400 transition-all duration-500 transform group-hover:translate-x-full ease-[0.23,1,0.32,1]">
                                Login
                            </span>

                            <span className="relative invisible">Login</span>

                        </button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar