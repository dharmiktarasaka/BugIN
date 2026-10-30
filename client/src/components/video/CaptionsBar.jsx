import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function CaptionsBar({ isEnabled }) {
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);

  const mockCaptions = [
    { speaker: 'Sophia Chen', text: '“The real-time map sync allows remote teams to feel physically co-present.”' },
    { speaker: 'Marcus Vance', text: '“Latency is under 15ms across all California nodes.”' },
    { speaker: 'Alex Morgan', text: '“Let’s review the split radar HUD layout before opening the floor.”' },
    { speaker: 'Elena Rostova', text: '“All customer advisory members are ready for tomorrow’s walkthrough.”' },
  ];

  useEffect(() => {
    if (!isEnabled) return;
    const interval = setInterval(() => {
      setCurrentCaptionIndex((prev) => (prev + 1) % mockCaptions.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isEnabled]);

  if (!isEnabled) return null;

  const current = mockCaptions[currentCaptionIndex];

  return (
    <div className="absolute bottom-24 inset-x-4 max-w-2xl mx-auto z-20 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 text-center shadow-2xl flex items-center justify-center gap-2.5">
        <Sparkles className="w-4 h-4 text-[#A3E635] shrink-0" />
        <span className="text-xs text-[#A3E635] font-semibold">{current.speaker}:</span>
        <span className="text-xs text-[#F8FAFC] font-medium">{current.text}</span>
      </div>
    </div>
  );
}

