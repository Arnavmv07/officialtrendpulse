import React from 'react';
import TrendCard from './TrendCard';

function SkeletonCard() {
  return (
    <div className="card p-5 space-y-4">
      <div className="skeleton w-full h-44 rounded-xl" />
      <div className="flex gap-2">
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="skeleton h-5 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-16 w-full rounded-xl" />
      <div className="skeleton h-10 w-full rounded-full" />
    </div>
  );
}

export default function TrendGrid({ trends, isLoading, onGenerateStrategy, onQuickSave, savedIds, onResetFilters }) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!trends.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 px-6">
        <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4"
          style={{ background: '#EEF0FF' }}>
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-extrabold mb-2" style={{ color: '#12112A' }}>
          No matching trends found
        </h3>
        <p className="text-sm mb-6 max-w-sm" style={{ color: '#7A788F' }}>
          Try adjusting your niche, platform, or search query to discover brewing topics.
        </p>
        <button onClick={onResetFilters} className="btn-brand">
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trends.map(trend => (
        <TrendCard
          key={trend.id}
          trend={trend}
          onGenerateStrategy={onGenerateStrategy}
          onQuickSave={onQuickSave}
          isSaved={savedIds?.has(trend.id) || savedIds?.has(trend.title)}
        />
      ))}
    </div>
  );
}
