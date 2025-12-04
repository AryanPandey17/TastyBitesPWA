import { useEffect, useState } from "react"
import "./App.css"

type Meal = {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

type CartItem = Meal & {
  quantity: number
}

type Order = {
  id: string
  items: CartItem[]
  total: number
  customerName: string
  email: string
  phone: string
  address: string
  timestamp: string
}

const meals: Meal[] = [
  // Starters
  {
    id: 1,
    name: "Paneer Tikka",
    price: 150,
    image: "🧀",
    category: "Starters",
    description: "Grilled paneer with spices"
  },
  {
    id: 2,
    name: "Spring Rolls",
    price: 120,
    image: "🥟",
    category: "Starters",
    description: "Crispy vegetable spring rolls"
  },
  {
    id: 3,
    name: "Samosa",
    price: 80,
    image: "🥒",
    category: "Starters",
    description: "Golden fried pastry with filling"
  },
  {
    id: 4,
    name: "Mozzarella Sticks",
    price: 140,
    image: "🧀",
    category: "Starters",
    description: "Crispy cheese sticks with sauce"
  },
  
  // Main Course
  {
    id: 5,
    name: "Paneer Butter Masala",
    price: 220,
    image: "🍛",
    category: "Main Course",
    description: "Creamy paneer curry with tomato base"
  },
  {
    id: 6,
    name: "Veg Biryani",
    price: 180,
    image: "🍚",
    category: "Main Course",
    description: "Aromatic rice with mixed vegetables"
  },
  {
    id: 7,
    name: "Masala Dosa",
    price: 120,
    image: "🥞",
    category: "Main Course",
    description: "Crispy crepe with spiced potato filling"
  },
  {
    id: 8,
    name: "Dal Makhani",
    price: 160,
    image: "🍲",
    category: "Main Course",
    description: "Creamy lentil curry"
  },
  {
    id: 9,
    name: "Chow Mein",
    price: 140,
    image: "🍜",
    category: "Main Course",
    description: "Stir-fried noodles with vegetables"
  },
  
  // Bread
  {
    id: 10,
    name: "Garlic Naan",
    price: 60,
    image: "🥖",
    category: "Bread",
    description: "Soft bread with garlic"
  },
  {
    id: 11,
    name: "Butter Roti",
    price: 40,
    image: "🥖",
    category: "Bread",
    description: "Whole wheat flatbread"
  },
  
  // Desserts
  {
    id: 12,
    name: "Gulab Jamun",
    price: 100,
    image: "🍮",
    category: "Desserts",
    description: "Sweet milk balls in syrup"
  },
  {
    id: 13,
    name: "Kheer",
    price: 90,
    image: "🍚",
    category: "Desserts",
    description: "Rice pudding with cardamom"
  },
  {
    id: 14,
    name: "Ice Cream",
    price: 80,
    image: "🍦",
    category: "Desserts",
    description: "Vanilla or chocolate ice cream"
  },
  
  // Beverages
  {
    id: 15,
    name: "Mango Lassi",
    price: 70,
    image: "🥤",
    category: "Beverages",
    description: "Yogurt-based mango drink"
  },
  {
    id: 16,
    name: "Chai",
    price: 50,
    image: "☕",
    category: "Beverages",
    description: "Warm spiced tea"
  },
  {
    id: 17,
    name: "Fresh Orange Juice",
    price: 60,
    image: "🧃",
    category: "Beverages",
    description: "Freshly squeezed orange juice"
  },
  {
    id: 18,
    name: "Cold Coffee",
    price: 90,
    image: "🥤",
    category: "Beverages",
    description: "Iced coffee with cream"
  }
]

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  // ✅ Load cart and orders from Local Storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedOrders = localStorage.getItem("orders")
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
  }, [])

  // ✅ Save cart to Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // ✅ Save orders to Local Storage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addToCart = (meal: Meal) => {
    const exists = cart.find(item => item.id === meal.id)
    if (exists) {
      setCart(
        cart.map(item =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...meal, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const increaseQty = (id: number) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQty = (id: number) => {
    setCart(
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert("Please fill in all details")
      return
    }
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      total: totalAmount,
      customerName: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      timestamp: new Date().toLocaleString()
    }
    
    setOrders([newOrder, ...orders])
    setCart([])
    setShowCheckout(false)
    setCustomerInfo({ name: "", email: "", phone: "", address: "" })
    alert(`Order placed successfully! Order ID: ${newOrder.id}`)
  }

  const categories = Array.from(new Set(meals.map(m => m.category)))
  
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>TastyBites Restaurant</h1>
            <p>Order your favorite meals online</p>
          </div>
          <img src="/logo.png" alt="TastyBites Logo" className="header-logo" />
        </div>
      </header>

      <main className="main-content">
        {/* MENU SECTION */}
        <section className="menu-section">
          <h2>📋 Our Menu</h2>
          {categories.map(category => (
            <div key={category} className="category">
              <h3 className="category-title">{category}</h3>
              <div className="meals-grid">
                {meals
                  .filter(m => m.category === category)
                  .map(meal => (
                    <div key={meal.id} className="meal-card">
                      <div className="meal-image">{meal.image}</div>
                      <h4 className="meal-name">{meal.name}</h4>
                      <p className="meal-description">{meal.description}</p>
                      <div className="meal-footer">
                        <span className="meal-price">₹{meal.price}</span>
                        <button 
                          className="btn btn-add"
                          onClick={() => addToCart(meal)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>

        {/* CART SIDEBAR */}
        <aside className="cart-sidebar">
          <h2>🛒 Your Cart</h2>
          
          {cart.length === 0 ? (
            <p className="empty-cart">No items in cart</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price} × {item.quantity}</p>
                      <p className="item-subtotal">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => decreaseQty(item.id)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                      <button 
                        className="btn-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span>₹50</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{totalAmount + 50}</span>
                </div>
              </div>

              <button 
                className="btn btn-checkout"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </>
          )}

          {/* PAST ORDERS */}
          {orders.length > 0 && (
            <div className="past-orders">
              <h3>📦 Past Orders</h3>
              <div className="orders-list">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="order-item">
                    <p className="order-id">{order.id}</p>
                    <p className="order-total">₹{order.total}</p>
                    <p className="order-time">{order.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </main>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Checkout</h2>
            <form onSubmit={handleCheckout}>
              <input
                type="text"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={customerInfo.email}
                onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerInfo.phone}
                onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                required
              />
              <textarea
                placeholder="Delivery Address"
                value={customerInfo.address}
                onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                required
              ></textarea>

              <div className="checkout-summary">
                <h3>Order Summary</h3>
                {cart.map(item => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="checkout-total">
                  <strong>Total: ₹{totalAmount + 50}</strong>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-cancel"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-place-order"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
