import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Users, ExternalLink, Radio, Shield } from 'lucide-react';
import { mockMapMarkers } from '../../data/mockLocations';

export default function MapPreviewWidget() {
  const { currentUser, locationSharing, contacts } = useApp();
  const navigate = useNavigate();

  const activeSharers = contacts.filter((c) => c.isSharingLocation);

  return (
    <div className="rounded-2xl bg-[#151F2D] border border-white/5 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#F8FAFC]">Live Map Radar</h2>
            <p className="text-[11px] text-[#94A3B8]">
              {activeSharers.length} active contacts sharing coordinates
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/map')}
          className="text-xs font-semibold text-[#A3E635] hover:text-[#BEF264] flex items-center gap-1 transition-colors"
        >
          Open Full Map
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Visual Simulated Dark Map Container */}
      <div
        onClick={() => navigate('/map')}
        className="relative h-48 w-full rounded-xl overflow-hidden border border-white/10 group cursor-pointer bg-[#080B12]"
      >
        {/* Subtle grid lines mimicking digital map */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1C2939_1px,transparent_1px),linear-gradient(to_bottom,#1C2939_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 group-hover:opacity-60 transition-opacity" />

        {/* Ambient radial glow from center */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#080B12]/60 to-[#080B12]/90 pointer-events-none" />

        {/* Simulated Roads/Vector paths */}
        <svg className="absolute inset-0 w-full h-full opacity-35 stroke-[#94A3B8]/20" fill="none">
          <path d="M-10,40 Q120,60 220,30 T450,90" strokeWidth="3" />
          <path d="M40,190 Q180,120 280,140 T500,70" strokeWidth="2.5" />
          <path d="M120,-10 L160,200" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M300,-10 L280,200" strokeWidth="2" />
        </svg>

        {/* Current user radar pulsing marker */}
        <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="relative">
            <span className="w-8 h-8 rounded-full bg-[#A3E635]/20 animate-ping absolute -inset-1" />
            <div className="w-6 h-6 rounded-full bg-[#A3E635] border-2 border-[#080B12] flex items-center justify-center shadow-lg shadow-[#A3E635]/50">
              <div className="w-2 h-2 rounded-full bg-[#080B12]" />
            </div>
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded bg-[#101722]/90 border border-[#A3E635]/40 text-[9px] font-bold text-[#A3E635] shadow">
            You (Mission Bay)
          </span>
        </div>

        {/* Contact pin 1 */}
        <div className="absolute top-[28%] left-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group-hover:scale-105 transition-transform">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"
              alt="Sophia"
              className="w-6 h-6 rounded-full object-cover border-2 border-sky-400 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#A3E635]" />
          </div>
          <span className="mt-0.5 px-1 py-0.2 rounded bg-[#101722]/85 text-[9px] font-medium text-[#F8FAFC]">
            Sophia (1.2 km)
          </span>
        </div>

        {/* Contact pin 2 */}
        <div className="absolute top-[68%] left-[24%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group-hover:scale-105 transition-transform">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
              alt="Marcus"
              className="w-6 h-6 rounded-full object-cover border-2 border-amber-400 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#A3E635]" />
          </div>
          <span className="mt-0.5 px-1 py-0.2 rounded bg-[#101722]/85 text-[9px] font-medium text-[#F8FAFC]">
            Marcus (1.8 km)
          </span>
        </div>

        {/* Meeting Hub Marker */}
        <div className="absolute top-[38%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="w-5 h-5 rounded-lg bg-[#A3E635] text-[#080B12] flex items-center justify-center shadow-lg font-bold text-[9px]">
            ⚡
          </div>
        </div>

        {/* Overlay hover prompt */}
        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-[#101722]/90 border border-white/10 text-[10px] text-[#A3E635] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <Radio className="w-3 h-3 text-[#A3E635] animate-pulse" />
          <span>Click to launch full spatial radar</span>
        </div>
      </div>

      {/* Bottom snippet */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-[#A3E635]" />
          <span className="text-[#94A3B8] text-[11px] truncate">
            Current: <strong className="text-[#F8FAFC]">{currentUser.location?.name}</strong>
          </span>
        </div>
        <span className="text-[11px] text-[#A3E635] font-medium">
          {locationSharing.isSharing ? 'Telemetry Broadcasting' : 'Telemetry Paused'}
        </span>
      </div>
    </div>
  );
}

