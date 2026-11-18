function ItemDetailSkeleton () {
  return (
    <div className='px-5 grid md:grid-cols-2 gap-5 mt-5'>
      <div className='skeleton w-full h-96' />
      <div className='flex flex-col gap-5'>
        <div className='skeleton w-60 h-6' />
        <div className='skeleton w-24 h-6' />
        <div className='skeleton w-full h-24' />
        <div className='skeleton w-full h-32' />
      </div>
    </div>
  )
}

export default ItemDetailSkeleton