import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  Mic,
  Video,
  Bell,
  MapPin,
  Palette,
  Key,
  Save,
  Check,
  Sparkles,
  Volume2,
  Lock,
} from 'lucide-react';

export default function Settings() {
  const {
    currentUser,
    setCurrentUser,
    deviceSettings,
    setDeviceSettings,
    locationSharing,
    updateLocationSharing,
    showToast,
  } = useApp();

  const [activeSection, setActiveSection] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    title: currentUser.title,
    email: currentUser.email,
    phone: '+1 (415) 892-1204',
    timezone: currentUser.timezone,
    statusMessage: currentUser.statusMessage,
    organization: currentUser.organization,
  });

  const [securitySettings, setSecuritySettings] = useState({
    e2eeEnabled: true,
    requirePasscode: true,
    waitingRoomDefault: true,
    locationPrivacyMode: 'meetings-only', // 'meetings-only' | 'always' | 'ghost'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    meetingReminders: true,
    soundAlerts: true,
    chatPings: true,
    locationSharingAlerts: true,
  });

  const [testAudioPlaying, setTestAudioPlaying] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      ...profileForm,
    });
    showToast('Profile and organization preferences saved!', 'success');
  };

  const playTestSpeakerSound = () => {
    setTestAudioPlaying(true);
    showToast('Testing audio output: 440Hz tone generated.', 'info');
    setTimeout(() => setTestAudioPlaying(false), 2000);
  };

  const sections = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'audio-video', label: 'Audio & Video', icon: Mic },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'location', label: 'Location Permissions', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
          System Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Customize your bugIN experience, configure audio peripherals, and manage spatial privacy.
        </p>
      </div>

      {/* Main Settings Layout: Left Tabs + Right Form Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Navigation Column */}
        <div className="w-full lg:w-64 rounded-2xl bg-[#151F2D] border border-white/5 p-2 shrink-0 space-y-1">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  isActive
                    ? 'bg-[#1C2939] text-[#A3E635] shadow-inner'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#A3E635]' : 'text-[#94A3B8]'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="flex-1 w-full rounded-2xl bg-[#151F2D] border border-white/5 p-6 shadow-xl">
          {/* Section 1: My Profile */}
          {activeSection === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#A3E635]/40"
                />
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC]">{currentUser.name}</h3>
                  <p className="text-xs text-[#94A3B8]">{currentUser.title}</p>
                  <button
                    type="button"
                    onClick={() => showToast('Avatar updated from cloud photo.', 'info')}
                    className="mt-1 text-[11px] font-semibold text-[#A3E635] hover:underline"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#101722] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Professional Title</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#101722] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#101722] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Timezone</label>
                  <select
                    value={profileForm.timezone}
                    onChange={(e) => setProfileForm({ ...profileForm, timezone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#101722] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                  >
                    <option value="PST (UTC-8)">Pacific Time (PST - UTC-8)</option>
                    <option value="EST (UTC-5)">Eastern Time (EST - UTC-5)</option>
                    <option value="GMT (UTC+0)">London (GMT - UTC+0)</option>
                    <option value="JST (UTC+9)">Tokyo (JST - UTC+9)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                  Live Status Message
                </label>
                <input
                  type="text"
                  value={profileForm.statusMessage}
                  onChange={(e) => setProfileForm({ ...profileForm, statusMessage: e.target.value })}
                  placeholder="What are you currently focused on?"
                  className="w-full px-3.5 py-2 bg-[#101722] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* Section 2: Audio & Video */}
          {activeSection === 'audio-video' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-[#F8FAFC]">Peripheral Hardware & AI Processing</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                    Microphone Input
                  </label>
                  <select
                    value={deviceSettings.selectedMic}
                    onChange={(e) =>
                      setDeviceSettings({ ...deviceSettings, selectedMic: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#101722] border border-white/10 rounded-xl text-xs text-[#F8FAFC]"
                  >
                    <option value="MacBook Pro / Studio Mic (CoreAudio)">
                      MacBook Pro / Studio Mic (CoreAudio) - Default
                    </option>
                    <option value="Shure MV7 Dynamic USB">Shure MV7 Dynamic USB</option>
                  </select>
                  {/* Dynamic Mic Level Visualizer */}
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[11px] text-[#94A3B8]">Mic Level:</span>
                    <div className="flex-1 h-2 bg-[#101722] rounded-full overflow-hidden flex gap-1 p-0.5">
                      <span className="w-2/5 bg-[#A3E635] rounded-full animate-pulse" />
                      <span className="w-1/4 bg-[#84CC16] rounded-full" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                    Audio Output Device
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={deviceSettings.selectedSpeaker}
                      onChange={(e) =>
                        setDeviceSettings({ ...deviceSettings, selectedSpeaker: e.target.value })
                      }
                      className="flex-1 px-3 py-2 bg-[#101722] border border-white/10 rounded-xl text-xs text-[#F8FAFC]"
                    >
                      <option value="Studio Monitors (Default)">Studio Monitors (Default)</option>
                      <option value="Internal Laptop Speakers">Internal Laptop Speakers</option>
                    </select>
                    <button
                      type="button"
                      onClick={playTestSpeakerSound}
                      className="px-4 py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#A3E635] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{testAudioPlaying ? 'Playing Tone...' : 'Test Speaker'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#101722] border border-white/5">
                  <div>
                    <div className="text-xs font-semibold text-[#F8FAFC]">Spatial Audio Panning</div>
                    <div className="text-[11px] text-[#94A3B8]">
                      Pans participant audio in stereo space according to their map position relative to you
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#A3E635]" />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Privacy & Security */}
          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-[#F8FAFC]">Encryption & Telemetry Governance</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#101722] border border-white/5">
                  <div>
                    <div className="text-xs font-semibold text-[#F8FAFC]">End-to-End Encryption (AES-256)</div>
                    <div className="text-[11px] text-[#94A3B8]">
                      All video feeds, audio streams, and map markers are encrypted on-device.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={securitySettings.e2eeEnabled}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, e2eeEnabled: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#A3E635]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#101722] border border-white/5">
                  <div>
                    <div className="text-xs font-semibold text-[#F8FAFC]">Default Waiting Room for New Meetings</div>
                    <div className="text-[11px] text-[#94A3B8]">Attendees must be approved by the host before entering</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={securitySettings.waitingRoomDefault}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, waitingRoomDefault: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#A3E635]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#101722] border border-white/5 space-y-3">
                  <span className="text-xs font-semibold text-[#F8FAFC]">Geographical Radar Visibility</span>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'meetings-only', title: 'Only during active conferences', desc: 'Telemetry stops broadcasting when you leave a room' },
                      { id: 'always', title: 'Always visible to workspace team', desc: 'Colleagues can discover your nearby hub at all times' },
                      { id: 'ghost', title: 'Ghost Mode', desc: 'Completely hides your map pin from radar' },
                    ].map((opt) => (
                      <label key={opt.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151F2D] cursor-pointer">
                        <input
                          type="radio"
                          name="locationPrivacy"
                          value={opt.id}
                          checked={securitySettings.locationPrivacyMode === opt.id}
                          onChange={(e) =>
                            setSecuritySettings({ ...securitySettings, locationPrivacyMode: e.target.value })
                          }
                          className="mt-0.5 accent-[#A3E635]"
                        />
                        <div>
                          <div className="text-[#F8FAFC] font-medium">{opt.title}</div>
                          <div className="text-[11px] text-[#94A3B8]">{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Location Permissions */}
          {activeSection === 'location' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-[#F8FAFC]">Spatial Positioning Hardware</h3>

              <div className="p-4 rounded-xl bg-[#101722] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#A3E635]" />
                    <span className="text-xs font-bold text-[#F8FAFC]">High-Precision GPS Sensor</span>
                  </div>
                  <span className="text-[10px] text-[#A3E635] bg-[#A3E635]/10 px-2 py-0.5 rounded font-semibold">
                    Authorized
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  bugIN uses sub-meter GPS and WiFi positioning to compute accurate spatial clustering for live team maps.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-[#94A3B8]">
                  <span>Current Accuracy: <strong>5 meters (Mission Bay)</strong></span>
                  <button
                    onClick={() => updateLocationSharing(60)}
                    className="text-[#A3E635] font-semibold hover:underline"
                  >
                    Re-calibrate Sensor
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Notifications */}
          {activeSection === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#F8FAFC]">Notification Preferences</h3>

              {[
                { key: 'meetingReminders', label: '10-minute upcoming meeting alerts', desc: 'Audio tone and desktop popup prior to scheduled calls' },
                { key: 'soundAlerts', label: 'Conference join and leave chimes', desc: 'Plays soft tone when participants connect' },
                { key: 'chatPings', label: 'In-meeting direct messages', desc: 'Alerts when someone mentions your name in meeting chat' },
                { key: 'locationSharingAlerts', label: 'Colleague enters vicinity', desc: 'Notifies when a contact shares location within 2 km' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-[#101722] border border-white/5">
                  <div>
                    <div className="text-xs font-semibold text-[#F8FAFC]">{item.label}</div>
                    <div className="text-[11px] text-[#94A3B8]">{item.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings[item.key]}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#A3E635]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Section 6: Appearance */}
          {activeSection === 'appearance' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-[#F8FAFC]">Theme & Brand Aesthetic</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-2">Theme Mode</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-[#080B12] border-2 border-[#A3E635] text-xs space-y-1">
                      <div className="font-bold text-[#F8FAFC]">Obsidian Void (#080B12)</div>
                      <div className="text-[11px] text-[#A3E635]">Signature bugIN Dark Aesthetic (Active)</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#101722] border border-white/10 opacity-60 text-xs space-y-1">
                      <div className="font-bold text-[#F8FAFC]">Navy Stealth</div>
                      <div className="text-[11px] text-[#94A3B8]">Deep Indigo Variant</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-2">Signature Brand Accent</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#101722] border border-[#A3E635]">
                      <span className="w-5 h-5 rounded-full bg-[#A3E635]" />
                      <span className="text-xs font-mono font-bold text-[#F8FAFC]">Lime Green #A3E635</span>
                    </div>
                    <span className="text-xs text-[#94A3B8]">Defined in bugIN design system tokens</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
