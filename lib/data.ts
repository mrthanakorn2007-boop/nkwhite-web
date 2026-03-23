export interface House {
  id: number
  name: string
  type: string
  plotNumber: number
  titleDeed: string
  landArea: number // ตารางวา
  usableArea: number // ตารางเมตร
  floors: number
  bedrooms: number
  bathrooms: number
  kitchens: number
  livingRooms: number
  // Pricing (hidden from UI display, but available for backend)
  houseCost: number
  landCost: number
  totalPrice: number
  priceFormatted: string
  // Media
  image: string
  detailImages?: string[]
  description: string
}

export const houses: House[] = [
  {
    id: 1,
    name: 'Type A',
    type: 'บ้านเดี่ยว 1 ชั้น',
    plotNumber: 136,
    titleDeed: '98072',
    landArea: 60,
    usableArea: 120,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    kitchens: 1,
    livingRooms: 1,
    houseCost: 1560000,
    landCost: 900000,
    totalPrice: 2460000,
    priceFormatted: '2.46 ล้านบาท',
    image: '/house-type-a.jpeg',
    detailImages: [
      '/type-a-detail-1.png',
      '/type-a-detail-2.png',
      '/type-a-detail-3.jpg',
      '/type-a-detail-4.jpg',
    ],
    description: 'บ้านเดี่ยวชั้นเดียวดีไซน์ทันสมัย พื้นที่ใช้สอยกว้างขวาง 120 ตร.ม. บนที่ดิน 60 ตร.วา พร้อม 3 ห้องนอน 2 ห้องน้ำ ห้องครัวและห้องนั่งเล่นขนาดใหญ่ เหมาะสำหรับครอบครัวที่ต้องการความสะดวกสบายและความเป็นส่วนตัว',
  },
  {
    id: 2,
    name: 'Type B',
    type: 'บ้านเดี่ยว 2 ชั้น',
    plotNumber: 139,
    titleDeed: '98075',
    landArea: 60,
    usableArea: 185,
    floors: 2,
    bedrooms: 3,
    bathrooms: 3,
    kitchens: 1,
    livingRooms: 1,
    houseCost: 2405000,
    landCost: 900000,
    totalPrice: 3305000,
    priceFormatted: '3.31 ล้านบาท',
    image: '/house-type-b.jpeg',
    detailImages: [
      '/type-b-detail-1.png',
      '/type-b-detail-2.png',
      '/type-b-detail-3.png',
      '/type-b-detail-4.png',
    ],
    description: 'บ้านเดี่ยว 2 ชั้นหรูหรา พื้นที่ใช้สอยกว้างขวาง 185 ตร.ม. บนที่ดิน 60 ตร.วา พร้อม 3 ห้องนอน 3 ห้องน้ำ ห้องครัวและห้องนั่งเล่นขนาดใหญ่ ออกแบบมาเพื่อครอบครัวที่ต้องการพื้นที่ใช้สอยมากขึ้น',
  },
]

export function getHouseById(id: number): House | undefined {
  return houses.find((house) => house.id === id)
}

// Helper function to format price in Thai
export function formatPriceThai(price: number): string {
  if (price >= 1000000) {
    const millions = price / 1000000
    return `${millions.toFixed(2)} ล้านบาท`
  }
  return `${price.toLocaleString()} บาท`
}
