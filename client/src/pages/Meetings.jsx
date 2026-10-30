import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MeetingCard from '../components/meetings/MeetingCard';
import PersonalRoomCard from '../components/meetings/PersonalRoomCard';
import {
  Calendar,
  Plus,
  Search,
  Video,
  Clock,
  Filter,
  Sparkles,
} from 'lucide-react';

export default function Meetings() {
  const { meetings, setIsScheduleModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: meetings.filter((m) => m.type === 'upcoming').length },
    { id: 'scheduled', label: 'Scheduled', count: meetings.filter((m) => m.type === 'scheduled').length },
    { id: 'previous', label: 'Previous', count: meetings.filter((m) => m.type === 'previous').length },
    { id: 'personal', label: 'Personal Meeting Room', isPmr: true },
  ];

  const filteredMeetings = meetings.filter((m) => {
    if (activeTab === 'personal') return false;
    const matchesTab = m.type === activeTab;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.host?.name && m.host.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Meetings Management
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Create, schedule, and join high-definition spatial video conferences.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-bold text-xs sm:text-sm shadow-lg shadow-[#A3E635]/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Meeting</span>
        </button>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1C2939] text-[#A3E635] shadow-inner'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151F2D]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-[#A3E635]/20 text-[#A3E635]' : 'bg-[#101722] text-[#94A3B8]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        {activeTab !== 'personal' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title or ID..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#151F2D] border border-white/10 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#A3E635]"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      {activeTab === 'personal' ? (
        <PersonalRoomCard />
      ) : filteredMeetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-[#151F2D]/50 rounded-2xl border border-white/5">
          <Calendar className="w-12 h-12 text-[#94A3B8] mx-auto opacity-40" />
          <h3 className="text-base font-semibold text-[#F8FAFC]">No meetings found</h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
            There are currently no {activeTab} meetings matching your criteria.
          </p>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="mt-2 px-4 py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#A3E635] text-xs font-semibold"
          >
            Schedule a Meeting
          </button>
        </div>
      )}
    </div>
  );
}
