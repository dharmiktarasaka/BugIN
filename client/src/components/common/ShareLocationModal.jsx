import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Clock, ShieldCheck, X, AlertCircle } from 'lucide-react';

export default function ShareLocationModal() {
  const {
    isShareLocationModalOpen,
    setIsShareLocationModalOpen,
    locationSharing,
    updateLocationSharing,
    currentUser,
  } = useApp();

  if (!isShareLocationModalOpen) return null;

  const durationOptions = [
    { minutes: 15, label: 'Share for 15 minutes', desc: 'Ideal for quick meetups and impromptu syncs' },
    { minutes: 60, label: 'Share for 1 hour', desc: 'Standard duration for all-hands and planning calls' },
    { minutes: 480, label: 'Share for 8 hours', desc: 'Covers full workday remote collaboration' },
    { minutes: -1, label: 'Share indefinitely', desc: 'Continuous spatial presence until manually paused' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#101722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151F2D]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#F8FAFC]">Live Location Telemetry</h2>
              <p className="text-xs text-[#94A3B8]">Share real-time coordinates with meeting peers</p>
            </div>
          </div>
          <button
            onClick={() => setIsShareLocationModalOpen(false)}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Banner */}
        <div className="p-5 border-b border-white/5 bg-[#151F2D]/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Current Status</span>
            {locationSharing.isSharing ? (
              <span className="flex items-center gap-1.5 text-xs text-[#A3E635] bg-[#A3E635]/10 px-2.5 py-0.5 rounded-full font-medium">
                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                Active ({locationSharing.label})
              </span>
            ) : (
              <span className="text-xs text-[#EF4444] bg-[#EF4444]/10 px-2.5 py-0.5 rounded-full font-medium">
                Sharing Off
              </span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1C2939] flex items-center justify-center text-[#A3E635] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate text-xs">
              <div className="text-[#F8FAFC] font-medium truncate">{currentUser.location?.name}</div>
              <div className="text-[#94A3B8] text-[11px] truncate">{currentUser.location?.address}</div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          <label className="block text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider">
            Choose Sharing Duration
          </label>

          <div className="space-y-2">
            {durationOptions.map((opt) => {
              const isCurrent = locationSharing.isSharing && locationSharing.duration === opt.minutes;
              return (
                <button
                  key={opt.minutes}
                  onClick={() => {
                    updateLocationSharing(opt.minutes);
                    setIsShareLocationModalOpen(false);
                  }}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-[#A3E635]/15 border-[#A3E635] text-[#F8FAFC]'
                      : 'bg-[#151F2D] border-white/5 text-[#94A3B8] hover:bg-[#1C2939] hover:text-[#F8FAFC]'
                  }`}
                >
                  <Clock className={`w-4 h-4 mt-0.5 ${isCurrent ? 'text-[#A3E635]' : 'text-[#94A3B8]'}`} />
                  <div>
                    <div className="text-xs font-medium text-[#F8FAFC]">{opt.label}</div>
                    <div className="text-[11px] text-[#94A3B8]">{opt.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {locationSharing.isSharing && (
            <button
              onClick={() => {
                updateLocationSharing(0);
                setIsShareLocationModalOpen(false);
              }}
              className="w-full mt-2 py-2.5 rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertCircle className="w-4 h-4" />
              Stop Sharing Location
            </button>
          )}

          <div className="pt-3 flex items-center gap-2 text-[11px] text-[#94A3B8]">
            <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
            <span>Encrypted telemetry. Only visible to verified meeting attendees and contacts.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

