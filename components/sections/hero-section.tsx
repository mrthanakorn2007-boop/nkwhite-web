'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const HERO_IMAGE = '/hero-nong-khai-white-ville.jpg'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Real project entrance — premium stack: photo + sky polish + flare + readability */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="ทางเข้าโครงการหนองคายไวท์ วิลล์"
          fetchPriority="high"
          className="h-full w-full scale-[1.02] object-cover object-[center_42%] brightness-[1.04] contrast-[1.06] saturate-[1.07] sm:object-[center_40%]"
        />
        {/* Clear premium sky tone — softens wire clutter and lifts the upper field */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#3b82f6]/[0.18] via-[#93c5fd]/[0.06] to-transparent"
          aria-hidden
        />
        {/* Soft airy “morning” lift on architecture */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent"
          aria-hidden
        />
        {/* Subtle sun flare — luxury highlight */}
        <div
          className="pointer-events-none absolute -right-[10%] -top-[5%] h-[min(70vh,520px)] w-[min(85vw,640px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.12)_35%,transparent_68%)] mix-blend-overlay blur-[1px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[8%] top-[12%] h-32 w-32 rounded-full bg-white/30 blur-3xl"
          aria-hidden
        />
        {/* Vignette + base contrast for centered UI */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.28)_0%,transparent_62%)]"
          aria-hidden
        />
      </div>

      {/* Centered content — high contrast, unchanged structure */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-sm font-medium tracking-[0.35em] text-white/95 [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
        >
          EXCLUSIVE COLLECTION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4 text-4xl font-light leading-tight tracking-tight text-white md:text-5xl lg:text-6xl [&>span]:[text-shadow:0_4px_32px_rgba(0,0,0,0.55),0_2px_12px_rgba(0,0,0,0.45)]"
        >
          <span className="text-balance">ไวล์วิลล์</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-white/95 md:text-lg [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
        >
          โครงการบ้านเดี่ยวระดับพรีเมียม จำนวนจำกัดเพียง 8 หลัง
          ออกแบบอย่างพิถีพิถันเพื่อคุณภาพชีวิตที่เหนือระดับ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="min-w-[180px] bg-primary px-8 py-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-[#1D4ED8]"
          >
            <a href="#houses">ดูบ้านตัวอย่าง</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[180px] border-white/45 bg-white/12 px-8 py-6 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/22 hover:text-white"
          >
            <a href="#contact">ติดต่อเรา</a>
          </Button>
        </motion.div>
      </div>

      {/* Brand monogram — bottom left */}
      <div
        className="pointer-events-none absolute bottom-8 left-6 z-20 md:bottom-10 md:left-10"
        aria-hidden
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/25 text-[15px] font-semibold tracking-tight text-white shadow-lg backdrop-blur-md md:h-12 md:w-12 md:text-base">
          N
        </div>
      </div>

      {/* Scroll indicator — centered, above safe area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <ChevronDown className="h-5 w-5 text-white/70 drop-shadow-md" />
        </motion.div>
      </motion.div>
    </section>
  )
}
