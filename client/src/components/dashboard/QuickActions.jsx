import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Video, Calendar, KeyRound, MapPin, ArrowUpRight } from 'lucide-react';

export default function QuickActions() {
  const { startInstantMeeting, setIsScheduleModalOpen, setIsShareLocationModalOpen } = useApp();
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Start Instant Meeting',
      subtitle: 'Create an ad-hoc room with 1-click',
      icon: Video,
      color: 'from-lime-500/20 to-lime-500/5',
      accentColor: 'text-[#A3E635]',
      borderHover: 'group-hover:border-[#A3E635]',
      onClick: () => {
        const id = startInstantMeeting();
        navigate(`/meeting/${id}`);
      },
    },
    {
      title: 'Schedule Meeting',
      subtitle: 'Plan ahead with calendar invite & sync',
      icon: Calendar,
      color: 'from-sky-500/20 to-sky-500/5',
      accentColor: 'text-sky-400',
      borderHover: 'group-hover:border-sky-400',
      onClick: () => setIsScheduleModalOpen(true),
    },
    {
      title: 'Join with Meeting ID',
      subtitle: 'Enter a 9-digit code or room URL',
      icon: KeyRound,
      color: 'from-amber-500/20 to-amber-500/5',
      accentColor: 'text-amber-400',
      borderHover: 'group-hover:border-amber-400',
      onClick: () => navigate('/join'),
    },
    {
      title: 'Share Location Telemetry',
      subtitle: 'Broadcast GPS coordinates on radar',
      icon: MapPin,
      color: 'from-emerald-500/20 to-emerald-500/5',
      accentColor: 'text-emerald-400',
      borderHover: 'group-hover:border-emerald-400',
      onClick: () => setIsShareLocationModalOpen(true),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act, idx) => {
        const Icon = act.icon;
        return (
          <button
            key={idx}
            onClick={act.onClick}
            className={`group relative p-5 rounded-2xl bg-[#151F2D] border border-white/5 hover:bg-[#1C2939] transition-all duration-300 text-left flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl ${act.borderHover} cursor-pointer`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${act.color} rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-[#101722] border border-white/10 group-hover:scale-105 transition-transform">
                <Icon className={`w-5 h-5 ${act.accentColor}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#F8FAFC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#A3E635] transition-colors">
                {act.title}
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1 leading-snug">
                {act.subtitle}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

