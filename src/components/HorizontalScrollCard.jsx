import React, { useRef } from 'react';
import Card from './Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const HorizontalScrollCards = ({ data, heading, trending }) => {
  const scrollRef = useRef(null);

  const handlePrevious = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft === 0) {
        // Scroll to end
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: 'smooth'
        });
      } else {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10; // buffer

      if (isAtEnd) {
        // Scroll to start
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };
  return (
    <div className='relative overflow-x-hidden'>
    <div className='container my-4 px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-hidden'>
    <h2 className='text-xl lg:text-2xl font-bold mb-2'>{heading || 'Trending Shows'}</h2>
        <div className='relative'>
          {/* Arrows */}
          <button
            onClick={handlePrevious}
            className='hidden md:flex items-center justify-center absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full text-xl z-10 text-black opacity-70 hover:opacity-100 shadow-md'
            >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className='hidden md:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full text-xl z-10 text-black opacity-70 hover:opacity-100 shadow-md'
            >
            <FaAngleRight />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className='flex gap-6 overflow-x-auto scroll-smooth pb-2 hide-scrollbar'
          >
            {data.map((item, index) => (
              <Card
                data={item}
                index={index + 1}
                key={`${item.id}${heading}${index}`}
                trending={trending}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCards;