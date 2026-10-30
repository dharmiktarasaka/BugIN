import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ReactionsOverlay({ floatingReactions, onAddReaction }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {floatingReactions.map((reaction) => (
        <div
          key={reaction.id}
          className="absolute bottom-24 text-3xl sm:text-4xl animate-bugin-float transition-all select-none"
          style={{
            left: `${reaction.x}%`,
            animation: 'buginFloatUp 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          {reaction.emoji}
        </div>
      ))}
      <style>{`
        @keyframes buginFloatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6);
          }
          50% {
            opacity: 1;
            transform: translateY(-160px) scale(1.3);
          }
          100% {
            opacity: 0;
            transform: translateY(-340px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

