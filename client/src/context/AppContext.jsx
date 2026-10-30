import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCurrentUser, mockContacts } from '../data/mockContacts';
import { mockMeetings, mockPersonalRoom } from '../data/mockMeetings';
import { mockRecordings } from '../data/mockRecordings';
import { mockMapMarkers, mockSavedPlaces } from '../data/mockLocations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Current user state (stored with LocalStorage persistence)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('bugin_user');
    return saved ? JSON.parse(saved) : mockCurrentUser;
  });

  // Meetings state
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem('bugin_meetings');
    return saved ? JSON.parse(saved) : mockMeetings;
  });

  // Contacts state
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('bugin_contacts');
    return saved ? JSON.parse(saved) : mockContacts;
  });

  // Recordings
  const [recordings, setRecordings] = useState(() => {
    const saved = localStorage.getItem('bugin_recordings');
    return saved ? JSON.parse(saved) : mockRecordings;
  });

  // Saved places
  const [savedPlaces, setSavedPlaces] = useState(() => {
    const saved = localStorage.getItem('bugin_saved_places');
    return saved ? JSON.parse(saved) : mockSavedPlaces;
  });

  // Workspaces
  const workspaces = [
    { id: 'ws-1', name: 'Apex Engineering Studio', role: 'Owner', members: 42 },
    { id: 'ws-2', name: 'Product & Design HQ', role: 'Admin', members: 18 },
    { id: 'ws-3', name: 'Acme Spatial Global', role: 'Guest', members: 120 },
  ];
  const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0]);

  // Video call device states
  const [deviceSettings, setDeviceSettings] = useState({
    micMuted: false,
    camMuted: false,
    selectedMic: 'MacBook Pro / Studio Mic (CoreAudio)',
    selectedSpeaker: 'Studio Monitors (Default)',
    selectedCamera: 'FaceTime HD 1080p Ultra',
    virtualBackground: 'none', // 'none' | 'blur' | 'cyberpunk' | 'office'
    noiseCancellation: 'high',
    hdVideo: true,
  });

  // Meeting in-room states
  const [activeMeetingRoom, setActiveMeetingRoom] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [meetingViewMode, setMeetingViewMode] = useState('grid'); // 'grid' | 'speaker' | 'map'
  const [activePanelTab, setActivePanelTab] = useState('participants'); // 'participants' | 'chat' | 'details' | 'location' | null

  // Live Location Sharing state
  const [locationSharing, setLocationSharing] = useState({
    isSharing: true,
    duration: 60, // minutes
    label: '1 hour',
    remainingMinutes: 48,
    accuracy: 'Precise GPS (5m)',
  });

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isShareLocationModalOpen, setIsShareLocationModalOpen] = useState(false);

  // Notifications / Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', action = null) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('bugin_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bugin_meetings', JSON.stringify(meetings));
  }, [meetings]);

  useEffect(() => {
    localStorage.setItem('bugin_contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Meeting operations
  const scheduleMeeting = (newMeeting) => {
    const meeting = {
      id: Math.floor(100 + Math.random() * 900) + '-' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      type: 'scheduled',
      category: 'Team Meeting',
      status: 'Scheduled',
      isLive: false,
      host: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: 'Host',
      },
      participantsCount: (newMeeting.participants?.length || 0) + 1,
      passcode: Math.floor(100000 + Math.random() * 900000).toString(),
      waitingRoom: newMeeting.waitingRoom ?? true,
      ...newMeeting,
    };

    setMeetings((prev) => [meeting, ...prev]);
    showToast(`Meeting "${meeting.title}" scheduled successfully!`, 'success');
    return meeting;
  };

  const deleteMeeting = (id) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
    showToast('Meeting cancelled and removed from calendar.', 'alert');
  };

  const startInstantMeeting = (customTitle = 'Instant Video & Spatial Meeting') => {
    const instantId = '849-204-1920'; // default active room for instant demo
    showToast(`Starting instant meeting...`, 'success');
    return instantId;
  };

  // Add contact
  const addContact = (contact) => {
    const newContact = {
      id: 'c-' + Date.now(),
      status: 'online',
      lastSeen: 'Just now',
      isFavorite: false,
      mutualMeetings: 0,
      isSharingLocation: true,
      ...contact,
    };
    setContacts((prev) => [newContact, ...prev]);
    showToast(`Added ${contact.name} to your contacts.`, 'success');
  };

  // Toggle favorite contact
  const toggleFavoriteContact = (id) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  // Location sharing toggle
  const updateLocationSharing = (durationMinutes) => {
    if (durationMinutes === 0) {
      setLocationSharing((prev) => ({
        ...prev,
        isSharing: false,
        label: 'Off',
        remainingMinutes: 0,
      }));
      showToast('Live location sharing paused.', 'alert');
    } else {
      const labels = {
        15: '15 minutes',
        60: '1 hour',
        480: '8 hours',
        [-1]: 'Indefinitely',
      };
      setLocationSharing({
        isSharing: true,
        duration: durationMinutes,
        label: labels[durationMinutes] || `${durationMinutes}m`,
        remainingMinutes: durationMinutes === -1 ? 9999 : durationMinutes,
        accuracy: 'Precise GPS (5m)',
      });
      showToast(`Live location sharing active for ${labels[durationMinutes] || durationMinutes + ' mins'}.`, 'success');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        meetings,
        setMeetings,
        contacts,
        setContacts,
        recordings,
        setRecordings,
        savedPlaces,
        setSavedPlaces,
        workspaces,
        currentWorkspace,
        setCurrentWorkspace,
        deviceSettings,
        setDeviceSettings,
        activeMeetingRoom,
        setActiveMeetingRoom,
        isScreenSharing,
        setIsScreenSharing,
        isRecording,
        setIsRecording,
        isHandRaised,
        setIsHandRaised,
        captionsEnabled,
        setCaptionsEnabled,
        meetingViewMode,
        setMeetingViewMode,
        activePanelTab,
        setActivePanelTab,
        locationSharing,
        updateLocationSharing,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        isShareLocationModalOpen,
        setIsShareLocationModalOpen,
        toasts,
        showToast,
        removeToast,
        scheduleMeeting,
        deleteMeeting,
        startInstantMeeting,
        addContact,
        toggleFavoriteContact,
        mockPersonalRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

