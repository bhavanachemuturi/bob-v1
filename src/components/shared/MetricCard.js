import React from 'react';
import Card from './Card';
import './MetricCard.css';

/**
 * MetricCard Component
 * Displays a single metric with value, trend, and visual indicator
 */
const MetricCard = ({ 
  label, 
  value, 
  unit = '', 
  trend = null,
  trendLabel = '',
  status = 'idle',
  icon = null
}) => {
  const getTrendClass = () => {
    if (!trend) return '';
    return trend > 0 ? 'metric__trend--positive' : 'metric__trend--negative';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? '↑' : '↓';
  };

  return (
    <Card className="metric-card" status={status}>
      <div className="metric">
        {icon && <div className="metric__icon">{icon}</div>}
        <div className="metric__content">
          <div className="metric__label">{label}</div>
          <div className="metric__value">
            {value}
            {unit && <span className="metric__unit">{unit}</span>}
          </div>
          {trend !== null && (
            <div className={`metric__trend ${getTrendClass()}`}>
              <span className="metric__trend-icon">{getTrendIcon()}</span>
              <span className="metric__trend-value">{Math.abs(trend)}%</span>
              {trendLabel && <span className="metric__trend-label">{trendLabel}</span>}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;

// Made with Bob
