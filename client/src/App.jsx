import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Meetings from './pages/Meetings';
import MeetingRoom from './pages/MeetingRoom';
import JoinMeeting from './pages/JoinMeeting';
import LiveMap from './pages/LiveMap';
import Contacts from './pages/Contacts';
import Messages from './pages/Messages';
import HistoryPage from './pages/History';
import Recordings from './pages/Recordings';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/join" element={<JoinMeeting />} />
            <Route path="/map" element={<LiveMap />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/settings" element={<Settings />} />
            {/* Active video conferencing room */}
            <Route path="/meeting/:id" element={<MeetingRoom />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
