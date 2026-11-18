import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import ItemCount from './ItemCount'

function ItemDetail ({ item }) {
  const { addItem, isInCart, cart } = useCart()
  const [toast, setToast] = useState(null)
  const timeoutRef = useRef(null)

  const inCartQty = isInCart(item.id)
    ? cart.find(prod => prod.id === item.id).quantity
    : 0

  const handleAdd = (quantity) => {
    addItem(item, quantity)

    setToast(`Agregaste ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} al carrito`)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className='px-5 grid md:grid-cols-2 gap-8 mt-5 lg:px-10'>
      <img src={item.thumbnail} alt={item.title} className='w-full bg-base-300 rounded-box' />
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-semibold'>{item.title}</h1>
        <p className='text-green-500 font-medium text-2xl'>${item.price}</p>
        <p className='opacity-80'>{item.description}</p>

        <ItemCount stock={item.stock - inCartQty} onAdd={handleAdd} />

        {inCartQty > 0 && (
          <p className='text-sm opacity-70'>
            Ya tenés {inCartQty} en el carrito · <Link to='/cart' className='link'>Ver carrito</Link>
          </p>
        )}
      </div>

      {toast && (
        <div className='toast toast-end'>
          <div className='alert alert-success'>{toast}</div>
        </div>
      )}
    </div>
  )
}

export default ItemDetail