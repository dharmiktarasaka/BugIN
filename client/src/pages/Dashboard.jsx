import React from 'react';
import { useApp } from '../context/AppContext';
import HeroBanner from '../components/dashboard/HeroBanner';
import QuickActions from '../components/dashboard/QuickActions';
import UpcomingMeetingsWidget from '../components/dashboard/UpcomingMeetingsWidget';
import MapPreviewWidget from '../components/dashboard/MapPreviewWidget';
import RecentActivityWidget from '../components/dashboard/RecentActivityWidget';
import StatsOverview from '../components/dashboard/StatsOverview';
import { Sparkles, MapPin, Video, Clock } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, locationSharing } = useApp();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
              Good afternoon, {currentUser.name.split(' ')[0]}
            </h1>
            <span className="inline-block animate-wave text-xl">👋</span>
          </div>
          <p className="text-xs md:text-sm text-[#94A3B8] mt-1">
            Welcome to your unified bugIN hub. You have{' '}
            <span className="text-[#A3E635] font-semibold">1 active meeting</span> and 2 upcoming today.
          </p>
        </div>

        {/* Live Status indicator pill */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#151F2D] border border-white/5 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
            <span className="text-[#94A3B8]">Telemetry:</span>
            <span className="text-[#F8FAFC] font-semibold">
              {locationSharing.isSharing ? `${currentUser.location?.name.split(',')[0]}` : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Banner */}
      <HeroBanner />

      {/* Quick Action Cards */}
      <QuickActions />

      {/* Main Grid: Upcoming Meetings & Map Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingMeetingsWidget />
        <MapPreviewWidget />
      </div>

      {/* Secondary Grid: Recent Activity & Collaboration Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityWidget />
        <StatsOverview />
      </div>
    </div>
  );
}
