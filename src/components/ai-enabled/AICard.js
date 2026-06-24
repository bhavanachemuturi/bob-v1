import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';
import { mcpClient } from '../../services/mcpClient';
import { ComponentStatus, AIFeatureType } from '../../types';
import './AICard.css';

/**
 * AICard Component
 * AI-enabled card that fetches and displays AI-generated content
 * Includes caching, loading states, and efficiency indicators
 */
const AICard = ({ 
  title,
  featureType = AIFeatureType.SUMMARY,
  params = {},
  showEfficiency = true,
  onContentGenerated = null
}) => {
  const [status, setStatus] = useState(ComponentStatus.IDLE);
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    generateContent();
  }, [featureType, JSON.stringify(params)]);

  const generateContent = async () => {
    setStatus(ComponentStatus.LOADING);
    setError(null);

    try {
      const result = await mcpClient.callAIFeature(featureType, params);
      
      setContent(result.content);
      setMetadata({
        cached: result.cached,
        tokens: result.tokens,
        responseTime: result.responseTime
      });
      setStatus(result.cached ? ComponentStatus.CACHED : ComponentStatus.SUCCESS);

      if (onContentGenerated) {
        onContentGenerated(result);
      }
    } catch (err) {
      setError(err.message);
      setStatus(ComponentStatus.ERROR);
    }
  };

  const handleRefresh = () => {
    generateContent();
  };

  const renderEfficiencyBadge = () => {
    if (!showEfficiency || !metadata) return null;

    return (
      <div className="ai-card__efficiency">
        {metadata.cached && (
          <span className="ai-card__badge ai-card__badge--cached">
            ⚡ Cached
          </span>
        )}
        <span className="ai-card__badge ai-card__badge--tokens">
          {metadata.tokens} tokens
        </span>
        <span className="ai-card__badge ai-card__badge--time">
          {Math.round(metadata.responseTime)}ms
        </span>
      </div>
    );
  };

  const actions = (
    <button 
      className="ai-card__refresh-btn"
      onClick={handleRefresh}
      disabled={status === ComponentStatus.LOADING}
    >
      ↻ Refresh
    </button>
  );

  return (
    <Card 
      title={title}
      subtitle={`AI ${featureType}`}
      status={status}
      actions={actions}
      className="ai-card"
    >
      {status === ComponentStatus.ERROR && (
        <div className="ai-card__error">
          <span className="ai-card__error-icon">⚠️</span>
          <span className="ai-card__error-message">{error}</span>
        </div>
      )}
      
      {status === ComponentStatus.LOADING && (
        <div className="ai-card__loading">
          <div className="ai-card__loading-spinner"></div>
          <span>Generating AI content...</span>
        </div>
      )}

      {(status === ComponentStatus.SUCCESS || status === ComponentStatus.CACHED) && (
        <>
          <div className="ai-card__content">
            {content}
          </div>
          {renderEfficiencyBadge()}
        </>
      )}
    </Card>
  );
};

export default AICard;

// Made with Bob
