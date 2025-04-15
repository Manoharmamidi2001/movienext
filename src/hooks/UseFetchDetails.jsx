import axios from 'axios'
import { useEffect, useState } from 'react'

const UseFetchDetails = (endpoint) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  const fetchData = async () => {
    if (!endpoint || endpoint.includes('undefined')) return; // Guard clause

    setLoading(true)
    try {
      const response = await axios.get(endpoint)
      const payload = response.data
      const mediaType = endpoint.includes('/tv') ? 'tv' : 'movie'
      setData({ ...payload, media_type: payload.media_type || mediaType })
    } catch (error) {
      console.error('Error fetching data:', error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [endpoint])


  return { data, loading }
}

export default UseFetchDetails
