import { CartItem, Order } from '../types'

type Props = {
  cart: CartItem[]
  onClose: () => void
  onPlaceOrder: (order: Order) => void
}

export default function OrderSummary({ cart, onClose, onPlaceOrder }: Props) {
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0)

  function place() {
    const order: Order = {
      id: `ord_${Date.now()}`,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    }
    onPlaceOrder(order)
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '16px' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '12px', marginTop: 0 }}>Order Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
          {cart.map(it => (
            <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: '500' }}>{it.name} x{it.qty}</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>${it.price.toFixed(2)} each</div>
              </div>
              <div style={{ fontWeight: '600' }}>${(it.price * it.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}><span>Total</span> <span>${total.toFixed(2)}</span></div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#e5e7eb', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={onClose}>Continue Shopping</button>
          <button style={{ flex: 1, backgroundColor: '#16a34a', color: '#fff', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={place}>Place Order</button>
        </div>
      </div>
    </div>
  )
}
