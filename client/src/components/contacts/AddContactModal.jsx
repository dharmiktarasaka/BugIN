import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, X, Mail, Phone, Building, MapPin } from 'lucide-react';

export default function AddContactModal({ isOpen, onClose }) {
  const { addContact } = useApp();

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationName, setLocationName] = useState('San Francisco, CA');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addContact({
      name: name.trim(),
      title: title.trim() || 'Software Engineer',
      department: department,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@apex.io`,
      phone: phone.trim() || '+1 (415) 555-0199',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150&auto=format&fit=crop&q=80`,
      location: {
        name: locationName,
        distance: '2.5 km away',
        lat: 37.779,
        lng: -122.41,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#101722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151F2D]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]">
              <UserPlus className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-[#F8FAFC]">Add Team Member</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5 uppercase">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Cruz"
              className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Role / Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Designer"
                className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan.cruz@apex.io"
              className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Location / City</label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full px-3 py-2 bg-[#151F2D] border border-white/10 rounded-xl text-xs text-[#F8FAFC] focus:outline-none focus:border-[#A3E635]"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 bg-[#151F2D] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#080B12] font-semibold text-xs transition-colors"
          >
            Save Contact
          </button>
        </div>
      </form>
    </div>
  );
}

