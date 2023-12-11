import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import './LoadingOverlay.css';

function LoadingOverlay({ loading }) {
  return loading ? <div className="overlay">Carregando...</div> : null;
}

export default LoadingOverlay;