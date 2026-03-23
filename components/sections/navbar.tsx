'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'หน้าแรก', href: '#hero' },
  { name: 'แกลลอรี', href: '#houses' },
  { name: 'ทำเลที่ตั้ง', href: '#location' },
  { name: 'ติดต่อเรา', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect for subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      // Add shadow simply when scrolling past top
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FFFFFF] ${
        isScrolled ? 'shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-b border-border' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link href="#hero" className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded">
              <Image
                src="/logo.png"
                alt="Nkwhite Logo"
                width={140}
                height={50}
                className="h-[40px] w-auto md:h-[50px] object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation links on the right */}
          <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-[#0F172A] hover:text-[#2563EB] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded px-2 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#0F172A] hover:bg-[#F9F6F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-[#FFFFFF] shadow-lg absolute w-full">
          <div className="space-y-1 px-4 pb-4 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-[#0F172A] hover:bg-[#F9F6F0] hover:text-[#2563EB] transition-colors active:bg-[#F9F6F0]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
