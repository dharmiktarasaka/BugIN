import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Users,
  MessageSquare,
  Smile,
  Captions,
  Circle,
  MapPin,
  MoreVertical,
  PhoneOff,
  Hand,
  Settings,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FloatingControls({
  micMuted,
  camMuted,
  isScreenSharing,
  isRecording,
  isHandRaised,
  captionsEnabled,
  meetingViewMode,
  activePanelTab,
  onToggleMic,
  onToggleCam,
  onToggleScreenShare,
  onToggleRecord,
  onToggleHandRaise,
  onToggleCaptions,
  onChangeViewMode,
  onTogglePanelTab,
  onAddReaction,
  onLeaveMeeting,
  onOpenSettings,
}) {
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const emojis = ['👏', '❤️', '🚀', '🔥', '🎉', '💡', '👍'];

  const triggerReaction = (emoji) => {
    onAddReaction(emoji);
    setReactionsOpen(false);

    if (emoji === '🎉' || emoji === '🚀') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#A3E635', '#84CC16', '#F8FAFC'],
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center p-3 select-none">
      {/* Reactions Popover */}
      {reactionsOpen && (
        <div className="absolute bottom-20 bg-[#151F2D] border border-white/10 rounded-2xl p-2.5 shadow-2xl z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              className="text-2xl p-1.5 hover:scale-130 transition-transform active:scale-95"
            >
              {emoji}
            </button>
          ))}
          <div className="h-6 w-px bg-white/10 mx-1" />
          <button
            onClick={() => {
              onToggleHandRaise();
              setReactionsOpen(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              isHandRaised
                ? 'bg-amber-500 text-black'
                : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
            }`}
          >
            <Hand className="w-4 h-4 fill-current" />
            <span>{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</span>
          </button>
        </div>
      )}

      {/* More Options Popover */}
      {moreMenuOpen && (
        <div className="absolute bottom-20 right-10 bg-[#151F2D] border border-white/10 rounded-2xl p-2 shadow-2xl z-40 w-52 space-y-1 animate-in fade-in slide-in-from-bottom-2 text-xs">
          <button
            onClick={() => {
              onOpenSettings();
              setMoreMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#F8FAFC] hover:bg-[#1C2939] transition-colors text-left"
          >
            <Settings className="w-4 h-4 text-[#A3E635]" />
            <span>Audio & Video Settings</span>
          </button>
          <button
            onClick={() => {
              onChangeViewMode(meetingViewMode === 'grid' ? 'speaker' : 'grid');
              setMoreMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#F8FAFC] hover:bg-[#1C2939] transition-colors text-left"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Switch to {meetingViewMode === 'grid' ? 'Speaker' : 'Grid'} View</span>
          </button>
        </div>
      )}

      {/* Main Glass Floating Bar */}
      <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-[#101722]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* 1. Microphone Toggle */}
        <button
          onClick={onToggleMic}
          className={`flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            micMuted
              ? 'bg-[#EF4444] text-white hover:bg-red-600'
              : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
          }`}
          title={micMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#A3E635]" />}
          <span className="text-[9px] font-medium mt-0.5">{micMuted ? 'Muted' : 'Mute'}</span>
        </button>

        {/* 2. Camera Toggle */}
        <button
          onClick={onToggleCam}
          className={`flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            camMuted
              ? 'bg-[#EF4444] text-white hover:bg-red-600'
              : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
          }`}
          title={camMuted ? 'Start Video' : 'Stop Video'}
        >
          {camMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4 text-[#A3E635]" />}
          <span className="text-[9px] font-medium mt-0.5">{camMuted ? 'Start' : 'Stop'}</span>
        </button>

        <div className="h-7 w-px bg-white/10 mx-0.5 sm:mx-1" />

        {/* 3. Share Screen */}
        <button
          onClick={onToggleScreenShare}
          className={`flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            isScreenSharing
              ? 'bg-[#A3E635] text-[#080B12] font-bold shadow-md shadow-[#A3E635]/20'
              : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
          }`}
          title={isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}
        >
          <Monitor className="w-4 h-4" />
          <span className="text-[9px] font-medium mt-0.5">Share</span>
        </button>

        {/* 4. Split Map Radar View (Unique bugIN feature!) */}
        <button
          onClick={() => onChangeViewMode(meetingViewMode === 'map' ? 'grid' : 'map')}
          className={`flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            meetingViewMode === 'map'
              ? 'bg-[#A3E635] text-[#080B12] font-bold shadow-md shadow-[#A3E635]/20'
              : 'bg-[#1C2939] text-[#A3E635] hover:bg-[#243447]'
          }`}
          title="Split View with Live Spatial Radar Map"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[9px] font-medium mt-0.5">Radar</span>
        </button>

        {/* 5. Participants Panel */}
        <button
          onClick={() => onTogglePanelTab('participants')}
          className={`flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            activePanelTab === 'participants'
              ? 'bg-[#151F2D] text-[#A3E635] border border-[#A3E635]/40'
              : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
          }`}
          title="Participants"
        >
          <Users className="w-4 h-4" />
          <span className="text-[9px] font-medium mt-0.5">People</span>
        </button>

        {/* 6. Chat Panel */}
        <button
          onClick={() => onTogglePanelTab('chat')}
          className={`relative flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            activePanelTab === 'chat'
              ? 'bg-[#151F2D] text-[#A3E635] border border-[#A3E635]/40'
              : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
          }`}
          title="Meeting Chat"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[9px] font-medium mt-0.5">Chat</span>
        </button>

        {/* 7. Reactions */}
        <button
          onClick={() => setReactionsOpen(!reactionsOpen)}
          className="hidden sm:flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447] transition-all cursor-pointer"
          title="Reactions"
        >
          <Smile className="w-4 h-4 text-amber-400" />
          <span className="text-[9px] font-medium mt-0.5">React</span>
        </button>

        {/* 8. Captions */}
        <button
          onClick={onToggleCaptions}
          className={`hidden md:flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            captionsEnabled
              ? 'bg-[#A3E635] text-[#080B12] font-bold'
              : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
          }`}
          title="Live AI Captions"
        >
          <Captions className="w-4 h-4" />
          <span className="text-[9px] font-medium mt-0.5">CC</span>
        </button>

        {/* 9. Record Meeting */}
        <button
          onClick={onToggleRecord}
          className={`hidden md:flex flex-col items-center justify-center w-12 sm:w-14 h-12 rounded-xl transition-all cursor-pointer ${
            isRecording
              ? 'bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444]'
              : 'bg-[#1C2939] text-[#F8FAFC] hover:bg-[#243447]'
          }`}
          title="Record Conference"
        >
          <Circle className={`w-4 h-4 ${isRecording ? 'fill-[#EF4444] animate-pulse' : ''}`} />
          <span className="text-[9px] font-medium mt-0.5">{isRecording ? 'REC' : 'Record'}</span>
        </button>

        {/* 10. More Options */}
        <button
          onClick={() => setMoreMenuOpen(!moreMenuOpen)}
          className="flex flex-col items-center justify-center w-10 sm:w-12 h-12 rounded-xl bg-[#1C2939] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#243447] transition-all cursor-pointer"
          title="More Options"
        >
          <MoreVertical className="w-4 h-4" />
          <span className="text-[9px] font-medium mt-0.5">More</span>
        </button>

        <div className="h-7 w-px bg-white/10 mx-0.5 sm:mx-1" />

        {/* 11. Leave Meeting Button */}
        <button
          onClick={onLeaveMeeting}
          className="flex items-center gap-1.5 px-4 h-12 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-semibold text-xs shadow-lg shadow-red-500/20 transition-all cursor-pointer active:scale-95"
          title="End or Leave Conference"
        >
          <PhoneOff className="w-4 h-4" />
          <span className="hidden sm:inline">Leave</span>
        </button>
      </div>
    </div>
  );
}

