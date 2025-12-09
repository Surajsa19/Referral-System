"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Share2, Users, CreditCard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-blue-500/30">

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
            New: Referral v2.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-white bg-clip-text text-transparent"
        >
          Grow Your Audience <br /> Earn Rewards.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          The world's most elegant referral system. Share your unique link, track conversions in real-time, and earn credits instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
        >
          <Link href="/login" className="w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all hover:scale-105">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/register" className="w-full md:w-auto">
            <Button size="lg" variant="outline" className="w-full md:w-auto h-12 px-8 text-base border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
              Create Account
            </Button>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl">
          {[
            { icon: Share2, title: "Share Link", desc: "Get a unique referral link instantly.", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/10" },
            { icon: Users, title: "Track Friends", desc: "See when friends sign up and buy.", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/10" },
            { icon: CreditCard, title: "Earn Credits", desc: "Get 2 credits for every purchase.", bg: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/10" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${item.bg} border ${item.border} backdrop-blur-sm hover:border-white/10 transition-colors text-left`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-900/50 flex items-center justify-center mb-4 border border-white/5">
                <item.icon className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-100">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
