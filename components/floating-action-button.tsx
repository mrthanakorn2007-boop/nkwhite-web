'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function FloatingActionButton() {
  return (
    <motion.a
      href="https://line.me"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B900] shadow-lg transition-shadow hover:shadow-xl"
      aria-label="ติดต่อผ่าน LINE"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      
      {/* Subtle pulse */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#00B900] opacity-20" />
    </motion.a>
  )
}
