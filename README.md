# Carbon AI Design System - Developer Dashboard

## System Concept

A lightweight framework that integrates AI capabilities into Carbon Design System components while promoting efficient usage through monitoring, caching, and intelligent request management.
<img width="1920" height="1080" alt="Screenshot 2026-06-24 at 11 56 08 AM" src="https://github.com/user-attachments/assets/cf8c1971-b5d4-4c05-b7e7-01f0ad2b4ad8" />

## Core Principles

1. **Component Standardization**: Pre-built AI-enabled components following Carbon Design System patterns
2. **Efficiency First**: Built-in caching, request deduplication, and usage monitoring
3. **Developer Experience**: Simple APIs with sensible defaults and clear feedback
4. **Observability**: Real-time metrics and efficiency signals surfaced in the UI

## Architecture

### AI-Enabled Component Library
- `AICard`: Displays AI-generated summaries with loading states and error handling
- `AIPanel`: Container for AI-powered features with usage tracking
- `MetricsDisplay`: Shows efficiency signals (cache hits, token usage, response times)
- `AIAssistant`: Embedded copilot interface with context awareness

### Efficiency Layer (MCP Integration)
- **Request Manager**: Deduplicates identical requests, implements exponential backoff
- **Cache Service**: Stores responses with TTL, invalidation strategies
- **Usage Tracker**: Monitors API calls, tokens, costs per component/feature
- **MCP Server**: Provides shared services for AI operations, caching, and analytics

### Dashboard Features
- Real-time usage metrics
- Component-level efficiency scores
- Cache hit rates and savings
- Token consumption trends
- Error rate monitoring

## Technology Stack

- React 18+ (functional components, hooks)
- TypeScript for type safety
- Carbon Design System components
- MCP for shared services integration

## Getting Started

```bash
npm install
npm start
```

## Project Structure

```
/src
  /components
    /ai-enabled      # AI-powered components
    /dashboard       # Dashboard-specific components
    /shared          # Reusable UI components
  /services
    /mcp             # MCP client integration
    /cache           # Caching layer
    /metrics         # Usage tracking
  /hooks             # Custom React hooks
  /types             # TypeScript definitions
```

## Key Design Decisions

1. **Functional Components**: Modern React patterns, better performance
2. **Composition over Configuration**: Flexible component APIs
3. **Progressive Enhancement**: AI features degrade gracefully
4. **Metrics-Driven**: Every AI interaction tracked for optimization
5. **MCP Integration**: Centralized AI services reduce duplication

## Scaling Considerations

- Component library can grow independently
- MCP servers can be distributed across teams
- Metrics aggregation supports multi-tenant scenarios
- Cache strategies configurable per component type
