import React from 'react';
import './Card.css';

/**
 * Card Component
 * Reusable card container following Carbon Design System patterns
 */
const Card = ({ 
  title, 
  subtitle, 
  children, 
  status = 'idle',
  actions,
  className = ''
}) => {
  const statusClass = status ? `card--${status}` : '';
  
  return (
    <div className={`card ${statusClass} ${className}`}>
      {(title || subtitle || actions) && (
        <div className="card__header">
          <div className="card__header-content">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card__actions">{actions}</div>}
        </div>
      )}
      <div className="card__body">
        {children}
      </div>
    </div>
  );
};

export default Card;

// Made with Bob
