import { CartItem } from '../types'

type Props = {
  cart: CartItem[]
  onChangeQty: (id: number, qty: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

export default function Cart({ cart, onChangeQty, onRemove, onCheckout }: Props) {
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0)

  return (
    <aside style={{ marginTop: '24px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px' }}>
      <h3 style={{ fontWeight: '600', marginBottom: '12px', margin: '0 0 12px 0' }}>Your Cart</h3>
      {cart.length === 0 && <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Cart is empty</p>}
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', paddingTop: '8px', borderBottom: '1px solid #e5e7eb' }}>
          <div>
            <div style={{ fontWeight: '500' }}>{item.name}</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>${item.price.toFixed(2)} each</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff' }} onClick={() => onChangeQty(item.id, Math.max(1, item.qty - 1))}>−</button>
            <div style={{ padding: '0 8px' }}>{item.qty}</div>
            <button style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff' }} onClick={() => onChangeQty(item.id, item.qty + 1)}>+</button>
            <button style={{ marginLeft: '12px', fontSize: '14px', color: '#dc2626', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => onRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '12px' }}><span>Total</span> <span>${total.toFixed(2)}</span></div>
          <button style={{ width: '100%', backgroundColor: '#000', color: '#fff', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={onCheckout}>Checkout</button>
        </div>
      )}
    </aside>
  )
}
