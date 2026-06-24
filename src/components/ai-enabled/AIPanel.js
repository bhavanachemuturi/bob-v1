import React, { useState } from 'react';
import Card from '../shared/Card';
import { mcpClient } from '../../services/mcpClient';
import { AIFeatureType } from '../../types';
import './AIPanel.css';

/**
 * AIPanel Component
 * Interactive panel for AI assistant/copilot features
 * Includes input, conversation history, and usage tracking
 */
const AIPanel = ({ 
  title = "AI Assistant",
  featureType = AIFeatureType.ASSISTANT,
  placeholder = "Ask a question...",
  showUsageStats = true
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalRequests: 0,
    totalTokens: 0,
    cacheHits: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await mcpClient.callAIFeature(featureType, {
        query: input,
        context: messages.slice(-5) // Last 5 messages for context
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.content,
        timestamp: result.timestamp,
        cached: result.cached,
        tokens: result.tokens
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update session stats
      setSessionStats(prev => ({
        totalRequests: prev.totalRequests + 1,
        totalTokens: prev.totalTokens + result.tokens,
        cacheHits: prev.cacheHits + (result.cached ? 1 : 0)
      }));

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: `Error: ${error.message}`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setSessionStats({
      totalRequests: 0,
      totalTokens: 0,
      cacheHits: 0
    });
  };

  const actions = messages.length > 0 ? (
    <button className="ai-panel__clear-btn" onClick={handleClear}>
      Clear
    </button>
  ) : null;

  return (
    <Card title={title} actions={actions} className="ai-panel">
      <div className="ai-panel__messages">
        {messages.length === 0 ? (
          <div className="ai-panel__empty">
            <span className="ai-panel__empty-icon">💬</span>
            <p>Start a conversation with the AI assistant</p>
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id} 
              className={`ai-panel__message ai-panel__message--${message.role}`}
            >
              <div className="ai-panel__message-header">
                <span className="ai-panel__message-role">
                  {message.role === 'user' ? '👤 You' : '🤖 AI'}
                </span>
                {message.cached && (
                  <span className="ai-panel__message-badge">⚡ Cached</span>
                )}
              </div>
              <div className="ai-panel__message-content">
                {message.content}
              </div>
              {message.tokens > 0 && (
                <div className="ai-panel__message-meta">
                  {message.tokens} tokens
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="ai-panel__message ai-panel__message--assistant">
            <div className="ai-panel__message-header">
              <span className="ai-panel__message-role">🤖 AI</span>
            </div>
            <div className="ai-panel__loading">
              <span className="ai-panel__loading-dot"></span>
              <span className="ai-panel__loading-dot"></span>
              <span className="ai-panel__loading-dot"></span>
            </div>
          </div>
        )}
      </div>

      {showUsageStats && sessionStats.totalRequests > 0 && (
        <div className="ai-panel__stats">
          <div className="ai-panel__stat">
            <span className="ai-panel__stat-label">Requests:</span>
            <span className="ai-panel__stat-value">{sessionStats.totalRequests}</span>
          </div>
          <div className="ai-panel__stat">
            <span className="ai-panel__stat-label">Tokens:</span>
            <span className="ai-panel__stat-value">{sessionStats.totalTokens}</span>
          </div>
          <div className="ai-panel__stat">
            <span className="ai-panel__stat-label">Cache Hits:</span>
            <span className="ai-panel__stat-value">
              {sessionStats.cacheHits} ({sessionStats.totalRequests > 0 
                ? Math.round((sessionStats.cacheHits / sessionStats.totalRequests) * 100) 
                : 0}%)
            </span>
          </div>
        </div>
      )}

      <form className="ai-panel__input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="ai-panel__input"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="ai-panel__submit-btn"
          disabled={!input.trim() || isLoading}
        >
          Send
        </button>
      </form>
    </Card>
  );
};

export default AIPanel;

// Made with Bob
