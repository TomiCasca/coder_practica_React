import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ItemDetail from './ItemDetail'
import ItemDetailSkeleton from './ItemDetailSkeleton'
import NotFound from './NotFound'

function ItemDetailContainer () {
  const { id } = useParams()
  const [data, setData] = useState({ id: null, item: null })

  const loading = data.id !== id

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado')
        return res.json()
      })
      .then(item => setData({ id, item }))
      .catch(err => {
        console.error(err)
        setData({ id, item: null })
      })
  }, [id])

  if (loading) return <ItemDetailSkeleton />
  if (!data.item) return <NotFound />

  return <ItemDetail item={data.item} />
}

export default ItemDetailContainer