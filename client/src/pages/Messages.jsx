import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockConversations, mockChannels } from '../data/mockMessages';
import {
  Search,
  Video,
  Phone,
  Send,
  Smile,
  Paperclip,
  Mic,
  MapPin,
  MoreVertical,
  Check,
  CheckCheck,
  Sparkles,
  ExternalLink,
  Info,
  X,
  Radio,
  Hash,
} from 'lucide-react';

export default function Messages() {
  const { currentUser, startInstantMeeting, showToast, setIsShareLocationModalOpen } = useApp();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConvId, setSelectedConvId] = useState('dm-sophia');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightInfo, setShowRightInfo] = useState(true);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: 'm-' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      avatar: currentUser.avatar,
      timestamp: 'Just now',
      text: inputText.trim(),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConvId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: inputText.trim(),
              lastMessageTime: 'Just now',
            }
          : c
      )
    );

    setInputText('');

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMsg = {
        id: 'reply-' + Date.now(),
        senderId: activeConv.contactId,
        senderName: activeConv.name,
        avatar: activeConv.avatar,
        timestamp: 'Just now',
        text: 'Received! Testing the real-time audio mesh now.',
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConvId
            ? {
                ...c,
                messages: [...c.messages, replyMsg],
                lastMessage: replyMsg.text,
                lastMessageTime: 'Just now',
              }
            : c
        )
      );
    }, 2000);
  };

  const handleStartCall = () => {
    const id = startInstantMeeting(`Meeting with ${activeConv.name}`);
    navigate(`/meeting/${id}`);
  };

  const handleSendLocation = () => {
    const locationMsg = {
      id: 'loc-' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      avatar: currentUser.avatar,
      timestamp: 'Just now',
      text: `Shared my live radar coordinates (${currentUser.location?.name}):`,
      locationAttachment: {
        name: currentUser.location?.name,
        address: currentUser.location?.address,
        distance: 'Here (0 m)',
        lat: currentUser.location?.lat,
        lng: currentUser.location?.lng,
      },
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConvId
          ? {
              ...c,
              messages: [...c.messages, locationMsg],
              lastMessage: 'Shared live location pin',
              lastMessageTime: 'Just now',
            }
          : c
      )
    );
    showToast('Live location card posted into discussion.', 'success');
  };

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden bg-[#080B12]">
      {/* 1. Left Sidebar: Channel & DM List */}
      <div className="w-72 sm:w-80 bg-[#101722] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F8FAFC]">Messages</h2>
            <span className="text-[10px] text-[#A3E635] bg-[#A3E635]/10 px-2 py-0.5 rounded-full font-semibold">
              E2EE Chat
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#151F2D] border border-white/5 text-xs">
            <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats or channels..."
              className="flex-1 bg-transparent text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {/* Channels Section */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              Workplace Channels
            </div>
            {mockChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => showToast(`Navigating to #${ch.name}`, 'info')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151F2D] text-left transition-colors text-xs text-[#94A3B8] hover:text-[#F8FAFC] group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Hash className="w-4 h-4 text-[#94A3B8] group-hover:text-[#A3E635]" />
                  <span className="font-medium truncate">{ch.name}</span>
                </div>
                {ch.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#A3E635] text-[#080B12] text-[10px] font-bold flex items-center justify-center">
                    {ch.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Direct Messages Section */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              Direct Conversations
            </div>
            {conversations.map((c) => {
              const isSelected = selectedConvId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedConvId(c.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-[#1C2939] border border-white/10 text-[#F8FAFC]'
                      : 'hover:bg-[#151F2D] text-[#94A3B8]'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#101722] ${
                        c.status === 'online' ? 'bg-[#A3E635]' : 'bg-sky-400'
                      }`}
                    />
                  </div>

                  <div className="flex-1 truncate">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#F8FAFC] truncate">{c.name}</span>
                      <span className="text-[10px] text-[#94A3B8]">{c.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">{c.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Center: Active Chat Feed Area */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#080B12]">
        {/* Chat Header */}
        <div className="h-16 px-6 bg-[#101722]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeConv.avatar}
                alt={activeConv.name}
                className="w-9 h-9 rounded-full object-cover border border-white/10"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#A3E635] border-2 border-[#101722]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#F8FAFC]">{activeConv.name}</h3>
                <span className="text-[10px] text-[#A3E635] font-semibold bg-[#A3E635]/10 px-2 py-0.2 rounded-full">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">{activeConv.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartCall}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] text-xs font-bold transition-all shadow-md shadow-[#A3E635]/20 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Call</span>
            </button>

            <button
              onClick={() => showToast(`Starting audio call with ${activeConv.name}`, 'info')}
              className="p-2 rounded-xl bg-[#151F2D] hover:bg-[#1C2939] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowRightInfo(!showRightInfo)}
              className="p-2 rounded-xl bg-[#151F2D] hover:bg-[#1C2939] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              title="Toggle Contact Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-center">
            <span className="text-[10px] text-[#94A3B8] bg-[#151F2D] px-3 py-1 rounded-full border border-white/5">
              Messages are secured with End-to-End Encryption
            </span>
          </div>

          {activeConv.messages?.map((msg) => {
            const isMe = msg.senderId === currentUser.id || msg.senderId === 'user-0';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/10"
                />

                <div className={`space-y-1.5 ${isMe ? 'items-end' : ''}`}>
                  <div className={`flex items-center gap-2 text-[10px] text-[#94A3B8] ${isMe ? 'justify-end' : ''}`}>
                    <span className="font-semibold text-[#F8FAFC]">{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#A3E635] text-[#080B12] font-medium rounded-tr-none shadow-md shadow-[#A3E635]/10'
                        : 'bg-[#151F2D] text-[#F8FAFC] border border-white/5 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Location Pin Card attachment */}
                    {msg.locationAttachment && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-[#080B12]/80 border border-white/10 text-left space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[#A3E635] font-semibold text-xs">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{msg.locationAttachment.name}</span>
                          </div>
                          <span className="text-[10px] text-[#94A3B8]">
                            {msg.locationAttachment.distance}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] truncate">
                          {msg.locationAttachment.address}
                        </p>
                        <button
                          onClick={() => navigate('/map')}
                          className="w-full mt-1 py-1 rounded-lg bg-[#1C2939] hover:bg-[#243447] text-[#A3E635] text-[10px] font-semibold text-center block transition-colors"
                        >
                          View Pin on Live Map →
                        </button>
                      </div>
                    )}

                    {/* Code Snippet attachment */}
                    {msg.codeSnippet && (
                      <pre className="mt-2 p-2.5 rounded-xl bg-[#080B12] font-mono text-[11px] text-[#A3E635] overflow-x-auto border border-white/5">
                        {msg.codeSnippet}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-[#101722] border-t border-white/5">
          <div className="flex items-center gap-2 bg-[#151F2D] border border-white/10 rounded-2xl px-4 py-2.5 focus-within:border-[#A3E635] transition-colors">
            <button
              type="button"
              onClick={handleSendLocation}
              className="text-[#94A3B8] hover:text-[#A3E635] p-1 transition-colors"
              title="Share Live Radar Location"
            >
              <MapPin className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => showToast('Simulated attachment picker: file selected.', 'info')}
              className="text-[#94A3B8] hover:text-[#A3E635] p-1 transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRecordingVoice(!isRecordingVoice);
                showToast(
                  isRecordingVoice ? 'Voice note recorded (0:14s).' : 'Recording voice note...',
                  'info'
                );
              }}
              className={`p-1 transition-colors ${
                isRecordingVoice ? 'text-[#EF4444] animate-pulse' : 'text-[#94A3B8] hover:text-[#A3E635]'
              }`}
              title="Voice Message"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeConv.name}...`}
              className="flex-1 bg-transparent text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none px-2"
            />

            <button
              type="button"
              onClick={() => setInputText((prev) => prev + ' ⚡')}
              className="text-[#94A3B8] hover:text-[#A3E635] p-1"
            >
              <Smile className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-1.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* 3. Right: Contact Info Drawer */}
      {showRightInfo && (
        <div className="w-72 sm:w-80 bg-[#101722] border-l border-white/5 flex flex-col p-5 space-y-5 shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F8FAFC]">Contact Profile</span>
            <button
              onClick={() => setShowRightInfo(false)}
              className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center space-y-2">
            <img
              src={activeConv.avatar}
              alt={activeConv.name}
              className="w-20 h-20 rounded-2xl mx-auto object-cover border-2 border-white/10 shadow-xl"
            />
            <h4 className="text-sm font-bold text-[#F8FAFC]">{activeConv.name}</h4>
            <p className="text-xs text-[#94A3B8]">{activeConv.title}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#151F2D] border border-white/5 space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Spatial Coordinates</span>
            <div className="flex items-center justify-between text-[#F8FAFC]">
              <span className="flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
                San Francisco SOMA
              </span>
              <span className="text-[10px] font-mono text-[#A3E635] font-semibold">1.2 km</span>
            </div>
            <button
              onClick={() => navigate('/map')}
              className="w-full mt-2 py-1.5 rounded-lg bg-[#1C2939] hover:bg-[#243447] text-[#A3E635] text-[11px] font-semibold transition-colors"
            >
              Open on Live Map
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Quick Actions</span>
            <button
              onClick={handleStartCall}
              className="w-full py-2 rounded-xl bg-[#151F2D] hover:bg-[#1C2939] text-[#F8FAFC] flex items-center justify-center gap-2 border border-white/5 transition-colors"
            >
              <Video className="w-4 h-4 text-[#A3E635]" />
              <span>Start Instant Conference</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
