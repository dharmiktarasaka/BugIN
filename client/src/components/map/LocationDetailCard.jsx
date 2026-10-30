import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Video,
  Navigation,
  MessageSquare,
  Share2,
  X,
  Radio,
  ExternalLink,
  Clock,
  Building,
} from 'lucide-react';

export default function LocationDetailCard({
  marker,
  onClose,
  onGetDirections,
  hasActiveRoute,
}) {
  const { startInstantMeeting, showToast, setIsShareLocationModalOpen } = useApp();
  const navigate = useNavigate();

  if (!marker) return null;

  const isUser = marker.type === 'current-user';
  const isTeam = marker.type === 'team-member' || marker.type === 'nearby-contact';
  const isMeetingHub = marker.type === 'meeting-hub';
  const isPlace = marker.type === 'saved-place';

  return (
    <div className="absolute top-20 right-6 w-80 sm:w-96 rounded-2xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 shadow-2xl z-30 overflow-hidden animate-in fade-in slide-in-from-right-3 duration-200">
      {/* Top Banner */}
      <div className="relative h-24 bg-gradient-to-r from-[#1C2939] via-[#151F2D] to-[#101722] p-4 flex items-start justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#A3E635]/20 text-[#A3E635] uppercase tracking-wider">
            {marker.type?.replace('-', ' ')}
          </span>
          {marker.inMeeting && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              In Call
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Avatar & Core Metadata */}
      <div className="p-5 pt-0 -mt-8 relative space-y-4">
        <div className="flex items-end justify-between">
          <div className="relative">
            {marker.avatar ? (
              <img
                src={marker.avatar}
                alt={marker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#101722] shadow-xl"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#1C2939] border-2 border-[#101722] flex items-center justify-center text-[#A3E635] shadow-xl">
                <Building className="w-8 h-8" />
              </div>
            )}
            {marker.status === 'online' && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#A3E635] border-2 border-[#101722]" />
            )}
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-[#A3E635]">
              {marker.distance || 'Near you'}
            </span>
            <div className="text-[10px] text-[#94A3B8]">Spatial Proximity</div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#F8FAFC]">{marker.name}</h3>
          <p className="text-xs text-[#94A3B8]">{marker.role || marker.category || 'Location Pin'}</p>
        </div>

        {/* Address and telemetry specs */}
        <div className="p-3 rounded-xl bg-[#151F2D] border border-white/5 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-[#F8FAFC]">
            <MapPin className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
            <span className="leading-snug">{marker.address}</span>
          </div>

          {marker.availability && (
            <div className="text-[11px] text-[#94A3B8] pt-1 border-t border-white/5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
              <span>Availability: {marker.availability}</span>
            </div>
          )}

          {marker.description && (
            <div className="text-[11px] text-[#94A3B8] pt-1 border-t border-white/5">
              {marker.description}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* 1. Start or Join Meeting */}
          {marker.meetingId ? (
            <button
              onClick={() => navigate(`/meeting/${marker.meetingId}`)}
              className="w-full py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#A3E635]/20 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Join Active Call in Hub</span>
            </button>
          ) : (
            <button
              onClick={() => {
                const id = startInstantMeeting();
                navigate(`/meeting/${id}`);
              }}
              className="w-full py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#A3E635]/20 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Start Instant Meeting Here</span>
            </button>
          )}

          {/* 2. Secondary action row: Get Directions & Message */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onGetDirections(marker)}
              className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                hasActiveRoute
                  ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                  : 'bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] border-white/10'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              <span>{hasActiveRoute ? 'Clear Route' : 'Get Route'}</span>
            </button>

            {isTeam ? (
              <button
                onClick={() => navigate('/messages')}
                className="py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Message</span>
              </button>
            ) : (
              <button
                onClick={() => setIsShareLocationModalOpen(true)}
                className="py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Share Radar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

