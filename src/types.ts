export interface MenuItem {
  id: number
  name: string
  price: number
  desc?: string
}

export interface MenuCategory {
  id: number
  category: string
  items: MenuItem[]
}

export interface CartItem extends MenuItem {
  qty: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  createdAt: string
}
