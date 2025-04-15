import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const MAX_RECENT_SEARCHES = 5

const SearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [input, setInput] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Get query from URL
  const getQuery = () => {
    const rawQuery = location.search.slice(3)
    return decodeURIComponent(rawQuery).replace(/[^a-zA-Z0-9 ]/g, '')
  }

  const query = getQuery()

  // Fetch data from API
  const fetchData = async (pageNum = 1) => {
    if (!query || loading || !hasMore) return

    setLoading(true)
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query,
          page: pageNum,
        },
      })

      const results = response.data.results || []
      if (results.length === 0 || response.data.total_pages === pageNum) {
        setHasMore(false)
      }

      setData((prev) => [...prev, ...results])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle recent searches
  const updateRecentSearches = (newQuery) => {
    const stored = JSON.parse(localStorage.getItem('recentSearches')) || []
    const updated = [newQuery, ...stored.filter((item) => item !== newQuery)].slice(0, MAX_RECENT_SEARCHES)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
    setRecentSearches(updated)
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentSearches')) || []
    setRecentSearches(stored)
  }, [])

  // Reset and set state when URL changes
  useEffect(() => {
    setInput(query)
    setData([])
    setPage(1)
    setHasMore(true)

    if (query) {
      updateRecentSearches(query)
    }
  }, [location.search])

  useEffect(() => {
    fetchData(page)
  }, [page, query])

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1)
    }
  }, [loading, hasMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleInputChange = (e) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    setInput(cleanValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`)
    } else {
      navigate(`/`)
    }
  }

  const handleRecentClick = (value) => {
    navigate(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <div className='pt-20 px-5'>
      {/* Mobile Search Input */}
      <div className='lg:hidden sticky top-20 z-10 pb-4 bg-black bg-opacity-50 p-3 backdrop-blur-sm' style={{borderRadius:'10px'}}>
      <form className='lg:hidden mb-2' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Search...'
          value={input}
          onChange={handleInputChange}
          className='w-full px-4 py-2 border border-red-500 rounded-md focus:outline-none text-black'
        />
      </form>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className='lg:hidden mb-4'>
          <p className='text-sm text-black-400 mb-1'>Recent Searches:</p>
          <div className='flex flex-wrap gap-2'>
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleRecentClick(item)}
                className='px-3 py-1 bg-gray-200 rounded-md text-black hover:bg-gray-300 transition '
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>

      <h1 className='text-2xl font-bold mb-4'>
        Search Results for: <span className='text-blue-400'>" {query} "</span>
      </h1>

      {data.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {data.map((item, index) => (
            <Card key={`${item.id}-${index}`} data={item} index={index + 1} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className='text-center text-gray-500 mt-10'>No results found.</p>
        )
      )}

      {loading && (
        <p className='text-center text-blue-400 mt-10 font-semibold'>Loading more results...</p>
      )}
    </div>
  )
}

export default SearchPage
