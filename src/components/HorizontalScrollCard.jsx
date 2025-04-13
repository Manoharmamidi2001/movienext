import React, { useRef } from 'react';
import Card from './Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const HorizontalScrollCards = ({ data, heading }) => {
  const scrollRef = useRef(null);

  const handlePrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative'>
      <div className='container my-10 px-16'>
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
            className='grid grid-cols-[repeat(auto-fit,250px)] gap-8 grid-flow-col overflow-x-scroll scrollbar-hide'
          >
            {data.map((item, index) => (
              <Card
                data={item}
                index={index + 1}
                key={`${item.id}${heading}${index}`}
                trending={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCards;