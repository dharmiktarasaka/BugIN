import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Check, Zap, X, Shield, Users, Radio, Video } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UpgradeModal() {
  const { isUpgradeModalOpen, setIsUpgradeModalOpen, showToast } = useApp();

  if (!isUpgradeModalOpen) return null;

  const handleUpgrade = (tier) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A3E635', '#84CC16', '#FFFFFF'],
    });
    showToast(`Welcome to bugIN ${tier}! All spatial video limits unlocked.`, 'success');
    setIsUpgradeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#101722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-br from-[#1C2939] to-[#101722] border-b border-white/10 text-center">
          <button
            onClick={() => setIsUpgradeModalOpen(false)}
            className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F8FAFC] p-1"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3E635]/15 border border-[#A3E635]/30 text-[#A3E635] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            bugIN Enterprise & Spatial Pro
          </div>
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Unlock Full Spatial Video Presence</h2>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto mt-1">
            Unlimited participants, 4K screen sharing, sub-meter GPS clustering, and AI transcripts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pro Tier */}
          <div className="p-5 rounded-xl bg-[#151F2D] border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-[#F8FAFC]">Spatial Pro</span>
                <span className="text-xs text-[#94A3B8]">Monthly</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-[#F8FAFC]">$19</span>
                <span className="text-xs text-[#94A3B8]">/ user / mo</span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> Up to 300 participants per room
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> Unlimited live map sharing duration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> 1080p 60fps recording & cloud storage
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> Custom branding & persistent PMI
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleUpgrade('Pro')}
              className="w-full py-2.5 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
            >
              Choose Spatial Pro
            </button>
          </div>

          {/* Enterprise Grid */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-[#1C2939] to-[#151F2D] border border-[#A3E635]/40 relative flex flex-col justify-between space-y-4 shadow-lg shadow-[#A3E635]/5">
            <div className="absolute -top-2.5 right-4 bg-[#A3E635] text-[#080B12] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Recommended
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-[#F8FAFC]">Enterprise Grid</span>
                <span className="text-xs text-[#A3E635]">Tailored</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-[#F8FAFC]">$45</span>
                <span className="text-xs text-[#94A3B8]">/ user / mo</span>
              </div>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> Up to 1,000 video participants
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> Real-time 4K 60fps WebRTC streaming
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> Dedicated private geospatial edge nodes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3E635]" /> SAML SSO, SCIM & 256-bit E2EE audit logs
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleUpgrade('Enterprise')}
              className="w-full py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] text-xs font-semibold transition-colors shadow-md shadow-[#A3E635]/20 cursor-pointer"
            >
              Upgrade to Enterprise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

