import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  MapPin,
  Users,
  Video,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function MapControlPanel({
  markers,
  activeFilter,
  onSelectFilter,
  onSelectMarker,
  selectedMarkerId,
}) {
  const { locationSharing, setIsShareLocationModalOpen } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Pins', icon: MapPin },
    { id: 'meetings', label: 'Active Meetings', icon: Video },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'places', label: 'Saved Places', icon: Bookmark },
  ];

  const filteredMarkers = markers.filter((m) => {
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.address && m.address.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesQuery) return false;

    if (activeFilter === 'meetings') return m.type === 'meeting-hub' || m.inMeeting;
    if (activeFilter === 'team') return m.type === 'team-member' || m.type === 'nearby-contact';
    if (activeFilter === 'places') return m.type === 'saved-place';
    return true;
  });

  return (
    <div
      className={`absolute top-20 left-6 z-30 transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-80 sm:w-96'
      }`}
    >
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-3 rounded-2xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 text-[#A3E635] shadow-2xl hover:scale-105 transition-transform"
          title="Open Location Panel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <div className="rounded-2xl bg-[#101722]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-[#151F2D]/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-[#F8FAFC]">Spatial Telemetry Hub</h2>
                <p className="text-[10px] text-[#94A3B8]">Live map synchronization</p>
              </div>
            </div>

            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
              title="Collapse Panel"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Search bar inside panel */}
          <div className="p-3 border-b border-white/5 bg-[#101722]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#151F2D] border border-white/5 text-xs">
              <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter locations or people..."
                className="flex-1 bg-transparent text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none"
              />
            </div>
          </div>

          {/* Live Location Sharing Status Pill */}
          <div className="p-3 border-b border-white/5 bg-[#151F2D]/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${locationSharing.isSharing ? 'bg-[#A3E635]' : 'bg-transparent'} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${locationSharing.isSharing ? 'bg-[#A3E635]' : 'bg-[#EF4444]'}`} />
              </span>
              <span className="text-[#94A3B8] text-[11px]">
                {locationSharing.isSharing ? `Sharing: ${locationSharing.label}` : 'Location Sharing Paused'}
              </span>
            </div>

            <button
              onClick={() => setIsShareLocationModalOpen(true)}
              className="text-[11px] font-semibold text-[#A3E635] hover:underline"
            >
              {locationSharing.isSharing ? 'Manage' : 'Share GPS'}
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex p-2 gap-1 border-b border-white/5 bg-[#101722] overflow-x-auto">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#1C2939] text-[#A3E635] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* List of locations & team pins */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-white/5">
            {filteredMarkers.map((m) => {
              const isSelected = selectedMarkerId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMarker(m)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left ${
                    isSelected
                      ? 'bg-[#1C2939] border border-[#A3E635]/40 text-[#F8FAFC]'
                      : 'hover:bg-[#151F2D] text-[#94A3B8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {m.avatar ? (
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-7 h-7 rounded-full object-cover border border-white/10 shrink-0"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-[#151F2D] text-[#A3E635] flex items-center justify-center shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className="truncate">
                      <div className="text-xs font-semibold text-[#F8FAFC] truncate">
                        {m.name}
                      </div>
                      <div className="text-[10px] text-[#94A3B8] truncate">
                        {m.address || m.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className="text-[10px] font-mono text-[#A3E635] font-semibold">
                      {m.distance || 'GPS'}
                    </span>
                    {m.inMeeting && (
                      <div className="text-[9px] text-sky-400 font-medium">In Call</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

