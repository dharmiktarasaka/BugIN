import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Video, PlusCircle, MapPin, Sparkles, Radio } from 'lucide-react';

export default function HeroBanner() {
  const { currentUser, startInstantMeeting } = useApp();
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#101722] via-[#151F2D] to-[#1C2939] border border-white/10 p-6 md:p-8 shadow-2xl">
      {/* Ambient background glow & radar effect */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2939] border border-white/10 text-xs text-[#A3E635] font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#A3E635]" />
            <span>Spatial Telepresence v2.0 Active</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Connect anywhere.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#BEF264]">
              Meet everywhere.
            </span>
          </h1>

          <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed">
            Bring your conversations, teams, and real-time geographical locations together with bugIN.
            Video collaboration with live interactive radar.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <button
            onClick={() => {
              const id = startInstantMeeting();
              navigate(`/meeting/${id}`);
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#A3E635]/25 hover:shadow-xl hover:shadow-[#A3E635]/30 cursor-pointer active:scale-95"
          >
            <Video className="w-4 h-4" />
            <span>New Meeting</span>
          </button>

          <button
            onClick={() => navigate('/join')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] font-semibold text-xs sm:text-sm border border-white/10 transition-all hover:border-white/20 cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#A3E635]" />
            <span>Join Meeting</span>
          </button>

          <button
            onClick={() => navigate('/map')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#151F2D] hover:bg-[#1C2939] text-[#A3E635] font-semibold text-xs sm:text-sm border border-[#A3E635]/30 transition-all hover:border-[#A3E635] cursor-pointer active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>Explore Live Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}

