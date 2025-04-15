import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UseFetchDetails from '../hooks/UseFetchDetails'

const DetailPage = () => {
  const { explore, id } = useParams()
  const imageUrl = useSelector(state => state.movieData.imageURL)

  // Only fetch when both params are available
  const detailsEndpoint = explore && id ? `/${explore}/${id}` : null
  const creditsEndpoint = explore && id ? `/${explore}/${id}/credits` : null

  const { data } = UseFetchDetails(detailsEndpoint)
  const { data: castData } = UseFetchDetails(creditsEndpoint)

  console.log('Details:', data)
  console.log('Cast:', castData)

  if (!data) return <p className="text-center pt-20">Loading...</p>

  return (
    <div className="pt-20 px-4 text-white">
      <div className="max-w-sm mx-auto">
        <img
          src={data.poster_path ? `${imageUrl}/${data.poster_path}` : '/fallback.jpg'}
          alt={data.title || data.name}
          className="rounded-xl shadow-lg"
        />
        <h1 className="text-xl mt-4 font-bold text-center">
          {data.title || data.name}
        </h1>
      </div>
    </div>
  )
}

export default DetailPage
