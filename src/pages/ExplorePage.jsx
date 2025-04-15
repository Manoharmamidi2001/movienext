import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [maxPageNo, setMaxPageNo] = useState()

  // ✅ Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: { page: pageNo }
      })
      setData(prev =>
        pageNo === 1 ? response.data.results : [...prev, ...response.data.results]
      )
      setMaxPageNo(response.data.total_pages)
    } catch (error) {
      console.log(error)
    }
  }

  // ✅ Refetch when pageNo or explore type changes
  useEffect(() => {
    fetchData()
  }, [pageNo, params.explore])

  // ✅ Reset on explore type change
  useEffect(() => {
    setData([])
    setPageNo(1)
  }, [params.explore])

  // ✅ Scroll event to trigger next page
  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      setPageNo(prev => {
        if (prev < maxPageNo) return prev + 1
        return prev
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [maxPageNo])

  return (
    <>
    <div className='flex flex-col pt-16'>
      <h1 className='text-3xl p-3 font-bold'>Popular {params.explore} shows</h1>
      <div className="flex flex-wrap justify-center gap-10">
        {data.map((item, index) => (
          <Card key={index} data={item} index={index} media_type={params.explore} className={`hover:scale-105 hover:shadow-2xl hover:brightness-110 transition-all`}/>
        ))}
      </div>
    </div>
    </>
  )
}

export default ExplorePage
