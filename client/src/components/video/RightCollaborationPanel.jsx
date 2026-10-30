import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MessageSquare,
  Info,
  MapPin,
  Mic,
  MicOff,
  UserPlus,
  Send,
  Smile,
  Paperclip,
  Copy,
  Check,
  Shield,
  Lock,
  ExternalLink,
  X,
  Radio,
} from 'lucide-react';

export default function RightCollaborationPanel({
  activeTab,
  onClose,
  meeting,
  participants,
  onToggleParticipantMute,
}) {
  const { currentUser, showToast } = useApp();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(activeTab || 'participants');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'm1',
      sender: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
      text: 'Good morning everyone! Starting the telemetry review.',
      time: '2:02 PM',
      isSelf: false,
    },
    {
      id: 'm2',
      sender: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'Audio packet recovery looks great. Latency is rock solid.',
      time: '2:05 PM',
      isSelf: false,
    },
    {
      id: 'm3',
      sender: 'Alex Morgan',
      avatar: currentUser.avatar,
      text: 'Welcome all. Feel free to raise hands or drop questions in the thread.',
      time: '2:08 PM',
      isSelf: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [copiedInvite, setCopiedInvite] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: 'm-' + Date.now(),
        sender: currentUser.name,
        avatar: currentUser.avatar,
        text: newMessage.trim(),
        time: 'Just now',
        isSelf: true,
      },
    ]);
    setNewMessage('');
  };

  const copyInvitation = () => {
    navigator.clipboard?.writeText(
      `Join bugIN Conference: ${meeting.title}\nMeeting ID: ${meeting.id}\nPasscode: ${meeting.passcode}\nLink: https://bugin.app/meet/${meeting.id}`
    );
    setCopiedInvite(true);
    showToast('Meeting invitation copied to clipboard!', 'success');
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  return (
    <div className="w-80 sm:w-96 h-full bg-[#101722] border-l border-white/10 flex flex-col shadow-2xl z-20 animate-in slide-in-from-right-4 duration-300">
      {/* Top Tabs */}
      <div className="p-2 border-b border-white/10 flex items-center justify-between bg-[#151F2D]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentTab('participants')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'participants'
                ? 'bg-[#1C2939] text-[#A3E635]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>People ({participants.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'chat'
                ? 'bg-[#1C2939] text-[#A3E635]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setCurrentTab('location')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'location'
                ? 'bg-[#1C2939] text-[#A3E635]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
            title="Shared Location"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Radar</span>
          </button>

          <button
            onClick={() => setCurrentTab('details')}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'details'
                ? 'bg-[#1C2939] text-[#A3E635]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
            title="Meeting Details"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Content 1: Participants */}
      {currentTab === 'participants' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="p-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              In Call ({participants.length})
            </span>
            <button
              onClick={() => showToast('All participants have been muted.', 'info')}
              className="text-xs text-[#EF4444] hover:underline font-medium"
            >
              Mute All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-[#151F2D] transition-colors group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="relative">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#A3E635]" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-[#F8FAFC] flex items-center gap-1.5 truncate">
                      <span className="truncate">{p.name}</span>
                      {p.role === 'Host' && (
                        <span className="text-[9px] font-bold px-1 rounded bg-[#A3E635] text-[#080B12]">
                          HOST
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#A3E635]" />
                      <span>{p.location || 'Remote'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleParticipantMute(p.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      p.isAudioMuted
                        ? 'text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                    }`}
                    title={p.isAudioMuted ? 'Unmute' : 'Mute'}
                  >
                    {p.isAudioMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 bg-[#151F2D]">
            <button
              onClick={copyInvitation}
              className="w-full py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#A3E635]" />
              <span>Invite New Participants</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab Content 2: Chat */}
      {currentTab === 'chat' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]">
                  <span>{msg.sender}</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    msg.isSelf
                      ? 'bg-[#A3E635] text-[#080B12] font-medium rounded-tr-none'
                      : 'bg-[#1C2939] text-[#F8FAFC] border border-white/5 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-[#151F2D]">
            <div className="flex items-center gap-2 bg-[#101722] border border-white/10 rounded-xl px-3 py-2 focus-within:border-[#A3E635] transition-colors">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message everyone in meeting..."
                className="flex-1 bg-transparent text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setNewMessage((prev) => prev + ' 🚀')}
                className="text-[#94A3B8] hover:text-[#A3E635] p-1"
                title="Add emoji"
              >
                <Smile className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-1 text-[#A3E635] hover:text-[#84CC16] disabled:text-[#94A3B8]/40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Content 3: Shared Location (Radar) */}
      {currentTab === 'location' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#A3E635] animate-pulse" />
              <h3 className="text-sm font-bold text-[#F8FAFC]">Live Spatial Telemetry</h3>
            </div>
            <p className="text-xs text-[#94A3B8]">
              Distance and location coordinates of participants in this call.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5">
            {participants.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-[#151F2D] border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-[#F8FAFC]">{p.name}</span>
                  </div>
                  <span className="text-[10px] text-[#A3E635] font-semibold bg-[#A3E635]/10 px-2 py-0.5 rounded-full">
                    Live GPS
                  </span>
                </div>
                <div className="text-[11px] text-[#94A3B8] flex items-center justify-between pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#A3E635]" />
                    {p.location || 'San Francisco Hub'}
                  </span>
                  <span className="font-mono text-[#F8FAFC]">{p.id === 'user-0' ? '0 km (You)' : '1.2 km away'}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/map')}
            className="w-full py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#A3E635]/20 cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Open Full Interactive Map</span>
          </button>
        </div>
      )}

      {/* Tab Content 4: Meeting Details */}
      {currentTab === 'details' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="p-4 rounded-xl bg-[#151F2D] border border-white/5 space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                Meeting Topic
              </span>
              <h4 className="text-sm font-bold text-[#F8FAFC] mt-0.5">{meeting.title}</h4>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-[#94A3B8]">
              <div className="flex justify-between">
                <span>Meeting ID:</span>
                <span className="font-mono text-[#F8FAFC] font-bold">{meeting.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Passcode:</span>
                <span className="font-mono text-[#A3E635] font-bold">{meeting.passcode}</span>
              </div>
              <div className="flex justify-between">
                <span>Host:</span>
                <span className="text-[#F8FAFC]">{meeting.host?.name || 'Alex Morgan'}</span>
              </div>
              <div className="flex justify-between">
                <span>Security:</span>
                <span className="flex items-center gap-1 text-[#22C55E]">
                  <Shield className="w-3 h-3" /> AES-256 E2EE
                </span>
              </div>
            </div>

            <button
              onClick={copyInvitation}
              className="w-full mt-2 py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#A3E635] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/10"
            >
              {copiedInvite ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedInvite ? 'Copied to Clipboard!' : 'Copy Invitation Link'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

