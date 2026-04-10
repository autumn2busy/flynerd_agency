"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, Clock, GitBranch, GitCommit, PlayCircle, Search, User } from "lucide-react";

// Mapping our agency workflow to Vercel's deployment concepts
const deployments = [
  {
    id: "f9A3bKs2",
    stage: "Final Handover & Launch",
    commitId: "e9f01a3",
    branch: "production",
    author: "dre_deploy",
    timeAgo: "Just now",
    duration: "14s",
  },
  {
    id: "d7EGsJEe",
    stage: "Client Review & Revisions",
    commitId: "f8f31e4",
    branch: "staging",
    author: "simon_qa",
    timeAgo: "2h ago",
    duration: "2d",
  },
  {
    id: "gIugTBxK",
    stage: "Backend DB & Analytics Config",
    commitId: "9ea5cfa",
    branch: "main",
    author: "yonce_data",
    timeAgo: "4d ago",
    duration: "14d",
  },
  {
    id: "6FNtwtJj",
    stage: "Core Frontend UX/UI Dev",
    commitId: "d4d8b73",
    branch: "main",
    author: "dre_deploy",
    timeAgo: "1w ago",
    duration: "7d",
  },
  {
    id: "g4nP9nbu",
    stage: "Discovery & System Planning",
    commitId: "82e6366",
    branch: "main",
    author: "simon_qa",
    timeAgo: "3w ago",
    duration: "48h",
  },
];

export default function ClientJourney() {
  // Start at the bottom (Discovery, index 4)
  const [activeDeploymentIndex, setActiveDeploymentIndex] = useState(deployments.length - 1);

  // Auto progression for presentation effect: decrement index (move upwards)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDeploymentIndex((prev) => (prev > 0 ? prev - 1 : deployments.length - 1));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      
      <div className="section-container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold mb-4 font-sans tracking-tight">
            Built like software. <span className="text-[#a1a1aa]">Shipped like software.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-sans">
            We manage your project through a strict, transparent pipeline. 
            See exactly what's building and when it's ready.
          </p>
        </div>

        {/* Vercel-style deployment table */}
        <div className="bg-[#000000] rounded-lg border border-[#333] shadow-2xl font-sans overflow-hidden">
          
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[#222] bg-[#0A0A0A] text-sm">
            <div className="flex items-center gap-2 border border-[#333] rounded-md px-3 py-1.5 bg-[#000] text-gray-400 hover:text-gray-200 cursor-not-allowed">
              <Search size={14} />
              <span>All Branches...</span>
              <ChevronDown size={14} className="ml-4" />
            </div>
            <div className="flex items-center gap-2 border border-[#333] rounded-md px-3 py-1.5 bg-[#000] text-gray-400 cursor-not-allowed">
              <User size={14} />
              <span>All Authors...</span>
              <ChevronDown size={14} className="ml-4" />
            </div>
            <div className="flex items-center gap-2 border border-[#333] rounded-md px-3 py-1.5 bg-[#000] text-gray-400 cursor-not-allowed hidden md:flex">
              <span>All Environments</span>
              <ChevronDown size={14} className="ml-4" />
            </div>
            <div className="flex items-center gap-2 border border-[#333] rounded-md px-3 py-1.5 bg-[#000] text-gray-400 cursor-not-allowed hidden lg:flex">
              <Clock size={14} />
              <span>Select Date Range</span>
            </div>
            
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 text-gray-300">
              <div className="flex -space-x-1">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-black z-10" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 ring-2 ring-black z-20" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-black z-30" />
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400 ring-2 ring-black z-40" />
              </div>
              <span className="text-xs font-semibold ml-2">Status 5/5</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden md:flex items-center px-6 py-3 border-b border-[#222] text-[#888] text-xs font-medium uppercase tracking-wider">
            <div className="w-[20%]">Deployment</div>
            <div className="w-[15%]">Status</div>
            <div className="w-[45%] flex-1">Stage & Commit</div>
            <div className="w-[20%] text-right">Time</div>
          </div>

          {/* Timeline Body */}
          <div className="divide-y divide-[#222]">
              {deployments.map((dep, idx) => {
                const isBuilding = idx === activeDeploymentIndex;
                const isReady = idx > activeDeploymentIndex; // reverse chronological (top is newest)
                
                return (
                  <div key={dep.id} className="flex flex-col md:flex-row md:items-center px-6 py-4 hover:bg-[#111] transition-colors gap-4 md:gap-0">
                    
                    {/* ID & Env */}
                    <div className="w-full md:w-[20%] flex flex-col">
                      <span className="text-gray-200 font-bold font-mono text-sm">{dep.id}</span>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                        <span>Production</span>
                        {idx === 0 && <span className="text-blue-500 flex items-center gap-1"><CheckCircle2 size={10} /> Current</span>}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="w-full md:w-[15%] flex flex-col">
                      <div className="flex items-center gap-2">
                        {isBuilding ? (
                          <>
                           <div className="relative flex items-center justify-center w-2.5 h-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                           </div>
                           <span className="text-sm font-semibold text-blue-500">Building</span>
                          </>
                        ) : isReady ? (
                          <>
                           <div className="w-2 h-2 rounded-full bg-green-500" />
                           <span className="text-sm font-semibold text-green-500">Ready</span>
                          </>
                        ) : (
                          <>
                           <div className="w-2 h-2 rounded-full bg-[#333]" />
                           <span className="text-sm font-semibold text-gray-500">Queued</span>
                          </>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{dep.duration}</span>
                    </div>

                    {/* Branch & Commit */}
                    <div className="w-full md:w-[45%] flex-1 flex flex-col font-mono">
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                        <GitBranch size={14} className="text-gray-500" />
                        <span>{dep.branch}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 truncate max-w-full">
                        <GitCommit size={14} className="text-gray-600 mr-2 shrink-0" />
                        <span className="text-gray-500 mr-2 shrink-0">{dep.commitId}</span>
                        <span className="text-gray-200 truncate font-sans">{dep.stage}</span>
                      </div>
                    </div>

                    {/* Author & Time */}
                    <div className="w-full md:w-[20%] flex items-center md:justify-end gap-3 text-sm text-gray-400 mt-2 md:mt-0">
                      <div className="flex flex-col md:items-end">
                        <span className="text-gray-300">{dep.timeAgo}</span>
                        <span className="text-xs text-gray-500">by {dep.author}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#222] border border-[#444] shrink-0 overflow-hidden flex items-center justify-center">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${dep.author}&backgroundColor=transparent`} alt="" className="w-full h-full" />
                      </div>
                    </div>

                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
