import { MenuCategory, MenuItem } from '../types'

type Props = {
  menu: MenuCategory[]
  onAdd: (item: MenuItem) => void
}

export default function Menu({ menu, onAdd }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {menu.map(category => (
        <div key={category.id}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', margin: '0 0 12px 0' }}>{category.category}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {category.items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '12px', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ fontWeight: '500', margin: '0 0 4px 0' }}>{item.name}</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0' }}>{item.desc}</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onAdd(item)}
                  style={{ backgroundColor: '#f97316', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', border: 'none', cursor: 'pointer' }}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
