import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Video,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  History,
  FileVideo,
  ExternalLink,
  Sparkles,
  X,
} from 'lucide-react';

export default function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    meetings,
    contacts,
    startInstantMeeting,
    setIsScheduleModalOpen,
    setIsShareLocationModalOpen,
  } = useApp();

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickLinks = [
    { label: 'Start Instant Meeting', icon: Video, action: () => { const id = startInstantMeeting(); navigate(`/meeting/${id}`); } },
    { label: 'Schedule New Meeting', icon: Calendar, action: () => setIsScheduleModalOpen(true) },
    { label: 'Explore Live Map & Radar', icon: MapPin, path: '/map' },
    { label: 'Manage All Meetings', icon: Calendar, path: '/meetings' },
    { label: 'Join with Meeting ID', icon: ExternalLink, path: '/join' },
    { label: 'Share Live Location', icon: MapPin, action: () => setIsShareLocationModalOpen(true) },
    { label: 'Team Contacts & Directory', icon: Users, path: '/contacts' },
    { label: 'Collaboration Messages', icon: MessageSquare, path: '/messages' },
    { label: 'Meeting History', icon: History, path: '/history' },
    { label: 'Cloud Recordings', icon: FileVideo, path: '/recordings' },
    { label: 'Preferences & Audio Settings', icon: Settings, path: '/settings' },
  ];

  const filteredLinks = quickLinks.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.department.toLowerCase().includes(query.toLowerCase())
  );

  const filteredMeetings = meetings.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    setIsCommandPaletteOpen(false);
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#101722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 bg-[#151F2D]">
          <Search className="w-5 h-5 text-[#A3E635]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search meetings, contacts, locations, or actions..."
            className="flex-1 bg-transparent border-none text-[#F8FAFC] placeholder-[#94A3B8] text-sm focus:outline-none"
          />
          <span className="text-xs text-[#94A3B8] bg-[#1C2939] px-2 py-0.5 rounded border border-white/10">ESC</span>
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="text-[#94A3B8] hover:text-[#F8FAFC] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-4">
          {/* Quick Actions / Navigation */}
          <div>
            <div className="px-3 py-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              Navigation & Actions
            </div>
            <div className="space-y-1">
              {filteredLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#F8FAFC] hover:bg-[#1C2939] hover:text-[#A3E635] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-[#151F2D] text-[#94A3B8] group-hover:text-[#A3E635] group-hover:bg-[#A3E635]/10">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-xs text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity">
                      Jump →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contacts Section */}
          {filteredContacts.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                Team Contacts
              </div>
              <div className="space-y-1">
                {filteredContacts.slice(0, 4).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      navigate('/contacts');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#F8FAFC] hover:bg-[#1C2939] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-7 h-7 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div className="font-medium text-[#F8FAFC]">{c.name}</div>
                        <div className="text-xs text-[#94A3B8]">{c.title} • {c.location?.distance}</div>
                      </div>
                    </div>
                    <span className="text-xs text-[#A3E635] bg-[#A3E635]/10 px-2 py-0.5 rounded">
                      {c.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Meetings Section */}
          {filteredMeetings.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                Matching Meetings
              </div>
              <div className="space-y-1">
                {filteredMeetings.slice(0, 3).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      if (m.isLive) {
                        navigate(`/meeting/${m.id}`);
                      } else {
                        navigate('/meetings');
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#F8FAFC] hover:bg-[#1C2939] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                      <div>
                        <div className="font-medium text-[#F8FAFC]">{m.title}</div>
                        <div className="text-xs text-[#94A3B8]">ID: {m.id} • {m.date} at {m.time}</div>
                      </div>
                    </div>
                    <span className="text-xs text-[#94A3B8] group-hover:text-[#A3E635]">
                      {m.isLive ? 'Join Now' : 'Details'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#080B12] border-t border-white/5 flex items-center justify-between text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>bugIN Unified Spatial Search</span>
          </div>
          <div>Press ESC to close</div>
        </div>
      </div>
    </div>
  );
}

