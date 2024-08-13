import React, { useRef, useState } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemWidth = 200;
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const scrollRight = () => {
    if (carouselRef.current) {
      const firstItem = carouselRef.current.firstElementChild as HTMLElement;
      if (firstItem) {
        setButtonEnabled(false);
        const scrollAmount = itemWidth;
        const scrollPosition = scrollAmount;
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });

        setTimeout(() => {
          if (carouselRef.current) {
            setButtonEnabled(true);
            carouselRef.current.appendChild(firstItem);
            carouselRef.current.scrollTo({
              left: 0,
              behavior: 'smooth',
            });
          }
        }, 200);
      }
    }
  };

  return (
    <div className={`relative mt-4 ${className}`}>
      <button
        onClick={scrollRight}
        className={`absolute right-2 top-0 transform text-sm -translate-y-1/2 text-wallet_orange underline
          text-bold mx-2 z-10 ${buttonEnabled ? '': 'cursor-not-allowed'}`}
        disabled={!buttonEnabled}
      >
        Next &gt;
      </button>
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden whitespace-nowrap scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
