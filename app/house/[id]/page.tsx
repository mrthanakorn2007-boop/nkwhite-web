'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, BedDouble, Bath, Maximize, Home, Ruler, ChefHat, Sofa, FileText, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getHouseById } from '@/lib/data'
import { ContactSection } from '@/components/sections/contact-section'

export default function HouseDetailPage() {
  const params = useParams()
  const houseId = Number(params.id)
  const house = getHouseById(houseId)

  if (!house) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top Navigation - 60% dominant white */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            กลับสู่หน้าหลัก
          </Link>
          <span className="text-sm font-medium text-foreground">{house.name} - {house.type}</span>
        </div>
      </nav>

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden md:h-[60vh]">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={house.image}
            alt={`${house.name} - ${house.type}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
        
        {/* House Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-primary">
                แปลงที่ {house.plotNumber}
              </p>
              <h1 className="text-2xl font-light text-white md:text-4xl lg:text-5xl">
                {house.name} - {house.type}
              </h1>
              {/* Price display - 10% accent blue */}
              <p className="mt-3 text-xl font-medium text-primary md:text-2xl">
                {house.priceFormatted}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 pt-2">
        <p className="mt-2 flex items-center gap-1 text-xs italic text-slate-400">
          <Info className="h-3.5 w-3.5" />
          ภาพจำลองการตกแต่งด้วย AI (Virtual Staging)
        </p>
      </div>

      {/* Specifications Grid - 60% dominant white card */}
      <section className="border-b border-border bg-card py-8">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <BedDouble className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.bedrooms}</span>
              <span className="text-xs text-muted-foreground">ห้องนอน</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Bath className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.bathrooms}</span>
              <span className="text-xs text-muted-foreground">ห้องน้ำ</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ChefHat className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.kitchens}</span>
              <span className="text-xs text-muted-foreground">ห้องครัว</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Sofa className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.livingRooms}</span>
              <span className="text-xs text-muted-foreground">ห้องโถง</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Maximize className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.usableArea}</span>
              <span className="text-xs text-muted-foreground">ตร.ม.</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Ruler className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.landArea}</span>
              <span className="text-xs text-muted-foreground">ตร.วา</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.floors}</span>
              <span className="text-xs text-muted-foreground">ชั้น</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-light text-foreground">{house.titleDeed}</span>
              <span className="text-xs text-muted-foreground">โฉนด</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-primary">
                รายละเอียด
              </p>
              <h2 className="mb-6 text-xl font-light text-foreground md:text-2xl">
                คุณสมบัติเด่น
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                {house.description}
              </p>
              
              {/* Property Summary - 30% secondary cream */}
              <div className="rounded-lg border border-border bg-[#F9F6F0] p-6">
                <h3 className="mb-4 text-sm font-medium text-foreground">สรุปรายละเอียดทรัพย์สิน</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ประเภท</span>
                    <span className="font-medium text-foreground">{house.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">แปลงที่</span>
                    <span className="font-medium text-foreground">{house.plotNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">โฉนดเลขที่</span>
                    <span className="font-medium text-foreground">{house.titleDeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">พื้นที่ดิน</span>
                    <span className="font-medium text-foreground">{house.landArea} ตร.วา</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">พื้นที่ใช้สอย</span>
                    <span className="font-medium text-foreground">{house.usableArea} ตร.ม.</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">ราคารวม</span>
                      <span className="font-medium text-primary">{house.priceFormatted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {house.detailImages && house.detailImages.length > 0 && (
        <section className="border-t border-border bg-[#F9F6F0] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-primary">
                {house.name} Interior
              </p>
              <h2 className="text-2xl font-light text-foreground md:text-3xl">
                รายละเอียดภาพบ้าน
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {house.detailImages.map((image, index) => (
                <div key={image}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                  >
                    <img
                      src={image}
                      alt={`${house.name} interior ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </motion.div>
                  <p className="mt-2 flex items-center gap-1 text-xs italic text-slate-400">
                    <Info className="h-3.5 w-3.5" />
                    ภาพจำลองการตกแต่งด้วย AI (Virtual Staging)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick CTA - Navy dark section */}
      <section className="border-y border-border bg-[#0F172A] py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-xl font-light text-white md:text-2xl">
              สนใจ {house.name} - {house.type}?
            </h3>
            <p className="mb-2 text-2xl font-medium text-primary">
              {house.priceFormatted}
            </p>
            <p className="mb-6 text-sm text-white/70">
              นัดหมายเยี่ยมชมโครงการและบ้านจริงได้แล้ววันนี้
            </p>
            {/* 10% accent blue button */}
            <Button
              asChild
              size="lg"
              className="bg-primary px-8 py-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#1D4ED8]"
            >
              <a href="#contact">นัดเยี่ยมชมบ้าน</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Reused */}
      <ContactSection />

      {/* Footer Link */}
      <section className="border-t border-border bg-background py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </section>
    </main>
  )
}
