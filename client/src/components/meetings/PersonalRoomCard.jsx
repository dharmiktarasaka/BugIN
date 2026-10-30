import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Video,
  Copy,
  Check,
  Shield,
  Lock,
  Globe,
  Settings,
  Sparkles,
  Link,
  MapPin,
} from 'lucide-react';

export default function PersonalRoomCard() {
  const { mockPersonalRoom, showToast } = useApp();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const copyLink = () => {
    navigator.clipboard?.writeText(mockPersonalRoom.link);
    setCopiedLink(true);
    showToast('Personal room link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyId = () => {
    navigator.clipboard?.writeText(mockPersonalRoom.pmi);
    setCopiedId(true);
    showToast('Personal Meeting ID (PMI) copied.', 'info');
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#151F2D] to-[#1C2939] border border-white/10 p-6 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A3E635]/15 border border-[#A3E635]/30 text-[#A3E635] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Permanent Virtual Presence</span>
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC]">{mockPersonalRoom.name}</h2>
          <p className="text-xs text-[#94A3B8]">
            Your dedicated always-on spatial conference room for 1-on-1s and emergency huddles.
          </p>
        </div>

        <button
          onClick={() => navigate('/meeting/849-204-1920')}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-bold text-xs sm:text-sm shadow-xl shadow-[#A3E635]/25 transition-all cursor-pointer"
        >
          <Video className="w-4 h-4" />
          <span>Start Instant PMI Room</span>
        </button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#101722]/80 border border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
            Personal Meeting ID (PMI)
          </span>
          <div className="flex items-center justify-between">
            <span className="text-base font-mono font-bold text-[#F8FAFC]">
              {mockPersonalRoom.pmi}
            </span>
            <button
              onClick={copyId}
              className="p-1.5 rounded-lg bg-[#151F2D] hover:bg-[#1C2939] text-[#94A3B8] hover:text-[#A3E635]"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-[#A3E635]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101722]/80 border border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
            Permanent Invite URL
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#94A3B8] truncate mr-2">
              {mockPersonalRoom.link}
            </span>
            <button
              onClick={copyLink}
              className="p-1.5 rounded-lg bg-[#151F2D] hover:bg-[#1C2939] text-[#94A3B8] hover:text-[#A3E635] shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#A3E635]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#101722]/80 border border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
            Passcode & Encryption
          </span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#A3E635]" />
              <span className="text-xs font-mono font-bold text-[#F8FAFC]">
                {mockPersonalRoom.passcode}
              </span>
            </div>
            <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded font-semibold">
              E2EE
            </span>
          </div>
        </div>
      </div>

      {/* Security & Settings Summary */}
      <div className="p-4 rounded-xl bg-[#101722]/50 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#A3E635]" />
            <span>Waiting Room: Enabled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>Geofenced: SF Mission Bay HQ</span>
          </div>
        </div>

        <button
          onClick={() => showToast('PMI configuration updated.', 'info')}
          className="text-xs font-semibold text-[#A3E635] hover:underline flex items-center gap-1"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Edit PMI Preferences</span>
        </button>
      </div>
    </div>
  );
}

