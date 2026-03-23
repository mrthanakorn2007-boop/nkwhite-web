import { Navbar } from '@/components/sections/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { HousesSection } from '@/components/sections/houses-section'
import { LocationSection } from '@/components/sections/location-section'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/sections/footer'
import { FloatingActionButton } from '@/components/floating-action-button'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HousesSection />
      <LocationSection />
      <ContactSection />
      <Footer />
      <FloatingActionButton />
    </main>
  )
}
