import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import Toast from '../common/Toast';
import CommandPalette from '../common/CommandPalette';
import ScheduleModal from '../common/ScheduleModal';
import UpgradeModal from '../common/UpgradeModal';
import ShareLocationModal from '../common/ShareLocationModal';

export default function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // If inside active meeting room, show full-screen immersion without global outer sidebar
  const isMeetingRoom = location.pathname.startsWith('/meeting/');

  if (isMeetingRoom) {
    return (
      <div className="min-h-screen bg-[#080B12] text-[#F8FAFC] flex flex-col">
        <Outlet />
        <Toast />
        <CommandPalette />
        <ScheduleModal />
        <UpgradeModal />
        <ShareLocationModal />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#080B12] text-[#F8FAFC] overflow-hidden">
      {/* Collapsible Left Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-[#080B12]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Interactive Modals & Toast Manager */}
      <Toast />
      <CommandPalette />
      <ScheduleModal />
      <UpgradeModal />
      <ShareLocationModal />
    </div>
  );
}

