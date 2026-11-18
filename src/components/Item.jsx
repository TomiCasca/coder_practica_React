import { useNavigate } from 'react-router'

function Item ({ item }) {
  const navigate = useNavigate()

  return (
    <div className="card bg-base-300 shadow-sm">
      <figure>
        <img src={item.thumbnail} alt={item.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p className="text-green-500 font-medium">${item.price}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-block btn-primary"
            onClick={() => navigate(`/item/${item.id}`)}
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item