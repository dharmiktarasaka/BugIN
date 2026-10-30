import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockMeetings } from '../data/mockMeetings';
import VideoTile from '../components/video/VideoTile';
import FloatingControls from '../components/video/FloatingControls';
import RightCollaborationPanel from '../components/video/RightCollaborationPanel';
import ScreenShareView from '../components/video/ScreenShareView';
import ReactionsOverlay from '../components/video/ReactionsOverlay';
import CaptionsBar from '../components/video/CaptionsBar';
import DeviceSettingsModal from '../components/video/DeviceSettingsModal';
import {
  Shield,
  Clock,
  Users,
  Grid,
  Maximize2,
  Copy,
  Check,
  Radio,
  MapPin,
  Circle,
  ArrowLeft,
} from 'lucide-react';

export default function MeetingRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentUser,
    deviceSettings,
    setDeviceSettings,
    isScreenSharing,
    setIsScreenSharing,
    isRecording,
    setIsRecording,
    isHandRaised,
    setIsHandRaised,
    captionsEnabled,
    setCaptionsEnabled,
    meetingViewMode,
    setMeetingViewMode,
    activePanelTab,
    setActivePanelTab,
    showToast,
  } = useApp();

  // Find meeting or fallback to first active
  const targetMeeting =
    mockMeetings.find((m) => m.id === id) || mockMeetings[0];

  const [participants, setParticipants] = useState(
    targetMeeting.participants || []
  );

  // Timer counter
  const [elapsedSeconds, setElapsedSeconds] = useState(targetMeeting.elapsedSeconds || 1124);
  const [copiedId, setCopiedId] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Ticking duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyId = () => {
    navigator.clipboard?.writeText(targetMeeting.id);
    setCopiedId(true);
    showToast('Meeting ID copied.', 'info');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleAddReaction = (emoji) => {
    const newReaction = {
      id: Date.now() + Math.random(),
      emoji,
      x: 30 + Math.random() * 40,
    };
    setFloatingReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 3000);
  };

  const handleToggleParticipantMute = (participantId) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId ? { ...p, isAudioMuted: !p.isAudioMuted } : p
      )
    );
  };

  return (
    <div className="relative h-screen w-screen bg-[#080B12] text-[#F8FAFC] flex flex-col overflow-hidden select-none">
      {/* 1. Meeting Header */}
      <header className="h-14 px-4 sm:px-6 bg-[#101722]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-20">
        {/* Left: bugIN brand & Meeting Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLeaveModalOpen(true)}
            className="p-1.5 rounded-lg bg-[#151F2D] hover:bg-[#1C2939] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="bugIN" className="w-6 h-6 object-contain" />
            <span className="font-extrabold text-sm tracking-tight text-[#F8FAFC] hidden sm:inline">
              bug<span className="text-[#A3E635]">IN</span>
            </span>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold text-[#F8FAFC] truncate max-w-[200px] sm:max-w-md">
                {targetMeeting.title}
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-[#A3E635] bg-[#A3E635]/10">
                ID: {targetMeeting.id}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Timer & Recording Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#151F2D] border border-white/5 text-xs font-mono text-[#F8FAFC]">
            <Clock className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          {isRecording && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs font-semibold text-[#EF4444]">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              <span>REC</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#151F2D] text-xs text-[#22C55E] border border-white/5">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">AES-256 E2EE</span>
          </div>
        </div>

        {/* Right: View Mode Toggle & Copy Link */}
        <div className="flex items-center gap-2">
          {/* View Mode Selector */}
          <div className="hidden sm:flex items-center bg-[#151F2D] border border-white/10 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setMeetingViewMode('grid')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                meetingViewMode === 'grid'
                  ? 'bg-[#1C2939] text-[#A3E635] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setMeetingViewMode('speaker')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                meetingViewMode === 'speaker'
                  ? 'bg-[#1C2939] text-[#A3E635] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Speaker</span>
            </button>

            <button
              onClick={() => setMeetingViewMode('map')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                meetingViewMode === 'map'
                  ? 'bg-[#1C2939] text-[#A3E635] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Radar</span>
            </button>
          </div>

          <button
            onClick={handleCopyId}
            className="p-2 rounded-xl bg-[#151F2D] border border-white/10 hover:border-white/20 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            title="Copy Meeting ID"
          >
            {copiedId ? <Check className="w-4 h-4 text-[#A3E635]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. Main Conference Canvas Area */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Floating Reactions Overlay */}
        <ReactionsOverlay
          floatingReactions={floatingReactions}
          onAddReaction={handleAddReaction}
        />

        {/* Live Subtitles & AI Captions Bar */}
        <CaptionsBar isEnabled={captionsEnabled} />

        {/* Central Video Grid Container */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col justify-center items-center">
          {/* Mode A: Screen Sharing Active */}
          {isScreenSharing ? (
            <div className="w-full h-full flex flex-col lg:flex-row gap-3">
              <div className="flex-1 h-full min-h-[400px]">
                <ScreenShareView onStopShare={() => setIsScreenSharing(false)} />
              </div>
              {/* Vertical strip of participant cameras */}
              <div className="lg:w-64 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto shrink-0 max-h-48 lg:max-h-full">
                {participants.map((p) => (
                  <div key={p.id} className="w-44 lg:w-full h-28 lg:h-36 shrink-0">
                    <VideoTile
                      participant={p}
                      isSelf={p.id === 'user-0'}
                      selfMicMuted={deviceSettings.micMuted}
                      selfCamMuted={deviceSettings.camMuted}
                      isHandRaised={isHandRaised}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : meetingViewMode === 'speaker' ? (
            /* Mode B: Speaker View (One Large Hero + Mini Strip) */
            <div className="w-full h-full flex flex-col gap-3">
              <div className="flex-1 min-h-[360px]">
                <VideoTile
                  participant={participants[1] || participants[0]}
                  isLarge={true}
                  isSelf={false}
                />
              </div>
              <div className="h-32 flex gap-3 overflow-x-auto pb-1">
                {participants.map((p) => (
                  <div key={p.id} className="w-48 h-full shrink-0">
                    <VideoTile
                      participant={p}
                      isSelf={p.id === 'user-0'}
                      selfMicMuted={deviceSettings.micMuted}
                      selfCamMuted={deviceSettings.camMuted}
                      isHandRaised={isHandRaised}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : meetingViewMode === 'map' ? (
            /* Mode C: Split View with Integrated Spatial Radar Map */
            <div className="w-full h-full flex flex-col lg:flex-row gap-3">
              {/* Left: Video tile grid (compact) */}
              <div className="lg:w-1/2 h-full grid grid-cols-2 gap-3 overflow-y-auto">
                {participants.slice(0, 4).map((p) => (
                  <div key={p.id} className="h-44 sm:h-52">
                    <VideoTile
                      participant={p}
                      isSelf={p.id === 'user-0'}
                      selfMicMuted={deviceSettings.micMuted}
                      selfCamMuted={deviceSettings.camMuted}
                      isHandRaised={isHandRaised}
                    />
                  </div>
                ))}
              </div>

              {/* Right: Integrated Radar Screen */}
              <div className="lg:w-1/2 h-full rounded-2xl overflow-hidden bg-[#101722] border border-white/10 flex flex-col shadow-2xl relative">
                <div className="p-3 bg-[#151F2D] border-b border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#A3E635] animate-pulse" />
                    <span className="text-[#F8FAFC] font-semibold">
                      Live Participant Telemetry Radar
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/map')}
                    className="text-[#A3E635] hover:underline font-semibold"
                  >
                    Expand Full Map →
                  </button>
                </div>

                <div className="flex-1 relative bg-[#080B12] flex items-center justify-center p-4">
                  {/* Digital Radar HUD */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#A3E635]/30 flex items-center justify-center">
                    <div className="absolute inset-4 rounded-full border border-white/10" />
                    <div className="absolute inset-16 rounded-full border border-[#A3E635]/20" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />

                    {/* Rotating radar sweep ray */}
                    <div className="absolute inset-0 rounded-full animate-spin [animation-duration:6s] bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(163,230,53,0.3)_360deg)] pointer-events-none" />

                    {/* Center: You */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#A3E635] border-2 border-[#080B12] flex items-center justify-center shadow-lg shadow-[#A3E635]/50">
                        <span className="text-[10px] font-bold text-[#080B12]">You</span>
                      </div>
                      <span className="text-[10px] text-[#A3E635] font-mono mt-1">SF HQ</span>
                    </div>

                    {/* Surrounding attendees pins */}
                    <div className="absolute top-10 right-14 flex items-center gap-1 z-10">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" className="w-6 h-6 rounded-full border-2 border-sky-400" />
                      <span className="text-[9px] bg-black/80 px-1 py-0.2 rounded text-[#F8FAFC]">Sophia (1.2 km)</span>
                    </div>

                    <div className="absolute bottom-12 left-10 flex items-center gap-1 z-10">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-6 h-6 rounded-full border-2 border-amber-400" />
                      <span className="text-[9px] bg-black/80 px-1 py-0.2 rounded text-[#F8FAFC]">Marcus (1.8 km)</span>
                    </div>

                    <div className="absolute top-16 left-12 flex items-center gap-1 z-10">
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100" className="w-6 h-6 rounded-full border-2 border-emerald-400" />
                      <span className="text-[9px] bg-black/80 px-1 py-0.2 rounded text-[#F8FAFC]">Elena (2.9 km)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode D: Dynamic Standard Multi-Tile Grid (Default Zoom feel) */
            <div className="w-full h-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
              {participants.map((p) => (
                <VideoTile
                  key={p.id}
                  participant={p}
                  isSelf={p.id === 'user-0'}
                  selfMicMuted={deviceSettings.micMuted}
                  selfCamMuted={deviceSettings.camMuted}
                  isHandRaised={isHandRaised}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Collapsible Collaboration Panel (Participants / Chat / Radar / Info) */}
        {activePanelTab && (
          <RightCollaborationPanel
            activeTab={activePanelTab}
            onClose={() => setActivePanelTab(null)}
            meeting={targetMeeting}
            participants={participants}
            onToggleParticipantMute={handleToggleParticipantMute}
          />
        )}
      </div>

      {/* 3. Bottom Meeting Floating Control Bar */}
      <FloatingControls
        micMuted={deviceSettings.micMuted}
        camMuted={deviceSettings.camMuted}
        isScreenSharing={isScreenSharing}
        isRecording={isRecording}
        isHandRaised={isHandRaised}
        captionsEnabled={captionsEnabled}
        meetingViewMode={meetingViewMode}
        activePanelTab={activePanelTab}
        onToggleMic={() =>
          setDeviceSettings((prev) => ({ ...prev, micMuted: !prev.micMuted }))
        }
        onToggleCam={() =>
          setDeviceSettings((prev) => ({ ...prev, camMuted: !prev.camMuted }))
        }
        onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
        onToggleRecord={() => {
          setIsRecording(!isRecording);
          showToast(
            isRecording ? 'Conference recording saved to Cloud.' : 'Recording conference started...',
            isRecording ? 'info' : 'alert'
          );
        }}
        onToggleHandRaise={() => {
          setIsHandRaised(!isHandRaised);
          showToast(isHandRaised ? 'Hand lowered.' : 'You raised your hand.', 'info');
        }}
        onToggleCaptions={() => setCaptionsEnabled(!captionsEnabled)}
        onChangeViewMode={(mode) => setMeetingViewMode(mode)}
        onTogglePanelTab={(tab) =>
          setActivePanelTab(activePanelTab === tab ? null : tab)
        }
        onAddReaction={handleAddReaction}
        onLeaveMeeting={() => setIsLeaveModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Device Settings Modal */}
      <DeviceSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Leave Meeting Confirmation Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#101722] border border-white/10 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <h3 className="text-base font-bold text-[#F8FAFC]">Leave bugIN Conference?</h3>
            <p className="text-xs text-[#94A3B8]">
              You can rejoin this room at any time from your meetings dashboard.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  showToast('You left the meeting.', 'info');
                  navigate('/');
                }}
                className="w-full py-2.5 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Leave Meeting
              </button>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="w-full py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-medium transition-colors"
              >
                Stay in Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
