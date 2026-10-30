import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { History, Play, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';

export default function RecentActivityWidget() {
  const { meetings } = useApp();
  const navigate = useNavigate();

  const previousMeetings = meetings.filter((m) => m.type === 'previous').slice(0, 3);

  return (
    <div className="rounded-2xl bg-[#151F2D] border border-white/5 p-5 flex flex-col justify-between shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#F8FAFC]">Recent Meeting Activity</h2>
            <p className="text-[11px] text-[#94A3B8]">Concluded sessions & summaries</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/history')}
          className="text-xs font-semibold text-[#A3E635] hover:text-[#BEF264] flex items-center gap-1 transition-colors"
        >
          View all history
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {previousMeetings.map((m) => (
          <div
            key={m.id}
            className="p-3 rounded-xl bg-[#101722]/60 border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-3"
          >
            <div className="space-y-1 truncate">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <span className="text-xs font-semibold text-[#F8FAFC] truncate">
                  {m.title}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#94A3B8]">
                <span>Host: {m.host?.name}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  {m.date} ({m.duration})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {m.recordingAvailable && (
                <button
                  onClick={() => navigate('/recordings')}
                  className="p-1.5 rounded-lg bg-[#A3E635]/10 text-[#A3E635] hover:bg-[#A3E635]/20 transition-colors"
                  title="Watch Recording"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              )}
              <button
                onClick={() => navigate('/history')}
                className="px-2.5 py-1 rounded-lg bg-[#1C2939] hover:bg-[#243447] text-[#94A3B8] hover:text-[#F8FAFC] text-[11px] font-medium border border-white/5"
              >
                Log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

