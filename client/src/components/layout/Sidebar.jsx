import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Video,
  PlusCircle,
  MapPin,
  Users,
  MessageSquare,
  History,
  FileVideo,
  Settings,
  ChevronDown,
  Sparkles,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const {
    currentUser,
    workspaces,
    currentWorkspace,
    setCurrentWorkspace,
    locationSharing,
    setIsUpgradeModalOpen,
    showToast,
  } = useApp();

  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Meetings', path: '/meetings', icon: Video, badge: 'Live' },
    { label: 'Join Meeting', path: '/join', icon: PlusCircle },
    { label: 'Live Map', path: '/map', icon: MapPin, pulse: true },
    { label: 'Contacts', path: '/contacts', icon: Users },
    { label: 'Messages', path: '/messages', icon: MessageSquare, unread: 3 },
    { label: 'Meeting History', path: '/history', icon: History },
    { label: 'Recordings', path: '/recordings', icon: FileVideo },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative flex flex-col justify-between h-screen bg-[#101722] border-r border-white/5 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand & Workspace Section */}
      <div className="p-4 space-y-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C2939] to-[#151F2D] border border-white/10 flex items-center justify-center p-2 shadow-lg shadow-black/40 group-hover:border-[#A3E635]/40 transition-colors">
              <img src="/logo.svg" alt="bugIN" className="w-full h-full object-contain" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-[#F8FAFC]">
                    bug<span className="text-[#A3E635]">IN</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#A3E635]/20 text-[#A3E635] tracking-wider uppercase">
                    v2.0
                  </span>
                </div>
                <p className="text-[10px] text-[#94A3B8] font-medium tracking-wide">
                  Spatial Video Platform
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Workspace Selector */}
        {!isCollapsed && (
          <div className="relative">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-[#151F2D] border border-white/5 hover:border-white/10 text-xs transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <div className="w-2 h-2 rounded-full bg-[#A3E635]" />
                <span className="font-medium text-[#F8FAFC] truncate">
                  {currentWorkspace.name}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform ${workspaceMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {workspaceMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-1.5 rounded-xl bg-[#151F2D] border border-white/10 shadow-2xl z-40 space-y-1 animate-in fade-in slide-in-from-top-1">
                <div className="px-2 py-1 text-[10px] font-semibold text-[#94A3B8] uppercase">
                  Workspaces
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      setCurrentWorkspace(ws);
                      setWorkspaceMenuOpen(false);
                      showToast(`Switched workspace to ${ws.name}`);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors ${
                      ws.id === currentWorkspace.id
                        ? 'bg-[#A3E635]/10 text-[#A3E635] font-semibold'
                        : 'text-[#F8FAFC] hover:bg-[#1C2939]'
                    }`}
                  >
                    <span className="truncate">{ws.name}</span>
                    <span className="text-[10px] text-[#94A3B8]">{ws.role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-[#1C2939] text-[#A3E635] font-semibold shadow-inner'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                } ${isCollapsed ? 'justify-center px-0' : ''}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#A3E635]' : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'}`} />
                    {item.pulse && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                    )}
                  </div>

                  {!isCollapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#A3E635]/20 text-[#A3E635]">
                      {item.badge}
                    </span>
                  )}

                  {!isCollapsed && item.unread && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#EF4444] text-white">
                      {item.unread}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/5 space-y-3 bg-[#080B12]/40">
        {/* Pro Plan Banner */}
        {!isCollapsed ? (
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#151F2D] to-[#1C2939] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                {currentUser.plan}
              </span>
              <span className="text-[9px] font-bold text-[#A3E635] bg-[#A3E635]/10 px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] leading-tight">
              Spatial telepresence & unlimited map sync enabled.
            </p>
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="w-full py-1.5 rounded-lg bg-[#A3E635]/15 hover:bg-[#A3E635]/25 text-[#A3E635] text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Upgrade Tier
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="w-full flex justify-center py-2 text-[#A3E635] hover:bg-[#1C2939] rounded-xl transition-colors"
            title="Upgrade Plan"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        )}

        {/* User Profile Mini Bar */}
        <div
          onClick={() => navigate('/settings')}
          className={`flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors ${
            isCollapsed ? 'justify-center p-1' : ''
          }`}
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#A3E635]/40"
            />
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#101722] ${
                locationSharing.isSharing ? 'bg-[#A3E635]' : 'bg-[#94A3B8]'
              }`}
            />
          </div>

          {!isCollapsed && (
            <div className="flex-1 truncate">
              <div className="text-xs font-semibold text-[#F8FAFC] truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
                {locationSharing.isSharing ? 'Sharing Radar' : 'Online'}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

