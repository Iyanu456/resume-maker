import React, { useState, useEffect } from 'react';

const Carousel = ({ children }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    const touchEndX = event.touches[0].clientX;
    const touchDifference = touchEndX - touchStartX;
    if (touchDifference > 50) {
      prevSlide();
    } else if (touchDifference < -55) {
      nextSlide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevSlide, nextSlide]);

  return (
    <div
      className="relative w-[fit-content] p-[2em] border rounded-[20px] shadow-md grid place-items-center text-center"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(2.2px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="overflow-hidden">
        {React.Children.map(children, (child, index) => (
          <div
            className={`w-full h-auto ${
              index === currentSlideIndex ? 'block' : 'hidden'
            }`}
          >
            {child}
          </div>
        ))}
      </div>
      <div className='grid place-items-center gap-1 mt-5'>
        <button
          className=""
          onClick={prevSlide}
        >
            <img className='rotate-180' alt='Prev' src='/arrow-right-1.svg'/>
        
        </button>
        <button
          className=""
          onClick={nextSlide}
        >
            <img src='/arrow-right-1.svg' alt='Next'/>
        
        </button>
      </div>
    </div>
  );
};





export default function Test() {
    return( 
    <div className='w-screen h-screen m-auto grid place-items-center'
    style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQMwq_mZ2I9qpXPhmIeJ5on2jZTavrF65Kw&usqp=CAU)', backgroundSize: '600px', backgroundRepeat: 'repeat' }}>
    <Carousel>
        <div>
          <h2 className="text-xl font-bold mb-2">Card 1</h2>
          <p>This is the content of card 1.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Card 2</h2>
          <p>This is the content of card 2.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Card 3</h2>
          <p>This is the content of card 3.</p>
        </div>
      </Carousel>
      </div>)
}