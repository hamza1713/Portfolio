import { useState } from "react";
import {
  ARCHITECTURES,
  MODELS,
  calculateArchitectureROI,
  type ArchitectureKey,
  type ModelKey,
} from "@shared/estimator";
import {
  ArrowRight,
  Calculator,
  Cpu,
  Database,
  Gauge,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

export function AIEstimator() {
  const [architecture, setArchitecture] = useState<ArchitectureKey>("rag");
  const [model, setModel] = useState<ModelKey>("gemini-flash");
  const [monthlyQueries, setMonthlyQueries] = useState<number>(25_000);
  const [cacheHitPercent, setCacheHitPercent] = useState<number>(35);

  const result = calculateArchitectureROI({
    architecture,
    model,
    monthlyQueries,
    cacheHitPercent,
  });

  const selectedArch = ARCHITECTURES[architecture];
  const selectedModel = MODELS[model];

  return (
    <div className="ai-estimator" id="roi-estimator">
      <div className="estimator-header">
        <div className="estimator-title-group">
          <span className="status-tag">
            <Calculator size={14} className="text-primary" />
            <span>Interactive Architecture Estimator</span>
          </span>
          <h3>Token Economics, Latency & Storage Calculator</h3>
          <p className="estimator-subtitle">
            Model real-world infrastructure costs and latency trade-offs before deploying to production.
          </p>
        </div>
      </div>

      <div className="estimator-grid">
        {/* Left Column: Interactive Controls */}
        <div className="estimator-controls">
          {/* Architecture Selection */}
          <div className="control-group">
            <label className="control-label">
              <Layers size={15} /> Architecture Pattern
            </label>
            <div className="arch-selector">
              {(Object.keys(ARCHITECTURES) as ArchitectureKey[]).map(key => {
                const item = ARCHITECTURES[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setArchitecture(key)}
                    className={`arch-btn ${architecture === key ? "arch-btn--active" : ""}`}
                  >
                    <span className="arch-btn-title">{item.title}</span>
                    <span className="arch-btn-desc">{item.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selection */}
          <div className="control-group">
            <label htmlFor="model-select" className="control-label">
              <Cpu size={15} /> Foundation Model
            </label>
            <select
              id="model-select"
              value={model}
              onChange={e => setModel(e.target.value as ModelKey)}
              className="estimator-select"
            >
              {(Object.keys(MODELS) as ModelKey[]).map(key => {
                const m = MODELS[key];
                return (
                  <option key={key} value={key}>
                    {m.name} ({m.provider}) — ${m.inputPerMillion}/1M in · ${m.outputPerMillion}/1M out
                  </option>
                );
              })}
            </select>
          </div>

          {/* Monthly Queries Slider */}
          <div className="control-group">
            <div className="slider-header">
              <label htmlFor="queries-slider" className="control-label">
                <Gauge size={15} /> Expected Monthly Queries
              </label>
              <span className="slider-val">{monthlyQueries.toLocaleString()} / mo</span>
            </div>
            <input
              id="queries-slider"
              type="range"
              min="2000"
              max="200000"
              step="2000"
              value={monthlyQueries}
              onChange={e => setMonthlyQueries(Number(e.target.value))}
              className="estimator-range"
            />
            <div className="slider-ticks">
              <span>2k</span>
              <span>50k</span>
              <span>100k</span>
              <span>200k</span>
            </div>
          </div>

          {/* Semantic Cache Hit Rate */}
          <div className="control-group">
            <div className="slider-header">
              <label htmlFor="cache-slider" className="control-label">
                <Zap size={15} /> Semantic Caching Hit Rate
              </label>
              <span className="slider-val">{cacheHitPercent}%</span>
            </div>
            <input
              id="cache-slider"
              type="range"
              min="0"
              max="80"
              step="5"
              value={cacheHitPercent}
              onChange={e => setCacheHitPercent(Number(e.target.value))}
              className="estimator-range"
            />
            <p className="control-hint">
              Vector-based semantic caching intercepts recurring questions before reaching the foundation model.
            </p>
          </div>
        </div>

        {/* Right Column: Real-Time Results Matrix */}
        <div className="estimator-outputs">
          <div className="metric-card metric-card--hero">
            <span className="metric-eyebrow">Estimated Monthly LLM API Cost</span>
            <div className="metric-hero-val">
              ${result.effectiveCost.toFixed(2)}
              <span className="metric-unit">/ month</span>
            </div>
            {result.monthlySavings > 0 && (
              <div className="savings-badge">
                <Sparkles size={14} />
                <span>Saves ~${result.monthlySavings.toFixed(2)}/mo via semantic caching</span>
              </div>
            )}
          </div>

          <div className="outputs-grid">
            <div className="metric-card">
              <span className="metric-eyebrow">
                <Gauge size={14} /> P95 Latency Breakdown
              </span>
              <div className="metric-sub-val">{result.p95LatencyMs} ms</div>
              <div className="latency-bar">
                <div
                  className="latency-segment latency-retrieval"
                  style={{
                    width: `${(result.latencyBreakdown.retrievalMs / result.p95LatencyMs) * 100}%`,
                  }}
                  title={`Retrieval: ${result.latencyBreakdown.retrievalMs}ms`}
                />
                <div
                  className="latency-segment latency-ttft"
                  style={{
                    width: `${(result.latencyBreakdown.ttftMs / result.p95LatencyMs) * 100}%`,
                  }}
                  title={`TTFT: ${result.latencyBreakdown.ttftMs}ms`}
                />
                <div
                  className="latency-segment latency-gen"
                  style={{
                    width: `${(result.latencyBreakdown.generationMs / result.p95LatencyMs) * 100}%`,
                  }}
                  title={`Generation: ${result.latencyBreakdown.generationMs}ms`}
                />
              </div>
              <div className="latency-legend">
                <span>Retrieval ({result.latencyBreakdown.retrievalMs}ms)</span>
                <span>TTFT ({result.latencyBreakdown.ttftMs}ms)</span>
                <span>Gen ({result.latencyBreakdown.generationMs}ms)</span>
              </div>
              {cacheHitPercent > 0 && (
                <div className="cached-latency-note">
                  Cached query latency: <strong>~{result.cachedLatencyMs} ms</strong>
                </div>
              )}
            </div>

            <div className="metric-card">
              <span className="metric-eyebrow">
                <Database size={14} /> Vector DB Footprint
              </span>
              <div className="metric-sub-val">
                ~{result.estimatedStorageMb} MB
              </div>
              <p className="metric-foot-desc">
                Derived from {selectedArch.docsCount.toLocaleString()} baseline documents chunked with 768-dim embeddings.
              </p>
            </div>
          </div>

          <div className="metric-card token-throughput-card">
            <span className="metric-eyebrow">Monthly Token Volume</span>
            <div className="token-throughput-vals">
              <div>
                <span className="token-val">{result.inputTokensMillion}M</span>
                <span className="token-label">Input Context</span>
              </div>
              <div className="token-divider">/</div>
              <div>
                <span className="token-val">{result.outputTokensMillion}M</span>
                <span className="token-label">Generated Tokens</span>
              </div>
            </div>
          </div>

          <div className="estimator-cta">
            <a href="#contact" className="button button--primary estimator-cta-btn">
              Discuss This Architecture With Hamza <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
