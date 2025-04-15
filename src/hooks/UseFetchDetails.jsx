import axios from 'axios'
import { useEffect, useState } from 'react'

const UseFetchDetails = (endpoint) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(endpoint)

      // Determine media type for consistency (optional)
      const mediaType = endpoint.includes('/tv') ? 'tv' : 'movie'
      const payload = response.data

      // If response is an array of results, add media_type to each
      if (Array.isArray(payload.results)) {
        const updatedResults = payload.results.map(item => ({
          ...item,
          media_type: item.media_type || mediaType
        }))
        setData(updatedResults)
      } else {
        // If response is a single object
        setData({
          ...payload,
          media_type: payload.media_type || mediaType
        })
      }

    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (endpoint) {
      fetchData()
    }
  }, [endpoint])

  return { data, loading }
}

export default UseFetchDetails
