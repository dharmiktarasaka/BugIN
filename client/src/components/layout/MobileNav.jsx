import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Video, MapPin, MessageSquare, Users } from 'lucide-react';

export default function MobileNav() {
  const items = [
    { label: 'Home', path: '/', icon: LayoutDashboard },
    { label: 'Meetings', path: '/meetings', icon: Video },
    { label: 'Live Map', path: '/map', icon: MapPin },
    { label: 'Chat', path: '/messages', icon: MessageSquare },
    { label: 'Contacts', path: '/contacts', icon: Users },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#101722]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-around z-40 px-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 transition-colors ${
                isActive ? 'text-[#A3E635]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

