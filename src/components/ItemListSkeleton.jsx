function ItemListSkeleton () {
  return (
    <div className='mt-5 grid grid-cols-1 px-5 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:px-10'>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="skeleton h-96 w-full" />
      ))}
    </div>
  )
}

export default ItemListSkeleton