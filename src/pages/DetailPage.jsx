import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import UseFetchDetails from '../hooks/UseFetchDetails'

const DetailPage = () => {
  const { explore, id } = useParams()
  const baseURL = useSelector(state => state.movieData.imageURL)

  const { data, loading } = UseFetchDetails(`/${explore}/${id}`)
  const { data: castData, loading: castLoading } = UseFetchDetails(`/${explore}/${id}/credits`)

  if (loading) return <p className="text-center pt-20 text-lg">Loading details...</p>
  if (!data) return <p className="text-center pt-20 text-lg text-red-500">No data found.</p>

  return (
    <div className="pt-20 px-4 text-white">
      {/* Backdrop Image */}
      <div className="relative w-full max-h-[500px] overflow-hidden rounded-xl shadow-lg mb-6">
        <img
          src={data.backdrop_path ? `${baseURL}${data.backdrop_path}` : '/fallback.jpg'}
          alt={data.title || data.name}
          className="w-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
          <h1 className="text-3xl font-bold">
            {data.original_title || data.original_name}
          </h1>
          <p className="text-gray-300">{data.tagline}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-300 leading-relaxed">{data.overview}</p>
      </div>

      {/* Cast (Optional) */}
      {castData?.cast?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Cast</h2>
          <div className="flex flex-wrap gap-4">
            {castData.cast.slice(0, 10).map((actor) => (
              <div key={actor.id} className="w-24 text-center">
                <img
                  src={
                    actor.profile_path
                      ? `${baseURL}${actor.profile_path}`
                      : 'https://via.placeholder.com/100x150?text=No+Image'
                  }
                  alt={actor.name}
                  className="w-full h-[150px] object-cover rounded"
                />
                <p className="text-sm mt-1">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailPage
