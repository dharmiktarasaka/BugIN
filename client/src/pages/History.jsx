import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  History as HistoryIcon,
  Video,
  Clock,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  Play,
  RotateCcw,
  X,
  FileText,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export default function HistoryPage() {
  const { meetings, startInstantMeeting, showToast } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeetingDetail, setSelectedMeetingDetail] = useState(null);

  const previousMeetings = meetings.filter((m) => m.type === 'previous');

  const filteredHistory = previousMeetings.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.host?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAgain = (meeting) => {
    const newId = startInstantMeeting(`Re-run: ${meeting.title}`);
    navigate(`/meeting/${newId}`);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Meeting History
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Review past conferences, view transcripts, and relaunch previous collaboration sessions.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meeting logs..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#151F2D] border border-white/10 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#A3E635]"
          />
        </div>
      </div>

      {/* History List Table / Cards */}
      <div className="rounded-2xl bg-[#151F2D] border border-white/5 overflow-hidden shadow-xl">
        <div className="divide-y divide-white/5">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-5 hover:bg-[#1C2939]/50 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <h3 className="text-sm font-bold text-[#F8FAFC]">{item.title}</h3>
                  <span className="text-[10px] text-[#A3E635] bg-[#A3E635]/10 px-2 py-0.5 rounded font-mono">
                    ID: {item.id}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#A3E635]" />
                    {item.date} at {item.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                    {item.duration}
                  </span>
                  <span>Host: {item.host?.name}</span>
                  {item.locationTag && (
                    <span className="flex items-center gap-1 text-sky-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.locationTag}
                    </span>
                  )}
                </div>
              </div>

              {/* Participants and Actions */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-0 border-white/5">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {item.participants?.map((p, i) => (
                    <img
                      key={i}
                      src={p.avatar}
                      alt={p.name}
                      className="w-6 h-6 rounded-full ring-2 ring-[#151F2D] object-cover"
                    />
                  ))}
                </div>

                <button
                  onClick={() => setSelectedMeetingDetail(item)}
                  className="px-3 py-1.5 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => handleStartAgain(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-[#A3E635]/15 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Again</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Details Modal */}
      {selectedMeetingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#101722] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#A3E635] tracking-wider">
                  Session Log & Telemetry
                </span>
                <h3 className="text-base font-bold text-[#F8FAFC] mt-0.5">
                  {selectedMeetingDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMeetingDetail(null)}
                className="text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#151F2D] border border-white/5 space-y-2 text-xs text-[#94A3B8]">
              <div className="flex justify-between">
                <span>Meeting ID:</span>
                <span className="font-mono text-[#F8FAFC]">{selectedMeetingDetail.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="text-[#F8FAFC]">
                  {selectedMeetingDetail.date} at {selectedMeetingDetail.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="text-[#F8FAFC]">{selectedMeetingDetail.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Geographical Hub:</span>
                <span className="text-sky-400">{selectedMeetingDetail.locationTag}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#F8FAFC]">AI Summary Excerpt:</span>
              <p className="text-xs text-[#94A3B8] p-3 rounded-xl bg-[#151F2D] border border-white/5 leading-relaxed">
                “During this session, the team resolved the geohash sharding latency between
                Mission Bay and Yerba Buena nodes. Audio jitter remained under 12ms. Next action items:
                prepare the interactive HUD markers for customer council review.”
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedMeetingDetail(null)}
                className="px-4 py-2 rounded-xl bg-[#1C2939] text-xs text-[#F8FAFC]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
