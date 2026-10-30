import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ContactCard from '../components/contacts/ContactCard';
import AddContactModal from '../components/contacts/AddContactModal';
import {
  Users,
  UserPlus,
  Search,
  Star,
  Sparkles,
  Filter,
} from 'lucide-react';

export default function Contacts() {
  const { contacts } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const tabs = [
    { id: 'all', label: 'All Contacts', count: contacts.length },
    { id: 'favorites', label: 'Favorites', count: contacts.filter((c) => c.isFavorite).length },
    { id: 'online', label: 'Online Now', count: contacts.filter((c) => c.status === 'online').length },
    { id: 'recent', label: 'Recently Contacted', count: 4 },
  ];

  const departments = ['All', 'Engineering', 'Design', 'Product', 'Operations'];

  const filteredContacts = contacts.filter((contact) => {
    // Tab condition
    if (activeTab === 'favorites' && !contact.isFavorite) return false;
    if (activeTab === 'online' && contact.status !== 'online') return false;

    // Department filter
    if (departmentFilter !== 'All' && contact.department !== departmentFilter) return false;

    // Search query
    const matchSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.location?.name && contact.location.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Team Contacts
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Browse colleagues, check real-time availability, and initiate spatial calls or radar chats.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-bold text-xs sm:text-sm shadow-lg shadow-[#A3E635]/20 transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1C2939] text-[#A3E635] shadow-inner'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151F2D]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-[#A3E635]/20 text-[#A3E635]' : 'bg-[#101722] text-[#94A3B8]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search and Department Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#151F2D] border border-white/10 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Teams' : d}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team member..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#151F2D] border border-white/10 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#A3E635]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Contacts */}
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-[#151F2D]/50 rounded-2xl border border-white/5">
          <Users className="w-12 h-12 text-[#94A3B8] mx-auto opacity-40" />
          <h3 className="text-base font-semibold text-[#F8FAFC]">No contacts found</h3>
          <p className="text-xs text-[#94A3B8]">Try adjusting your search query or department filter.</p>
        </div>
      )}

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
