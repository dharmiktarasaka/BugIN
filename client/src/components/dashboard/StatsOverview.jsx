import React from 'react';
import { useApp } from '../../context/AppContext';
import { Video, Clock, Users, Calendar, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';

export default function StatsOverview() {
  const { meetings, contacts } = useApp();

  const stats = [
    {
      title: 'Total Meetings',
      value: '142',
      change: '+14% this month',
      icon: Video,
      accent: 'text-[#A3E635]',
      bg: 'bg-[#A3E635]/10',
    },
    {
      title: 'Meeting Hours',
      value: '86.4 hrs',
      change: '+8.2 hrs vs last week',
      icon: Clock,
      accent: 'text-sky-400',
      bg: 'bg-sky-400/10',
    },
    {
      title: 'Active Contacts',
      value: `${contacts.length}`,
      change: '6 sharing live GPS',
      icon: Users,
      accent: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
    {
      title: 'Upcoming Meetings',
      value: `${meetings.filter((m) => m.type === 'upcoming' || m.type === 'scheduled').length}`,
      change: '1 Live Right Now',
      icon: Calendar,
      accent: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
  ];

  const chartData = [
    { day: 'Mon', hours: 2.5, meetings: 3 },
    { day: 'Tue', hours: 4.8, meetings: 5 },
    { day: 'Wed', hours: 3.2, meetings: 4 },
    { day: 'Thu', hours: 6.1, meetings: 7 },
    { day: 'Fri', hours: 5.4, meetings: 6 },
    { day: 'Sat', hours: 1.0, meetings: 1 },
    { day: 'Sun', hours: 0.5, meetings: 1 },
  ];

  return (
    <div className="rounded-2xl bg-[#151F2D] border border-white/5 p-5 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#F8FAFC]">Collaboration Telemetry</h2>
            <p className="text-[11px] text-[#94A3B8]">Spatial audio & video conferencing analytics</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#A3E635] bg-[#A3E635]/10 px-2.5 py-1 rounded-full">
          Weekly Report
        </span>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 rounded-xl bg-[#101722]/80 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#94A3B8]">{item.title}</span>
                <div className={`p-1.5 rounded-lg ${item.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${item.accent}`} />
                </div>
              </div>
              <div className="text-xl font-bold text-[#F8FAFC]">{item.value}</div>
              <div className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                <span className="text-[#A3E635] font-semibold">●</span>
                {item.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Trend Area Chart */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#94A3B8]">Conferencing Hours per Day</span>
          <span className="text-xs font-bold text-[#F8FAFC]">23.5 hrs total this week</span>
        </div>
        <div className="h-28 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="limeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A3E635" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A3E635" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151F2D',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '11px',
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#A3E635"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#limeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

