import React from 'react';
import { Monitor, X, Play, Code2, Sparkles, Maximize2 } from 'lucide-react';

export default function ScreenShareView({ onStopShare, presenterName = 'Alex Morgan (You)' }) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#101722] border border-white/10 flex flex-col shadow-2xl">
      {/* Top HUD Banner */}
      <div className="h-10 px-4 bg-[#151F2D] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
          <Monitor className="w-4 h-4 text-[#A3E635]" />
          <span className="text-[#F8FAFC] font-semibold">
            {presenterName} is sharing screen
          </span>
          <span className="text-[#94A3B8]">• 1080p 60fps WebRTC Stream</span>
        </div>

        <button
          onClick={onStopShare}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EF4444]/20 hover:bg-[#EF4444]/30 border border-[#EF4444]/40 text-[#EF4444] font-semibold text-xs transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>Stop Sharing</span>
        </button>
      </div>

      {/* Screen Content: Architectural Diagram & Spatial Telemetry Simulation */}
      <div className="flex-1 p-6 bg-[#080B12] overflow-auto flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-xs text-[#A3E635] font-mono">bugIN Core v2.0 Architecture</span>
              <h2 className="text-lg font-bold text-[#F8FAFC]">
                Geospatial Mesh Clustering & WebRTC Relay Topology
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-xs font-semibold">
              Live Stage Preview
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#151F2D] border border-white/5 space-y-2">
              <span className="text-xs text-[#94A3B8]">Spatial Latency</span>
              <div className="text-2xl font-bold text-[#A3E635]">12.4 ms</div>
              <p className="text-[11px] text-[#94A3B8]">Direct P2P UDP ICE candidate paired with Mission Bay Node</p>
            </div>

            <div className="p-4 rounded-xl bg-[#151F2D] border border-white/5 space-y-2">
              <span className="text-xs text-[#94A3B8]">Audio Waveform Quality</span>
              <div className="text-2xl font-bold text-sky-400">Opus 128kbps</div>
              <p className="text-[11px] text-[#94A3B8]">Stereo spatial panning enabled according to participant azimuth</p>
            </div>

            <div className="p-4 rounded-xl bg-[#151F2D] border border-white/5 space-y-2">
              <span className="text-xs text-[#94A3B8]">Active Geohash Ring</span>
              <div className="text-2xl font-bold text-amber-400">9q8yy (SF Bay)</div>
              <p className="text-[11px] text-[#94A3B8]">Sub-meter radius synchronization across 6 connected clients</p>
            </div>
          </div>

          {/* Interactive Code / Spec Box */}
          <div className="p-4 rounded-xl bg-[#151F2D] border border-white/10 font-mono text-xs text-[#94A3B8] space-y-1">
            <div className="text-sky-400 font-semibold">// Live Session Telemetry Buffer</div>
            <div>const session = await bugIN.spatial.connect({`{`} room: "849-204-1920", e2ee: true {`}`});</div>
            <div className="text-[#A3E635]">session.on('telemetry_ping', ({`{`} lat, lng, azimuth {`}`}) =&gt; map.updateRadar(lat, lng));</div>
            <div>// Status: ALL 6 CLIENTS PEERED WITH 0 PACKET LOSS</div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-[#94A3B8] border-t border-white/5">
          <span>bugIN ScreenCast Engine • Hardware Accelerated (WebCodecs)</span>
          <span className="text-[#A3E635]">● 60 FPS Stable</span>
        </div>
      </div>
    </div>
  );
}

