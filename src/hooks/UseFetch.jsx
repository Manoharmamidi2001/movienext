import axios from 'axios'
import { useEffect, useState } from 'react'

const UseFetch = (endpoint) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
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
    const timer = setTimeout(() => {
      fetchData()
    }, 100); // 100ms delay
    return () => clearTimeout(timer);
  }, [endpoint])

  return { data, loading }
}

export default UseFetch
