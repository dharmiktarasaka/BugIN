import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, Video, Volume2, Sparkles, X, Shield, Sliders } from 'lucide-react';

export default function DeviceSettingsModal({ isOpen, onClose }) {
  const { deviceSettings, setDeviceSettings, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('audio');

  if (!isOpen) return null;

  const handleSave = () => {
    showToast('Audio & video settings updated.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#101722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151F2D]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#F8FAFC]">Conference Device Settings</h2>
              <p className="text-xs text-[#94A3B8]">Configure audio input/output, camera, and AI filters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 bg-[#151F2D]/50 px-6 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('audio')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'audio'
                ? 'border-[#A3E635] text-[#A3E635]'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Audio & Noise Suppression</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'video'
                ? 'border-[#A3E635] text-[#A3E635]'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video & Virtual Backgrounds</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {activeTab === 'audio' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                  Microphone Input Device
                </label>
                <select
                  value={deviceSettings.selectedMic}
                  onChange={(e) =>
                    setDeviceSettings({ ...deviceSettings, selectedMic: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                >
                  <option value="MacBook Pro / Studio Mic (CoreAudio)">
                    MacBook Pro / Studio Mic (CoreAudio) - Default
                  </option>
                  <option value="Shure MV7 USB Dynamic Mic">Shure MV7 USB Dynamic Mic</option>
                  <option value="AirPods Pro Spatial Audio">AirPods Pro Spatial Audio</option>
                </select>

                {/* Simulated live audio input level bar */}
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[11px] text-[#94A3B8]">Input Level:</span>
                  <div className="flex-1 h-2 bg-[#1C2939] rounded-full overflow-hidden flex gap-0.5">
                    <span className="w-1/3 bg-[#A3E635] rounded-full" />
                    <span className="w-1/4 bg-[#84CC16] rounded-full" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                  Speaker Output Device
                </label>
                <select
                  value={deviceSettings.selectedSpeaker}
                  onChange={(e) =>
                    setDeviceSettings({ ...deviceSettings, selectedSpeaker: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                >
                  <option value="Studio Monitors (Default)">Studio Monitors (Default)</option>
                  <option value="Internal MacBook Speakers">Internal MacBook Speakers</option>
                  <option value="AirPods Pro Output">AirPods Pro Output</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-[#151F2D] border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-[#F8FAFC]">AI Noise Cancellation</span>
                <div className="grid grid-cols-3 gap-2">
                  {['auto', 'high', 'low'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() =>
                        setDeviceSettings({ ...deviceSettings, noiseCancellation: mode })
                      }
                      className={`py-2 rounded-lg text-xs capitalize font-medium border transition-colors ${
                        deviceSettings.noiseCancellation === mode
                          ? 'bg-[#A3E635]/15 border-[#A3E635] text-[#A3E635]'
                          : 'bg-[#1C2939] border-white/5 text-[#94A3B8] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Camera Source</label>
                <select
                  value={deviceSettings.selectedCamera}
                  onChange={(e) =>
                    setDeviceSettings({ ...deviceSettings, selectedCamera: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                >
                  <option value="FaceTime HD 1080p Ultra">FaceTime HD 1080p Ultra</option>
                  <option value="Sony A7 IV CamLink 4K">Sony A7 IV CamLink 4K</option>
                  <option value="Logitech Brio 4K Stream">Logitech Brio 4K Stream</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-2">
                  Virtual Backgrounds
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { id: 'none', label: 'None' },
                    { id: 'blur', label: 'Studio Blur' },
                    { id: 'cyberpunk', label: 'Dark City' },
                    { id: 'office', label: 'Minimal Lab' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() =>
                        setDeviceSettings({ ...deviceSettings, virtualBackground: bg.id })
                      }
                      className={`p-3 rounded-xl border text-center text-xs font-medium transition-colors ${
                        deviceSettings.virtualBackground === bg.id
                          ? 'bg-[#A3E635]/15 border-[#A3E635] text-[#A3E635]'
                          : 'bg-[#151F2D] border-white/5 text-[#94A3B8] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151F2D] border border-white/5">
                <div>
                  <div className="text-xs font-semibold text-[#F8FAFC]">HD Video & Low-Light Enhancement</div>
                  <div className="text-[11px] text-[#94A3B8]">Optimizes contrast and frame rate in dark environments</div>
                </div>
                <input
                  type="checkbox"
                  checked={deviceSettings.hdVideo}
                  onChange={(e) =>
                    setDeviceSettings({ ...deviceSettings, hdVideo: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#A3E635] cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#151F2D] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] text-xs font-semibold transition-colors"
          >
            Apply Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

