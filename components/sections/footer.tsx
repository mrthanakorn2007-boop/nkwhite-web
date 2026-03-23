'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    // 30% secondary - Navy dark footer
    <footer className="bg-[#0F172A] py-12 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between gap-8 md:flex-row"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-light tracking-wide">
              <span className="text-primary">หนองคายไวท์</span> วิลล์
            </h3>
            <p className="mt-1 text-xs text-white/60">
              Nong Khai White Ville
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#hero"
              className="text-white/70 transition-colors hover:text-primary"
            >
              หน้าแรก
            </a>
            <a
              href="#houses"
              className="text-white/70 transition-colors hover:text-primary"
            >
              รายละเอียดโครงการ
            </a>
            <a
              href="#contact"
              className="text-white/70 transition-colors hover:text-primary"
            >
              ติดต่อเรา
            </a>
          </nav>

          <div className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-center text-xs leading-relaxed text-white/65 md:text-left">
            หมายเหตุ: ภาพตกแต่งภายในและภูมิทัศน์บางส่วนเป็นภาพจำลองการจัดวางเฟอร์นิเจอร์ที่สร้างขึ้นด้วยเทคโนโลยี AI (Virtual Staging) เพื่อเป็นแนวทางในการตกแต่งและเพื่อให้ลูกค้าเห็นภาพพื้นที่ใช้สอยได้ชัดเจนยิ่งขึ้น โครงสร้างและพื้นที่จริงจะเป็นไปตามมาตรฐานของโครงการ และอาจมีรายละเอียดแตกต่างจากภาพประกอบ
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-white/50 md:text-right">
            <p>© 2026 หนองคายไวท์ วิลล์</p>
            <p>สงวนลิขสิทธิ์</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
