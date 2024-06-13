import React, { useState, useEffect } from 'react';
// import './BackToTopButton.css'; // Import your component's CSS file

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add scroll event listener to check scroll position
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const halfwayPoint = document.documentElement.scrollHeight / 2;
      setIsVisible(scrollTop > halfwayPoint); // Set visibility based on scroll position
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth scrolling behavior
    });
  };

  return (
    <button
      className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      Back to Top
    </button>
  );
};

export default BackToTopButton;
