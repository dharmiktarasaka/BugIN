import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Video,
  Phone,
  MessageSquare,
  MapPin,
  Star,
  Mail,
  MoreVertical,
  Radio,
} from 'lucide-react';

export default function ContactCard({ contact }) {
  const { toggleFavoriteContact, startInstantMeeting, showToast } = useApp();
  const navigate = useNavigate();

  const handleStartCall = () => {
    const id = startInstantMeeting(`1-on-1 with ${contact.name}`);
    navigate(`/meeting/${id}`);
  };

  const handleStartAudio = () => {
    showToast(`Initiating secure audio mesh with ${contact.name}...`, 'info');
    const id = startInstantMeeting(`Audio Call with ${contact.name}`);
    navigate(`/meeting/${id}`);
  };

  return (
    <div className="rounded-2xl bg-[#151F2D] border border-white/5 hover:border-white/10 p-5 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group">
      {/* Top Bar: Avatar, Status, Star */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-12 h-12 rounded-2xl object-cover border border-white/10 group-hover:border-[#A3E635]/40 transition-colors"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#151F2D] ${
                contact.status === 'online'
                  ? 'bg-[#A3E635]'
                  : contact.status === 'in-meeting'
                  ? 'bg-sky-400'
                  : 'bg-[#94A3B8]'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#F8FAFC] leading-tight">
                {contact.name}
              </h3>
            </div>
            <p className="text-xs text-[#94A3B8] leading-tight mt-0.5">{contact.title}</p>
            <span className="inline-block text-[10px] text-[#A3E635] font-semibold bg-[#A3E635]/10 px-1.5 py-0.2 rounded mt-1">
              {contact.department}
            </span>
          </div>
        </div>

        <button
          onClick={() => toggleFavoriteContact(contact.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            contact.isFavorite
              ? 'text-amber-400 hover:text-amber-300'
              : 'text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
          title={contact.isFavorite ? 'Remove Favorite' : 'Mark Favorite'}
        >
          <Star className={`w-4 h-4 ${contact.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Status Message & Distance Location Tag */}
      <div className="p-3 rounded-xl bg-[#101722]/60 border border-white/5 space-y-2 text-xs">
        {contact.statusMessage && (
          <div className="text-[#F8FAFC] text-xs italic truncate">
            “{contact.statusMessage}”
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-1 border-t border-white/5">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
            <span className="truncate">{contact.location?.name || 'San Francisco Hub'}</span>
          </div>
          <span className="font-mono text-[#A3E635] font-semibold shrink-0">
            {contact.location?.distance || 'Nearby'}
          </span>
        </div>
      </div>

      {/* Action Row */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        <button
          onClick={handleStartCall}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-[#A3E635]/15 hover:bg-[#A3E635]/25 border border-[#A3E635]/30 text-[#A3E635] text-xs font-semibold transition-colors cursor-pointer"
          title="Video Call"
        >
          <Video className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Video</span>
        </button>

        <button
          onClick={handleStartAudio}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] text-xs font-semibold transition-colors"
          title="Audio Call"
        >
          <Phone className="w-4 h-4 mb-0.5 text-sky-400" />
          <span className="text-[10px]">Audio</span>
        </button>

        <button
          onClick={() => navigate('/messages')}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] text-xs font-semibold transition-colors"
          title="Message"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-amber-400" />
          <span className="text-[10px]">Chat</span>
        </button>

        <button
          onClick={() => navigate('/map')}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-[#1C2939] hover:bg-[#243447] text-[#F8FAFC] text-xs font-semibold transition-colors"
          title="Locate on Map"
        >
          <MapPin className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span className="text-[10px]">Radar</span>
        </button>
      </div>
    </div>
  );
}

