'use client'

import { motion } from 'framer-motion'
import { MapPin, ShoppingBag, Building2 } from 'lucide-react'
import { GOOGLE_MAPS_EMBED_URL } from '@/lib/maps'

const locationCategories = [
  {
    icon: MapPin,
    title: 'การเดินทางและคมนาคม',
    locations: [
      'สะพานมิตรภาพไทย-ลาว แห่งที่ 1 (ด่านพรมแดนหนองคาย) (เพียง 3 นาที)',
      'สถานีรถไฟหนองคาย',
      'ติดถนนมิตรภาพ (ทางหลวงหมายเลข 2)',
    ],
  },
  {
    icon: ShoppingBag,
    title: 'แหล่งช้อปปิ้งและไลฟ์สไตล์',
    locations: [
      'ใจกลางเมืองหนองคาย (เพียง 5 นาที)',
      'อัศวรรณ ช้อปปิ้ง คอมเพล็กซ์',
      'แม็คโคร หนองคาย',
      'เมกาโฮม และ โกลบอลเฮ้าส์',
    ],
  },
  {
    icon: Building2,
    title: 'ศูนย์ราชการและสถานพยาบาล',
    locations: [
      'โรงพยาบาลหนองคาย',
      'ศูนย์ราชการจังหวัดหนองคาย',
    ],
  },
]

export function LocationSection() {
  return (
    <section id="location" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:mb-16"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            ทำเลศักยภาพที่เชื่อมต่อทุกไลฟ์สไตล์
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-relaxed text-[#475569] sm:text-lg">
            สัมผัสความสะดวกสบายขั้นสุด กับทำเลทองที่เชื่อมต่อคุณเข้าสู่ใจกลางเมืองและจุดศูนย์กลางเศรษฐกิจได้อย่างไร้รอยต่อ
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Location Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-[#F9F6F0] p-6 sm:p-8"
          >
            <div className="space-y-8">
              {locationCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.15 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                      <category.icon className="h-5 w-5 text-[#2563EB]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="ml-13 space-y-2.5 pl-13">
                    {category.locations.map((location, locationIndex) => (
                      <motion.li
                        key={locationIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + categoryIndex * 0.15 + locationIndex * 0.08 }}
                        className="flex items-start gap-2 text-[#475569]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                        <span className="leading-relaxed">{location}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col"
          >
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-[#F9F6F0] p-2 shadow-lg">
              <div className="h-full min-h-[400px] overflow-hidden rounded-xl lg:min-h-full">
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    minHeight: '400px',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="แผนที่ หนองคายไวท์ วิลล์"
                  className="h-full w-full"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-[#64748B]">
              หนองคายไวท์ วิลล์ - ถนนมิตรภาพ อำเภอเมือง จังหวัดหนองคาย
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
