import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'

const formatPrice = (n) => `$${n.toFixed(2)}`

function Cart () {
const { cart, removeItem, updateQuantity, clear, totalPrice, totalQuantity } = useCart()
  const [showCheckoutMsg, setShowCheckoutMsg] = useState(false)

  // Carrito vacío
  if (cart.length === 0) {
    return (
      <div className='flex flex-col items-center gap-4 mt-20 px-5 text-center'>
        <h2 className='text-2xl font-semibold'>Tu carrito está vacío</h2>
        <p className='opacity-70'>Todavía no agregaste productos.</p>
        <Link to='/' className='btn btn-primary'>Ver productos</Link>
      </div>
    )
  }

  // Carrito con productos
  return (
    <div className='px-5 lg:px-10 mt-5 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-semibold mb-5'>Tu carrito</h1>

      <div className='overflow-x-auto bg-base-300 rounded-box'>
        <table className='table'>
          <thead>
            <tr>
              <th>Producto</th>
              <th className='text-center'>Cantidad</th>
              <th className='text-right'>Precio unitario</th>
              <th className='text-right'>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(prod => (
              <tr key={prod.id}>
                <td>
                  <div className='flex items-center gap-3'>
                    <img src={prod.thumbnail} alt={prod.title} className='w-12 h-12 rounded object-cover bg-base-100' />
                    <Link to={`/item/${prod.id}`} className='link link-hover font-medium'>
                      {prod.title}
                    </Link>
                  </div>
                </td>
                <td>
                  <div className='flex items-center justify-center gap-2'>
                    <button
                      className='btn btn-xs btn-square'
                      onClick={() => updateQuantity(prod.id, prod.quantity - 1)}
                      disabled={prod.quantity <= 1}
                      aria-label='Restar uno'
                    >
                      −
                    </button>
                    <span className='w-6 text-center'>{prod.quantity}</span>
                    <button
                      className='btn btn-xs btn-square'
                      onClick={() => updateQuantity(prod.id, prod.quantity + 1)}
                      disabled={prod.quantity >= prod.stock}
                      aria-label='Sumar uno'
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className='text-right'>{formatPrice(prod.price)}</td>
                <td className='text-right font-medium'>{formatPrice(prod.price * prod.quantity)}</td>
                <td className='text-right'>
                  <button
                    className='btn btn-ghost btn-sm text-error'
                    onClick={() => removeItem(prod.id)}
                    aria-label={`Eliminar ${prod.title}`}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6'>
        <button className='btn btn-outline btn-error' onClick={clear}>
          Vaciar carrito
        </button>

        <div className='flex flex-col items-end gap-2'>
          <p className='opacity-70'>{totalQuantity} {totalQuantity === 1 ? 'producto' : 'productos'}</p>
          <p className='text-2xl font-semibold'>
            Total: <span className='text-green-500'>{formatPrice(totalPrice)}</span>
          </p>
          <button className='btn btn-primary' onClick={() => setShowCheckoutMsg(true)}>
            Finalizar compra
          </button>
          {showCheckoutMsg && (
            <p className='text-sm opacity-70'>El checkout estará disponible en la próxima entrega.</p>
          )}
        </div>
      </div>

      <Link to='/' className='link link-hover inline-block mt-6'>← Seguir comprando</Link>
    </div>
  )
}

export default Cart