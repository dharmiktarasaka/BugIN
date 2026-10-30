import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Video, Users, ArrowRight } from 'lucide-react';

export default function UpcomingMeetingsWidget() {
  const { meetings } = useApp();
  const navigate = useNavigate();

  const upcomingList = meetings.filter((m) => m.type === 'upcoming' || m.type === 'scheduled').slice(0, 3);

  return (
    <div className="rounded-2xl bg-[#151F2D] border border-white/5 p-5 flex flex-col justify-between shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#F8FAFC]">Upcoming Meetings</h2>
            <p className="text-[11px] text-[#94A3B8]">Synchronized with team calendar</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/meetings')}
          className="text-xs font-semibold text-[#A3E635] hover:text-[#BEF264] flex items-center gap-1 transition-colors"
        >
          View all ({meetings.length})
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Meeting Cards List */}
      <div className="space-y-3 flex-1">
        {upcomingList.map((m) => (
          <div
            key={m.id}
            className={`p-3.5 rounded-xl border transition-all ${
              m.isLive
                ? 'bg-gradient-to-r from-[#1C2939] to-[#151F2D] border-[#A3E635]/40 shadow-lg shadow-[#A3E635]/5'
                : 'bg-[#101722]/60 border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#F8FAFC] hover:text-[#A3E635] cursor-pointer" onClick={() => navigate(m.isLive ? `/meeting/${m.id}` : '/meetings')}>
                    {m.title}
                  </span>
                  {m.isLive && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#A3E635] text-[#080B12] animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#080B12]" />
                      Live Now
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A3E635]" />
                    {m.date} at {m.time} ({m.duration})
                  </span>

                  {m.locationTag && (
                    <span className="flex items-center gap-1 text-[#94A3B8]">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {m.locationTag}
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => navigate(`/meeting/${m.id}`)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  m.isLive
                    ? 'bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] shadow-md shadow-[#A3E635]/20'
                    : 'bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] border border-white/10'
                }`}
              >
                {m.isLive ? 'Join Room' : 'Details'}
              </button>
            </div>

            {/* Participants snippet */}
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {m.participants?.slice(0, 4).map((p, idx) => (
                    <img
                      key={idx}
                      src={p.avatar}
                      alt={p.name}
                      className="inline-block h-5 w-5 rounded-full ring-1 ring-[#151F2D] object-cover"
                    />
                  ))}
                </div>
                <span>
                  {m.participantsCount || m.participants?.length} participants
                </span>
              </div>

              <span className="text-[10px] text-[#94A3B8]">
                ID: {m.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

