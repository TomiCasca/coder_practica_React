import { createContext, useState, useEffect } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null)

export function CartProvider ({ children }) {
  // Al iniciar, intenta leer el carrito guardado; si no hay o está roto, arranca vacío
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? []
    } catch {
      return []
    }
  })

  // Cada vez que cambia el carrito, lo guarda
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const isInCart = (id) => cart.some(prod => prod.id === id)

  const addItem = (item, quantity) => {
    setCart(prev => {
      const exists = prev.some(prod => prod.id === item.id)

      if (exists) {
        return prev.map(prod =>
          prod.id === item.id
            ? { ...prod, quantity: Math.min(prod.quantity + quantity, prod.stock) }
            : prod
        )
      }

      const newItem = {
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        stock: item.stock,
        quantity
      }

      return [...prev, newItem]
    })
  }

  // Eliminar un producto por id
  const removeItem = (itemId) => {
    setCart(prev => prev.filter(prod => prod.id !== itemId))
  }

    // Cambiar la cantidad de un producto (entre 1 y su stock)
  const updateQuantity = (itemId, quantity) => {
    setCart(prev =>
      prev.map(prod =>
        prod.id === itemId
          ? { ...prod, quantity: Math.max(1, Math.min(quantity, prod.stock)) }
          : prod
      )
    )
  }

  // Vaciar el carrito
  const clear = () => setCart([])

  // Valores calculados (estado derivado, no hace falta guardarlos)
  const totalQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0)
  const totalPrice = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    isInCart,
    totalQuantity,
    totalPrice
  }
  return (
    <CartContext value={value}>
      {children}
    </CartContext>
  )
}