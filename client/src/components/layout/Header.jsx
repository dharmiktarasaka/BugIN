import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  MapPin,
  Video,
  Plus,
  Sparkles,
  CheckCircle2,
  Calendar,
  X,
  ExternalLink,
} from 'lucide-react';

export default function Header() {
  const {
    currentUser,
    setIsCommandPaletteOpen,
    setIsScheduleModalOpen,
    startInstantMeeting,
    locationSharing,
    setIsShareLocationModalOpen,
  } = useApp();

  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const mockNotifications = [
    {
      id: 'notif-1',
      title: 'Meeting In Progress: bugIN All-Hands',
      desc: '6 team members are active in room #849-204-1920.',
      time: 'Just now',
      unread: true,
      action: () => navigate('/meeting/849-204-1920'),
      actionLabel: 'Join Room',
    },
    {
      id: 'notif-2',
      title: 'Sophia Chen shared her live location',
      desc: 'SOMA Design Lab (1.2 km away) • 1h remaining',
      time: '12m ago',
      unread: true,
      action: () => navigate('/map'),
      actionLabel: 'View on Map',
    },
    {
      id: 'notif-3',
      title: 'Cloud Recording Processed',
      desc: 'Realtime Map Cluster Sharding (42m 18s) is ready for download.',
      time: '1h ago',
      unread: false,
      action: () => navigate('/recordings'),
      actionLabel: 'Listen/View',
    },
  ];

  return (
    <header className="h-16 px-6 bg-[#080B12]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between sticky top-0 z-20">
      {/* Left Search Bar with shortcut */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#151F2D] border border-white/10 text-xs text-[#94A3B8] hover:border-[#A3E635]/40 hover:text-[#F8FAFC] transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#94A3B8] group-hover:text-[#A3E635] transition-colors" />
            <span>Search meetings, pins, contacts...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono bg-[#1C2939] text-[#94A3B8] rounded border border-white/10">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-3">
        {/* Live location sharing indicator pill */}
        <button
          onClick={() => setIsShareLocationModalOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151F2D] border border-white/10 hover:border-[#A3E635]/50 transition-all text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${locationSharing.isSharing ? 'bg-[#A3E635]' : 'bg-transparent'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${locationSharing.isSharing ? 'bg-[#A3E635]' : 'bg-[#94A3B8]'}`} />
          </span>
          <span className="text-[#94A3B8]">Radar:</span>
          <span className="text-[#F8FAFC] font-medium">
            {locationSharing.isSharing ? locationSharing.label : 'Off'}
          </span>
        </button>

        {/* Quick Instant Meeting CTA */}
        <button
          onClick={() => {
            const id = startInstantMeeting();
            navigate(`/meeting/${id}`);
          }}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] text-xs font-semibold transition-all shadow-md shadow-[#A3E635]/15 cursor-pointer"
        >
          <Video className="w-3.5 h-3.5" />
          <span>New Meeting</span>
        </button>

        {/* Schedule meeting icon button */}
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="p-2 rounded-xl bg-[#151F2D] border border-white/10 text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-all"
          title="Schedule Meeting"
        >
          <Calendar className="w-4 h-4" />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl bg-[#151F2D] border border-white/10 text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A3E635]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#151F2D] border border-white/10 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#1C2939]/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#F8FAFC]">Notifications</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#A3E635]/20 text-[#A3E635]">
                    2 New
                  </span>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3.5 hover:bg-[#1C2939]/60 transition-colors space-y-1.5 text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-[#F8FAFC] leading-snug">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-tight">{notif.desc}</p>
                    {notif.action && (
                      <button
                        onClick={() => {
                          setNotificationsOpen(false);
                          notif.action();
                        }}
                        className="text-[11px] font-semibold text-[#A3E635] hover:underline flex items-center gap-1 pt-1"
                      >
                        {notif.actionLabel} →
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-[#080B12] text-center border-t border-white/5">
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[11px] text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 pl-2 border-l border-white/10 cursor-pointer group"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-white/10 group-hover:border-[#A3E635] transition-colors"
          />
        </div>
      </div>
    </header>
  );
}

