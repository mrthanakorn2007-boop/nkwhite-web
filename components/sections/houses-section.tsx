'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BedDouble, Bath, Maximize, Ruler, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { houses, type House } from '@/lib/data'

interface HouseCardProps {
  house: House
  index: number
}

function HouseCard({ house, index }: HouseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex-shrink-0 snap-start"
    >
      {/* 60% dominant - white card background */}
      <div className="overflow-hidden rounded-lg bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={house.image}
            alt={`${house.name} - ${house.type}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          {/* House name and type */}
          <div className="mb-1">
            <h3 className="text-base font-medium text-foreground">
              {house.name}
            </h3>
            <p className="text-sm text-muted-foreground">{house.type}</p>
          </div>
          
          {/* Price - 10% accent blue */}
          <p className="mb-4 text-lg font-medium text-primary">
            {house.priceFormatted}
          </p>
          
          {/* Specs grid */}
          <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-primary/70" />
              {house.bedrooms} ห้องนอน
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary/70" />
              {house.bathrooms} ห้องน้ำ
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-primary/70" />
              {house.usableArea} ตร.ม.
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-primary/70" />
              {house.landArea} ตร.วา
            </span>
          </div>
          
          {/* 10% accent - blue button */}
          <Button
            asChild
            variant="outline"
            className="w-full border-primary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Link href={`/house/${house.id}`}>
              ดูรายละเอียด
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export function HousesSection() {
  return (
    // 60% dominant - pure white background
    <section id="houses" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-primary">
            {houses.length} Exclusive Units
          </p>
          <h2 className="mb-4 text-2xl font-light text-foreground md:text-3xl lg:text-4xl">
            รายละเอียดโครงการ
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            บ้านหรูแต่ละหลังถูกออกแบบอย่างพิถีพิถัน เพื่อมอบประสบการณ์การอยู่อาศัยที่เหนือระดับ
          </p>
        </motion.div>

        {/* Desktop Grid - centered for fewer houses */}
        <div className="hidden justify-center gap-6 md:flex md:flex-wrap">
          {houses.map((house, index) => (
            <div key={house.id} className="w-full max-w-sm">
              <HouseCard house={house} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden scrollbar-hide">
          {houses.map((house, index) => (
            <div key={house.id} className="w-[300px] flex-shrink-0">
              <HouseCard house={house} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
