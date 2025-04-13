import axios from 'axios'
import { useEffect, useState } from 'react'

const UseFetch = (endpoint) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async()=>{
        try {
            setLoading(true)
            const response = await axios.get(endpoint)
            setLoading(false)
            setData(response.data.results)
        } catch (error) {
          return error
        }
    }

    useEffect(()=>{
        fetchData()
    })

  return ({data, loading})
}

export default UseFetch
