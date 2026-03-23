'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, isToday, parseISO } from 'date-fns'
import { th } from 'date-fns/locale'
import { RefreshCw, Search, Inbox, AlertCircle, Loader2, LogOut, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

interface Lead {
  id: string
  created_at: string
  name: string
  phone: string
  line_id: string
  status: string
}

const STATUS_OPTIONS = [
  { value: 'ใหม่', label: 'ใหม่', color: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]' },
  { value: 'ติดต่อแล้ว', label: 'ติดต่อแล้ว', color: 'bg-amber-500 text-white hover:bg-amber-600' },
  { value: 'สนใจพิเศษ', label: 'สนใจพิเศษ', color: 'bg-purple-500 text-white hover:bg-purple-600' },
  { value: 'ปิดการขาย', label: 'ปิดการขาย', color: 'bg-emerald-500 text-white hover:bg-emerald-600' },
  { value: 'ยกเลิก', label: 'ยกเลิก', color: 'bg-slate-400 text-white hover:bg-slate-500' },
]

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      const normalizedData = (data || []).map(lead => ({
        ...lead,
        status: lead.status || 'ใหม่'
      }))
      
      setLeads(normalizedData)
    } catch (err: any) {
      console.error('Error fetching leads:', err)
      setError(err.message || 'Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      setIsAuthenticated(true)
      fetchLeads()
    }
    
    checkAuthAndFetch()
  }, [])

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const previousLeads = [...leads]
    setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead))
    
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId)
        
      if (error) throw error
      
      toast({
        title: "อัปเดตสถานะสำเร็จ",
        description: `เปลี่ยนสถานะเป็น "${newStatus}" เรียบร้อยแล้ว`,
      })
    } catch (err: any) {
      console.error('Update status error:', err)
      setLeads(previousLeads) // Revert
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตสถานะได้ โปรดลองอีกครั้ง",
      })
    }
  }

  const handleDeleteLead = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId)
        
      if (error) throw error
      
      setLeads(leads.filter(lead => lead.id !== leadId))
      toast({
        title: "ลบข้อมูลสำเร็จ",
        description: "ลบข้อมูลลูกค้าออกจากระบบเรียบร้อยแล้ว",
      })
    } catch (err: any) {
      console.error('Delete lead error:', err)
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบข้อมูลได้ กรุณาตรวจสอบสิทธิ์ (RLS)",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFFFF]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
      </div>
    )
  }

  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = (lead.name && lead.name.toLowerCase().includes(query)) ||
                          (lead.phone && lead.phone.toLowerCase().includes(query))
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalLeads = leads.length
  const newLeadsToday = leads.filter((lead) => {
    if (!lead.created_at) return false;
    try {
      return isToday(parseISO(lead.created_at))
    } catch (e) {
      return false;
    }
  }).length

  const getStatusColorClass = (status: string) => {
    return STATUS_OPTIONS.find(opt => opt.value === status)?.color || 'bg-[#2563EB] text-white'
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-[#F9F6F0] p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold text-[#0F172A] md:text-3xl">
              ระบบจัดการข้อมูลลูกค้า - Nkwhite
            </h1>
            <p className="mt-1 text-sm text-[#475569]">
              Overview of all customer inquiries and leads
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button 
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/login')
              }} 
              className="text-[#475569] border-border hover:bg-[#F9F6F0] hover:text-[#0F172A]"
            >
              <LogOut className="h-4 w-4 mr-2" />
              ออกจากระบบ
            </Button>
            <Button 
              onClick={fetchLeads} 
              disabled={loading}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              อัปเดตข้อมูล
            </Button>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-[#F9F6F0] border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#475569]">
                ลูกค้าที่สนใจทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#0F172A]">{totalLeads}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#F9F6F0] border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#475569]">
                ลูกค้าใหม่ (วันนี้)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2563EB]">{newLeadsToday}</div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-xl border border-border bg-[#FFFFFF] shadow-sm overflow-hidden mb-12">
          {/* Toolbar */}
          <div className="p-6 border-b border-border bg-[#FFFFFF] flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#475569]" />
              <Input
                placeholder="ค้นหาชื่อ หรือ เบอร์โทรศัพท์..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-[#FFFFFF] border-border text-[#0F172A]"
              />
            </div>
            
            <div className="w-full md:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white border-border text-[#0F172A]">
                  <SelectValue placeholder="กรองตามสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                  {STATUS_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FFFFFF]">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="w-[80px] text-[#475569] font-medium">ลำดับ</TableHead>
                  <TableHead className="text-[#475569] font-medium">วัน/เวลา</TableHead>
                  <TableHead className="text-[#475569] font-medium">ชื่อ-นามสกุล</TableHead>
                  <TableHead className="text-[#475569] font-medium">เบอร์โทรศัพท์</TableHead>
                  <TableHead className="text-[#475569] font-medium">ไอดีไลน์</TableHead>
                  <TableHead className="text-[#475569] font-medium">สถานะ</TableHead>
                  <TableHead className="text-[#475569] font-medium text-right w-[80px]">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center bg-[#FFFFFF]">
                      <div className="flex flex-col items-center justify-center text-[#475569]">
                        <Loader2 className="h-8 w-8 animate-spin text-[#2563EB] mb-4" />
                        <p>กำลังโหลดข้อมูล...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center text-destructive bg-[#FFFFFF]">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="h-8 w-8 mb-4 opacity-80" />
                        <p>{error}</p>
                        <Button 
                          variant="outline" 
                          onClick={fetchLeads} 
                          className="mt-4 border-destructive text-destructive hover:bg-destructive hover:text-white"
                        >
                          Try Again
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center bg-[#FFFFFF]">
                      <div className="flex flex-col items-center justify-center text-[#475569]">
                        <Inbox className="h-10 w-10 mb-4 opacity-50" />
                        <p>{searchQuery || statusFilter !== 'all' ? 'ไม่พบข้อมูลลูกค้าจากตัวกรอง' : 'ยังไม่มีข้อมูลลูกค้า'}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-[#F9F6F0] border-border transition-colors bg-[#FFFFFF]">
                      <TableCell className="text-[#475569] font-mono text-xs">
                        {lead.id ? String(lead.id).substring(0, 8) : '-'}
                      </TableCell>
                      <TableCell className="text-[#0F172A] whitespace-nowrap">
                        {lead.created_at ? format(parseISO(lead.created_at), 'dd/MM/yyyy HH:mm', { locale: th }) : '-'}
                      </TableCell>
                      <TableCell className="font-medium text-[#0F172A]">{lead.name}</TableCell>
                      <TableCell className="text-[#0F172A]">{lead.phone}</TableCell>
                      <TableCell className="text-[#0F172A]">{lead.line_id || '-'}</TableCell>
                      
                      <TableCell className="min-w-[140px]">
                        <Select 
                          value={lead.status} 
                          onValueChange={(val) => handleStatusChange(lead.id, val)}
                        >
                          <SelectTrigger className={`h-8 border-none text-xs font-medium focus:ring-0 w-fit gap-1 ${getStatusColorClass(lead.status)}`}>
                            <SelectValue placeholder="เลือกสถานะ" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-[#475569] hover:text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[#0F172A]">ยืนยันการลบข้อมูล?</AlertDialogTitle>
                              <AlertDialogDescription className="text-[#475569]">
                                คุณต้องการลบข้อมูลของ <b>{lead.name}</b> ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-border text-[#0F172A]">ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="bg-destructive text-white hover:bg-destructive/90"
                              >
                                ลบข้อมูล
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
