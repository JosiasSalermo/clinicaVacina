import React from 'react';
import "./LoadingSkeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className='loading-skeleton'>
      <div className="loading-skeleton-block"></div>
      <div className="loading-skeleton-block"></div>
      <div className="loading-skeleton-block"></div>
    </div>
  );
};

export default LoadingSkeleton;