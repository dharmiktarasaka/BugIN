import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Copy,
  Check,
  Video,
  Trash2,
  Edit,
  Shield,
  MoreVertical,
} from 'lucide-react';

export default function MeetingCard({ meeting, onEdit }) {
  const { deleteMeeting, showToast } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText(
      `bugIN Meeting: ${meeting.title}\nID: ${meeting.id}\nPasscode: ${meeting.passcode}\nJoin: https://bugin.app/meet/${meeting.id}`
    );
    setCopied(true);
    showToast('Meeting invite copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl border transition-all p-5 shadow-xl flex flex-col justify-between space-y-4 ${
        meeting.isLive
          ? 'bg-gradient-to-br from-[#1C2939] to-[#151F2D] border-[#A3E635]/50 shadow-[#A3E635]/10 ring-1 ring-[#A3E635]/30'
          : 'bg-[#151F2D] border-white/5 hover:border-white/10'
      }`}
    >
      {/* Top Header: Category & Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1C2939] text-[#94A3B8] border border-white/10">
              {meeting.category || 'General Sync'}
            </span>
            {meeting.isLive && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A3E635] text-[#080B12] animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#080B12]" />
                Live Now
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC] leading-snug">
            {meeting.title}
          </h3>
        </div>

        {/* Dropdown menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-36 rounded-xl bg-[#101722] border border-white/10 shadow-2xl py-1 z-30 text-xs">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit && onEdit(meeting);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1C2939]"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  deleteMeeting(meeting.id);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[#EF4444] hover:bg-[#1C2939]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Date, Time, Duration, and Location Tag */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#A3E635]" />
          <span>
            {meeting.date} at {meeting.time} ({meeting.duration})
          </span>
        </div>

        {meeting.locationTag && (
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{meeting.locationTag}</span>
          </div>
        )}
      </div>

      {/* Host & Participants snippet */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={meeting.host?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={meeting.host?.name}
            className="w-7 h-7 rounded-full object-cover border border-white/10"
          />
          <div className="text-xs">
            <span className="text-[#94A3B8]">Host: </span>
            <span className="text-[#F8FAFC] font-semibold">{meeting.host?.name || 'Alex Morgan'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <div className="flex -space-x-1.5 overflow-hidden">
            {meeting.participants?.slice(0, 3).map((p, i) => (
              <img
                key={i}
                src={p.avatar}
                alt={p.name}
                className="w-5 h-5 rounded-full ring-1 ring-[#151F2D] object-cover"
              />
            ))}
          </div>
          <span>{meeting.participantsCount || meeting.participants?.length || 4}</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={() => navigate(`/meeting/${meeting.id}`)}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            meeting.isLive
              ? 'bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] shadow-lg shadow-[#A3E635]/25'
              : 'bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] border border-white/10'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>{meeting.isLive ? 'Join Meeting Now' : 'Join Room'}</span>
        </button>

        <button
          onClick={handleCopyInvite}
          className="p-2 rounded-xl bg-[#101722] border border-white/10 text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors"
          title="Copy Invitation"
        >
          {copied ? <Check className="w-4 h-4 text-[#A3E635]" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

