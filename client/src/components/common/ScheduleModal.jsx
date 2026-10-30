import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Shield,
  MapPin,
  Users,
  Lock,
  Globe,
  X,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScheduleModal() {
  const { isScheduleModalOpen, setIsScheduleModalOpen, contacts, scheduleMeeting } = useApp();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-02');
  const [time, setTime] = useState('14:00');
  const [duration, setDuration] = useState('45 mins');
  const [timezone, setTimezone] = useState('America/Los_Angeles (PST)');
  const [requirePasscode, setRequirePasscode] = useState(true);
  const [passcode, setPasscode] = useState('789420');
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [isLocationBased, setIsLocationBased] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('San Francisco HQ, Mission Bay');
  const [selectedParticipants, setSelectedParticipants] = useState(['c-1', 'c-2']);

  if (!isScheduleModalOpen) return null;

  const toggleParticipant = (id) => {
    if (selectedParticipants.includes(id)) {
      setSelectedParticipants(selectedParticipants.filter((p) => p !== id));
    } else {
      setSelectedParticipants([...selectedParticipants, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const invitedContacts = contacts.filter((c) => selectedParticipants.includes(c.id));

    scheduleMeeting({
      title: title.trim(),
      date: date === '2026-11-02' ? 'Nov 2, 2026' : date,
      time: time,
      duration: duration,
      timezone: timezone,
      passcode: requirePasscode ? passcode : null,
      waitingRoom: waitingRoom,
      locationTag: isLocationBased ? selectedLocation : 'Virtual Hub',
      participants: invitedContacts.map((c) => ({
        id: c.id,
        name: c.name,
        avatar: c.avatar,
      })),
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#A3E635', '#84CC16', '#F8FAFC'],
    });

    setIsScheduleModalOpen(false);
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#101722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151F2D]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#F8FAFC]">Schedule bugIN Conference</h2>
              <p className="text-xs text-[#94A3B8]">Set up video collaboration with synchronized live map markers</p>
            </div>
          </div>
          <button
            onClick={() => setIsScheduleModalOpen(false)}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          {/* Meeting Title */}
          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5 uppercase tracking-wider">
              Meeting Topic / Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. bugIN Spatial Radar Sprint Planning"
              className="w-full px-3.5 py-2.5 bg-[#151F2D] border border-white/10 rounded-xl text-sm text-[#F8FAFC] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#A3E635] transition-colors"
            />
          </div>

          {/* Date, Time & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Start Time</label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
              >
                <option value="15 mins">15 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
                <option value="90 mins">90 mins</option>
              </select>
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#94A3B8]" />
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
            >
              <option value="America/Los_Angeles (PST)">Pacific Time (US & Canada) - GMT-08:00</option>
              <option value="America/New_York (EST)">Eastern Time (US & Canada) - GMT-05:00</option>
              <option value="Europe/London (GMT)">London - GMT+00:00</option>
              <option value="Asia/Tokyo (JST)">Tokyo - GMT+09:00</option>
            </select>
          </div>

          {/* Location-based meeting toggle */}
          <div className="p-3.5 rounded-xl bg-[#151F2D] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#F8FAFC]">Link with Live Geographical Location</div>
                  <div className="text-[11px] text-[#94A3B8]">Pins this meeting to a physical hub on the Live Map</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isLocationBased}
                onChange={(e) => setIsLocationBased(e.target.checked)}
                className="w-4 h-4 rounded text-[#A3E635] accent-[#A3E635] focus:ring-0 cursor-pointer"
              />
            </div>
            {isLocationBased && (
              <div className="pt-2 border-t border-white/5 animate-in fade-in duration-200">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1C2939] border border-white/10 rounded-lg text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                >
                  <option value="San Francisco HQ, Mission Bay">Apex HQ, 450 Townsend St, SF</option>
                  <option value="Design Innovation Lab - SOMA">Design Lab - 201 3rd St, SOMA</option>
                  <option value="Yerba Buena Innovation Center">Yerba Buena Center, 701 Mission St</option>
                  <option value="Presidio Research Outpost">Presidio Research Outpost</option>
                </select>
              </div>
            )}
          </div>

          {/* Security & Access */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#151F2D] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#A3E635]" />
                  <span className="text-xs font-semibold text-[#F8FAFC]">Require Passcode</span>
                </div>
                <input
                  type="checkbox"
                  checked={requirePasscode}
                  onChange={(e) => setRequirePasscode(e.target.checked)}
                  className="w-4 h-4 accent-[#A3E635] cursor-pointer"
                />
              </div>
              {requirePasscode && (
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#1C2939] border border-white/10 rounded-lg text-xs text-[#F8FAFC]"
                />
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#151F2D] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#A3E635]" />
                <div>
                  <div className="text-xs font-semibold text-[#F8FAFC]">Waiting Room</div>
                  <div className="text-[11px] text-[#94A3B8]">Host approves attendees</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={waitingRoom}
                onChange={(e) => setWaitingRoom(e.target.checked)}
                className="w-4 h-4 accent-[#A3E635] cursor-pointer"
              />
            </div>
          </div>

          {/* Invite Participants */}
          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-[#A3E635]" />
              Invite Team Members ({selectedParticipants.length} selected)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {contacts.map((c) => {
                const isSelected = selectedParticipants.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleParticipant(c.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#A3E635]/15 border-[#A3E635] text-[#F8FAFC]'
                        : 'bg-[#151F2D] border-white/5 text-[#94A3B8] hover:border-white/15'
                    }`}
                  >
                    <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full object-cover" />
                    <div className="truncate">
                      <div className="text-xs font-medium truncate">{c.name}</div>
                      <div className="text-[10px] text-[#94A3B8] truncate">{c.department}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-[#A3E635]/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Schedule & Sync Map
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

