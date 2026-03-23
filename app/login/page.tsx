'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.session) {
        router.push('/dashboard')
      }
    } catch (err: any) {
      console.error('Login error:', err.message)
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFFFF] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#F9F6F0] p-10 shadow-sm border border-border">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/icon.png"
            alt="Nkwhite Logo"
            width={80}
            height={80}
            className="mb-6 object-contain"
            priority
          />
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#0F172A]">
            เข้าสู่ระบบแอดมิน
          </h2>
          <p className="mt-2 text-center text-sm text-[#475569]">
            Mange customer leads securely
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A]" htmlFor="email">
                อีเมล (Email)
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-white"
                placeholder="admin@nkwhite.com"
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A]" htmlFor="password">
                รหัสผ่าน (Password)
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-white"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors h-11"
              disabled={loading}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
