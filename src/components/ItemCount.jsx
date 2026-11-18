import { useState } from 'react'

function ItemCount ({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial)

  const increase = () => setCount(prev => prev + 1)
  const decrease = () => setCount(prev => prev - 1)

  if (stock === 0) {
    return <p className='text-error font-medium'>Sin stock</p>
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-4'>
        <button className='btn btn-square' onClick={decrease} disabled={count <= 1}>−</button>
        <span className='text-xl font-medium w-8 text-center'>{count}</span>
        <button className='btn btn-square' onClick={increase} disabled={count >= stock}>+</button>
        <span className='text-sm opacity-60'>Stock: {stock}</span>
      </div>
<button
  className='btn btn-primary'
  onClick={() => {
    onAdd(count)
    setCount(1)
  }}
>
  Agregar al carrito
</button>
    </div>
  )
}

export default ItemCount