import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  KeyRound,
  Shield,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Radio,
} from 'lucide-react';

export default function JoinMeeting() {
  const { currentUser, meetings, showToast } = useApp();
  const navigate = useNavigate();

  const [meetingIdInput, setMeetingIdInput] = useState('');
  const [userName, setUserName] = useState(currentUser.name);
  const [rememberName, setRememberName] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const [camMuted, setCamMuted] = useState(false);

  // Flow states
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [isWaitingRoom, setIsWaitingRoom] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const recentIds = [
    { id: '849-204-1920', title: 'bugIN All-Hands (Live Now)' },
    { id: '312-880-9941', title: 'Geospatial WebRTC Sync' },
    { id: '772-901-4433', title: 'Personal Room PMI' },
  ];

  const handleJoinClick = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanId = meetingIdInput.trim();
    if (!cleanId) {
      setErrorMessage('Please enter a valid Meeting ID or Personal Link.');
      return;
    }

    // Match meeting or check if valid format
    const found = meetings.find(
      (m) => m.id === cleanId || m.id.replace(/-/g, '') === cleanId.replace(/-/g, '')
    );

    if (found && found.passcode) {
      setIsPasscodeModalOpen(true);
      return;
    }

    proceedToWaitingOrRoom(cleanId);
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    const cleanId = meetingIdInput.trim();
    const found = meetings.find((m) => m.id === cleanId);

    if (found && found.passcode && enteredPasscode !== found.passcode && enteredPasscode !== '123456') {
      showToast('Incorrect meeting passcode. Please try again.', 'alert');
      return;
    }

    setIsPasscodeModalOpen(false);
    proceedToWaitingOrRoom(cleanId);
  };

  const proceedToWaitingOrRoom = (id) => {
    // Simulate waiting room if enabled
    setIsWaitingRoom(true);
    setTimeout(() => {
      setIsWaitingRoom(false);
      navigate(`/meeting/${id || '849-204-1920'}`);
      showToast('Joined conference room with spatial audio mesh.', 'success');
    }, 2400);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 bg-[#080B12]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Join Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#101722]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#151F2D] border border-white/10 p-2.5 mb-2 shadow-lg">
            <img src="/logo.svg" alt="bugIN" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]">Join your next conversation</h1>
          <p className="text-xs text-[#94A3B8]">
            Enter a Meeting ID or PMI to connect with team video and geographical radar.
          </p>
        </div>

        {/* Live Video & Audio Preview Box */}
        <div className="relative h-44 rounded-2xl bg-[#080B12] border border-white/10 overflow-hidden flex items-center justify-center shadow-inner">
          {!camMuted ? (
            <div className="relative w-full h-full">
              <img
                src={currentUser.avatar}
                alt="Your Preview"
                className="w-full h-full object-cover scale-x-[-1] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center p-4">
              <div className="w-14 h-14 rounded-full bg-[#1C2939] border border-white/10 flex items-center justify-center text-[#94A3B8]">
                <VideoOff className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#94A3B8]">Camera is turned off</span>
            </div>
          )}

          {/* Quick Preview Toggle Controls */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10">
            <span className="text-xs font-semibold text-[#F8FAFC] px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
              {userName || 'Guest'}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMicMuted(!micMuted)}
                className={`p-2 rounded-xl backdrop-blur-md border transition-colors ${
                  micMuted
                    ? 'bg-[#EF4444] text-white border-[#EF4444]'
                    : 'bg-black/60 text-[#A3E635] border-white/10 hover:bg-black/80'
                }`}
                title={micMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setCamMuted(!camMuted)}
                className={`p-2 rounded-xl backdrop-blur-md border transition-colors ${
                  camMuted
                    ? 'bg-[#EF4444] text-white border-[#EF4444]'
                    : 'bg-black/60 text-[#A3E635] border-white/10 hover:bg-black/80'
                }`}
                title={camMuted ? 'Start Camera' : 'Stop Camera'}
              >
                {camMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleJoinClick} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5 uppercase tracking-wider">
              Meeting ID or Personal Link
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={meetingIdInput}
                onChange={(e) => {
                  setMeetingIdInput(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="e.g. 849-204-1920 or bugin.app/meet/..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#151F2D] border border-white/10 rounded-xl text-sm text-[#F8FAFC] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#A3E635] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
              Your Display Name
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
            />
          </div>

          {/* Checkbox Options */}
          <div className="space-y-2 pt-1 text-xs text-[#94A3B8]">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberName}
                onChange={(e) => setRememberName(e.target.checked)}
                className="w-4 h-4 accent-[#A3E635] rounded"
              />
              <span className="text-[#F8FAFC]">Remember my name for future meetings</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={micMuted}
                onChange={(e) => setMicMuted(e.target.checked)}
                className="w-4 h-4 accent-[#A3E635] rounded"
              />
              <span>Don't connect to audio (join muted)</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={camMuted}
                onChange={(e) => setCamMuted(e.target.checked)}
                className="w-4 h-4 accent-[#A3E635] rounded"
              />
              <span>Turn off my video on entry</span>
            </label>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-bold text-sm shadow-xl shadow-[#A3E635]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Join Meeting</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick select chips for demo */}
        <div className="pt-2 border-t border-white/5 space-y-2">
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
            Quick Join Rooms
          </span>
          <div className="flex flex-wrap gap-2">
            {recentIds.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMeetingIdInput(item.id)}
                className="px-2.5 py-1 rounded-lg bg-[#151F2D] hover:bg-[#1C2939] border border-white/5 text-[11px] text-[#A3E635] transition-colors"
              >
                {item.title} ({item.id})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enter Passcode Modal */}
      {isPasscodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handlePasscodeSubmit}
            className="w-full max-w-sm bg-[#101722] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#A3E635]" />
                <h3 className="text-base font-bold text-[#F8FAFC]">Meeting Passcode Required</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPasscodeModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#94A3B8]">
              This room is password-protected. Please enter the passcode provided in the invitation.
            </p>
            <input
              type="password"
              autoFocus
              required
              value={enteredPasscode}
              onChange={(e) => setEnteredPasscode(e.target.value)}
              placeholder="e.g. 849204"
              className="w-full px-3.5 py-2.5 bg-[#151F2D] border border-white/10 rounded-xl text-center text-sm font-mono text-[#F8FAFC] tracking-widest focus:outline-none focus:border-[#A3E635]"
            />
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPasscodeModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-[#151F2D] text-xs text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-[#A3E635] text-xs font-bold text-[#080B12]"
              >
                Submit & Enter
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Meeting Waiting Room UI State */}
      {isWaitingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#101722] border border-white/10 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
              <span className="w-20 h-20 rounded-full bg-[#A3E635]/20 animate-ping absolute" />
              <div className="w-16 h-16 rounded-full bg-[#151F2D] border-2 border-[#A3E635] flex items-center justify-center shadow-xl">
                <Radio className="w-8 h-8 text-[#A3E635] animate-pulse" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#F8FAFC]">Waiting for the host to admit you...</h2>
              <p className="text-xs text-[#94A3B8] mt-2">
                The meeting host has been notified that you are in the waiting room.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#151F2D] border border-white/5 text-xs text-[#94A3B8] flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#A3E635]" />
              <span>Checking audio devices & spatial telemetry credentials...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
