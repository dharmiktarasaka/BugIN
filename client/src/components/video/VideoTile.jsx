import React from 'react';
import { Mic, MicOff, Hand, Radio, Shield, Volume2 } from 'lucide-react';

export default function VideoTile({
  participant,
  isLarge = false,
  isSelf = false,
  selfMicMuted = false,
  selfCamMuted = false,
  isHandRaised = false,
}) {
  const isSpeaking = participant.isSpeaking;
  const isMicMuted = isSelf ? selfMicMuted : participant.isAudioMuted;
  const isVideoOff = isSelf ? selfCamMuted : participant.isVideoMuted;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-[#101722] border transition-all duration-300 flex items-center justify-center group shadow-xl ${
        isSpeaking && !isMicMuted
          ? 'border-[#A3E635] shadow-lg shadow-[#A3E635]/20 ring-1 ring-[#A3E635]/40'
          : 'border-white/10 hover:border-white/20'
      } ${isLarge ? 'h-full min-h-[360px]' : 'h-full min-h-[160px]'}`}
    >
      {/* Video Stream or Camera-Off Placeholder */}
      {!isVideoOff && participant.videoUrl ? (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={participant.videoUrl}
            alt={participant.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 ${
              isSelf ? 'scale-x-[-1]' : ''
            }`}
          />
          {/* Subtle gradient overlay at bottom for legible badges */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 space-y-3">
          <div className="relative">
            <img
              src={participant.avatar}
              alt={participant.name}
              className={`${
                isLarge ? 'w-24 h-24' : 'w-16 h-16'
              } rounded-full object-cover border-2 border-white/20 shadow-2xl`}
            />
            {isSpeaking && !isMicMuted && (
              <span className="absolute -inset-1.5 rounded-full border-2 border-[#A3E635] animate-ping opacity-75" />
            )}
          </div>
          <span className="text-xs font-medium text-[#94A3B8]">Camera turned off</span>
        </div>
      )}

      {/* Top Left: Role badge & Location */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        {participant.role === 'Host' && (
          <span className="px-2 py-0.5 rounded-md bg-[#A3E635] text-[#080B12] text-[10px] font-bold shadow">
            HOST
          </span>
        )}
        {participant.role === 'Co-Host' && (
          <span className="px-2 py-0.5 rounded-md bg-[#1C2939]/90 border border-white/10 text-[#A3E635] text-[10px] font-semibold backdrop-blur-sm">
            CO-HOST
          </span>
        )}
        {participant.location && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] text-[#94A3B8] backdrop-blur-sm">
            <Radio className="w-2.5 h-2.5 text-[#A3E635]" />
            {participant.location}
          </span>
        )}
      </div>

      {/* Top Right: Hand raised & connection */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        {(participant.isHandRaised || (isSelf && isHandRaised)) && (
          <div className="p-1.5 rounded-lg bg-amber-500 text-black shadow-lg animate-bounce flex items-center gap-1 text-[10px] font-bold">
            <Hand className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Raised Hand</span>
          </div>
        )}
        {/* Connection quality signal bars */}
        <div className="p-1 rounded-md bg-black/50 backdrop-blur-sm flex items-end gap-0.5 h-4">
          <span className="w-0.5 h-1.5 bg-[#A3E635] rounded-full" />
          <span className="w-0.5 h-2.5 bg-[#A3E635] rounded-full" />
          <span className="w-0.5 h-3 bg-[#A3E635] rounded-full" />
        </div>
      </div>

      {/* Bottom Info Bar: Participant Name + Mic State */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#F8FAFC]">
          <span className="truncate max-w-[140px] sm:max-w-[200px]">
            {participant.name}
          </span>
          {isSelf && <span className="text-[#A3E635] text-[10px]">(You)</span>}
        </div>

        {/* Audio Muted Indicator */}
        <div
          className={`p-1.5 rounded-lg backdrop-blur-md border transition-colors ${
            isMicMuted
              ? 'bg-[#EF4444]/80 border-[#EF4444] text-white'
              : isSpeaking
              ? 'bg-[#A3E635]/80 border-[#A3E635] text-[#080B12]'
              : 'bg-black/60 border-white/10 text-[#94A3B8]'
          }`}
          title={isMicMuted ? 'Muted' : 'Unmuted'}
        >
          {isMicMuted ? (
            <MicOff className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </div>
      </div>
    </div>
  );
}

