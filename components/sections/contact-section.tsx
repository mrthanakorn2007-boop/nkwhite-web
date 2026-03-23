'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Clock, Check, Facebook } from 'lucide-react'
import { GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_PLACE_URL } from '@/lib/maps'
import { supabase } from '@/lib/supabase'

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/nongkhaiwhite.ville/'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    lineId: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          name: formData.name, 
          phone: formData.phone, 
          line_id: formData.lineId
        }])

      if (error) throw error

      setIsSubmitted(true)
      setFormData({ name: '', phone: '', lineId: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    // 60% dominant - pure white background
    <section id="contact" className="bg-background py-24 md:py-32">
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
            Get in Touch
          </p>
          <h2 className="mb-4 text-2xl font-light text-foreground md:text-3xl lg:text-4xl">
            ติดต่อเรา
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            สนใจเยี่ยมชมโครงการหรือต้องการข้อมูลเพิ่มเติม ทีมงานของเราพร้อมให้บริการ
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Form - 30% secondary cream card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-xl bg-[#F9F6F0] p-6 shadow-sm md:p-8">
              <h3 className="mb-6 text-lg font-medium text-foreground">
                ลงทะเบียนรับข้อมูล
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="mb-2 text-base font-medium text-foreground">
                    ขอบคุณสำหรับความสนใจ
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      ชื่อ-นามสกุล
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="กรุณากรอกชื่อ-นามสกุล"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="border-border bg-background py-5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      เบอร์โทรศัพท์
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0XX-XXX-XXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="border-border bg-background py-5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lineId"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Line ID
                    </label>
                    <Input
                      id="lineId"
                      type="text"
                      placeholder="กรุณากรอก Line ID"
                      value={formData.lineId}
                      onChange={(e) =>
                        setFormData({ ...formData, lineId: e.target.value })
                      }
                      className="border-border bg-background py-5"
                    />
                  </div>

                  {/* 10% accent - blue submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary py-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#1D4ED8] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        กำลังส่ง...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        ส่งข้อมูล
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">ที่ตั้งโครงการ</p>
                  <p className="text-xs text-muted-foreground">
                    อ.เมือง จ.หนองคาย
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">โทรศัพท์ / Line ID</p>
                  <a 
                    href="https://line.me/ti/p/~0952893265" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-muted-foreground hover:text-[#2563EB] transition-colors"
                  >
                    095-289-3265(หนุ่ม)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">เวลาทำการ</p>
                  <p className="text-xs text-muted-foreground">
                    ทุกวัน 09:00 - 18:00
                  </p>
                </div>
              </div>

              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg outline-none transition-colors hover:bg-[#F9F6F0] focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10">
                  <Facebook className="h-4 w-4 text-[#1877F2]" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Facebook</p>
                  <p className="text-xs text-muted-foreground transition-colors group-hover:text-[#1877F2]">
                    โครงการ หนองคายไวท์วิลล์
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Google Maps — same place as Location section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <div className="relative min-h-[320px] flex-1 overflow-hidden lg:min-h-[400px]">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="แผนที่โครงการ หนองคายไวท์ วิลล์"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="border-t border-border bg-[#0F172A] px-4 py-4 text-center sm:px-6">
              <p className="mb-4 text-sm text-white/80">
                ตั้งอยู่ในทำเลทองใจกลางเมืองหนองคาย ใกล้สิ่งอำนวยความสะดวกครบครัน
              </p>
              <Button
                asChild
                variant="outline"
                className="border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a
                  href={GOOGLE_MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  เปิดใน Google Maps
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
