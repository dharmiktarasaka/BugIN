import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileVideo,
  Play,
  Pause,
  Download,
  Trash2,
  Clock,
  Calendar,
  Share2,
  Search,
  X,
  Volume2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function Recordings() {
  const { recordings, setRecordings, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [playingRecording, setPlayingRecording] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [progress, setProgress] = useState(25);

  const filteredRecordings = recordings.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.host.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (rec) => {
    showToast(`Downloading "${rec.title}" (${rec.fileSize})...`, 'info');
  };

  const handleDelete = (id) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
    showToast('Recording deleted from cloud storage.', 'alert');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Cloud Recordings
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Access encrypted meeting video replays, smart chapter markers, and transcripts.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recordings..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#151F2D] border border-white/10 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#A3E635]"
          />
        </div>
      </div>

      {/* Grid of Recordings */}
      {filteredRecordings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecordings.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl bg-[#151F2D] border border-white/5 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-white/10 transition-all"
            >
              {/* Thumbnail Container */}
              <div className="relative h-44 overflow-hidden bg-black/60">
                <img
                  src={rec.thumbnail}
                  alt={rec.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151F2D] via-transparent to-transparent" />

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-mono text-[#F8FAFC] border border-white/10">
                  {rec.duration}
                </span>

                {/* Resolution Badge */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#A3E635]/20 backdrop-blur-sm text-[10px] font-bold text-[#A3E635]">
                  {rec.resolution}
                </span>

                {/* Play Button Overlay */}
                <button
                  onClick={() => {
                    setPlayingRecording(rec);
                    setIsPlaying(true);
                  }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                >
                  <div className="w-12 h-12 rounded-full bg-[#A3E635] text-[#080B12] flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#A3E635] transition-colors leading-snug">
                    {rec.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-[#94A3B8] mt-1.5">
                    <span>{rec.date}</span>
                    <span>•</span>
                    <span>{rec.fileSize}</span>
                    <span>•</span>
                    <span>Host: {rec.host}</span>
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {rec.description}
                </p>

                {/* Actions */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setPlayingRecording(rec);
                      setIsPlaying(true);
                    }}
                    className="text-xs font-semibold text-[#A3E635] hover:text-[#BEF264] flex items-center gap-1"
                  >
                    Watch Replay →
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownload(rec)}
                      className="p-1.5 rounded-lg bg-[#1C2939] hover:bg-[#243447] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                      title="Download MP4"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(rec.id)}
                      className="p-1.5 rounded-lg bg-[#1C2939] hover:bg-[#243447] text-[#94A3B8] hover:text-[#EF4444] transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-[#151F2D]/50 rounded-2xl border border-white/5">
          <FileVideo className="w-12 h-12 text-[#94A3B8] mx-auto opacity-40" />
          <h3 className="text-base font-semibold text-[#F8FAFC]">No recordings found</h3>
          <p className="text-xs text-[#94A3B8]">Past recorded meetings will appear here automatically.</p>
        </div>
      )}

      {/* Video Player Modal */}
      {playingRecording && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#101722] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Player Header */}
            <div className="h-12 px-5 bg-[#151F2D] border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F8FAFC] truncate mr-4">
                {playingRecording.title}
              </span>
              <button
                onClick={() => setPlayingRecording(null)}
                className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Video Canvas */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={playingRecording.thumbnail}
                alt="Replay"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Center Play/Pause button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#A3E635] text-[#080B12] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>

              {/* Progress bar overlay at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="w-full accent-[#A3E635] cursor-pointer h-1"
                />

                <div className="flex items-center justify-between text-xs text-[#F8FAFC]">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#A3E635]">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <span className="font-mono text-[11px] text-[#94A3B8]">
                      12:30 / {playingRecording.duration.split(' ')[0]} mins
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {['1.0x', '1.25x', '1.5x'].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          playbackSpeed === spd ? 'bg-[#A3E635] text-[#080B12]' : 'text-[#94A3B8]'
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                    <button onClick={() => handleDownload(playingRecording)} className="hover:text-[#A3E635]">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapters list */}
            {playingRecording.chapters && (
              <div className="p-4 bg-[#151F2D] border-t border-white/5 space-y-2 overflow-y-auto max-h-40">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                  Smart AI Chapters
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {playingRecording.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-[#101722] hover:bg-[#1C2939] cursor-pointer flex items-center justify-between transition-colors"
                      onClick={() => showToast(`Seeked to chapter ${ch.time}`, 'info')}
                    >
                      <span className="text-[#F8FAFC] truncate">{ch.title}</span>
                      <span className="font-mono text-[#A3E635] text-[10px] ml-2 shrink-0">{ch.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
