'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpToLine, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ScrollWidget = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
        setIsAtBottom(window.innerHeight + window.scrollY >= document.body.offsetHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollUp = () => {
    window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
  };

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="fixed lg:bottom-[38vh] bottom-[60px] right-4 flex flex-col space-y-2 z-50">
      {!isAtTop && (
        <>
          <button
            onClick={scrollToTop}
            className="p-2 bg-gray-700/70 text-white rounded-full h-[40px] w-[40px]"
            title="Scroll to Top"
          >
            {/* Add your icon here */}
            <FontAwesomeIcon icon={faArrowsUpToLine} />
          </button>
          <button
            onClick={scrollUp}
            className="p-2 bg-gray-700/70 text-white rounded-full h-[40px] w-[40px]"
            title="Scroll Up"
          >
            {/* Add your icon here */}
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </>
      )}
        {!isAtBottom && (
            <button
            onClick={scrollDown}
            className="p-2 bg-gray-700/70 text-white rounded-full h-[40px] w-[40px]"
            title="Scroll Down"
            >
            {/* Add your icon here */}
            <FontAwesomeIcon icon={faChevronDown} />
            </button>
        )}
          </div>
  );
};

export default ScrollWidget;
