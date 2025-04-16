import axios from 'axios'
import { useEffect, useState } from 'react'

const UseFetch = (endpoint) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const UseFetch = async () => {
    try {
      setLoading(true)
      const response = await axios.get(endpoint)

      const mediaType = endpoint.includes('/tv') ? 'tv' : 'movie'

      // Add media_type manually
      const updatedResults = response.data.results.map(item => ({
        ...item,
        media_type: item.media_type || mediaType
      }))

      setData(updatedResults)
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  useEffect(() => {
    UseFetch()
    // Add endpoint to dependency array
  }, [endpoint])

  return { data, loading }
}

export default UseFetch
