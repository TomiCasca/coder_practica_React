import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ItemList from './ItemList'
import ItemListSkeleton from './ItemListSkeleton'

function ItemListContainer () {
  const { category } = useParams()
  const currentKey = category ?? 'all'

  const [data, setData] = useState({ key: null, items: [] })

  const loading = data.key !== currentKey

  useEffect(() => {
    const url = category
      ? `https://dummyjson.com/products/category/${category}`
      : 'https://dummyjson.com/products?limit=20'

    fetch(url)
      .then(res => res.json())
      .then(json => setData({ key: currentKey, items: json.products }))
      .catch(err => {
        console.error(err)
        setData({ key: currentKey, items: [] })
      })
  }, [category, currentKey])

  if (loading) return <ItemListSkeleton />

  return (
    <>
      <h1 className='text-2xl px-5 mt-5 lg:px-10 capitalize'>
        {category ? category.replace('-', ' ') : 'Todos los productos'}
      </h1>
      <ItemList items={data.items} />
    </>
  )
}

export default ItemListContainer