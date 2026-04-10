import Link from "next/link";
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ niche: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche: nicheKey } = await params;
  
  const nicheData = await prisma.niche_config.findUnique({
    where: { niche_key: nicheKey },
  });

  return {
    title: `${nicheData?.display_name || nicheKey.replace(/_/g, " ")} | AI Live Demo`,
    description: `Experience the automated AI sales funnel for ${nicheData?.display_name || nicheKey}.`,
  };
}

// ------------------------------------------------------------
// Niche-Specific Demo Visual Components
// ------------------------------------------------------------

function MedSpaDemo() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2c2c2c] font-serif relative">
      {/* MedSpa Header */}
      <header className="px-8 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#e5e5e5]">
        <h1 className="text-2xl tracking-widest uppercase text-[#B5A58D]">Aethel Wellness</h1>
        <nav className="hidden md:flex gap-8 text-sm tracking-wide text-[#666]">
          <span className="hover:text-[#B5A58D] cursor-pointer transition-colors">Treatments</span>
          <span className="hover:text-[#B5A58D] cursor-pointer transition-colors">Membership</span>
          <span className="hover:text-[#B5A58D] cursor-pointer transition-colors">About</span>
        </nav>
        <button className="bg-[#B5A58D] text-white px-6 py-2 rounded-sm text-sm tracking-wider uppercase hover:bg-[#a3947c] transition-colors shadow-sm">
          Book Consultation
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="tracking-[0.3em] uppercase text-[#B5A58D] text-sm mb-4 font-sans font-semibold">Elevate Your Natural Beauty</p>
          <h2 className="text-5xl md:text-7xl font-light mb-6 text-[#2c2c2c] leading-tight">
            Refined Aesthetics & <br /> Preventative Care.
          </h2>
          <p className="font-sans text-[#555] max-w-xl mx-auto mb-10 leading-relaxed">
            Experience world-class injectable treatments, laser therapies, and tailored wellness regimens designed to enhance and preserve.
          </p>
          <button className="bg-[#2c2c2c] text-white px-8 py-4 rounded-sm text-sm tracking-wider font-sans uppercase hover:bg-black transition-colors shadow-xl">
            View Treatment Menu
          </button>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-sans">
           <div>
              <p className="text-2xl text-[#B5A58D] font-serif mb-1">Dr. Chen, MD</p>
              <p className="text-xs uppercase tracking-widest text-[#888]">Board Certified</p>
           </div>
           <div>
              <p className="text-2xl text-[#B5A58D] font-serif mb-1">10,000+</p>
              <p className="text-xs uppercase tracking-widest text-[#888]">Treatments Performed</p>
           </div>
           <div>
              <p className="text-2xl text-[#B5A58D] font-serif mb-1">5-Star</p>
              <p className="text-xs uppercase tracking-widest text-[#888]">Patient Rating</p>
           </div>
           <div>
              <p className="text-2xl text-[#B5A58D] font-serif mb-1">2024</p>
              <p className="text-xs uppercase tracking-widest text-[#888]">Best of City Award</p>
           </div>
        </div>
      </section>
    </div>
  );
}

function HVACDemo() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* HVAC Header */}
      <header className="bg-[#002f6c] text-white">
        <div className="bg-[#001b3d] px-4 py-2 flex justify-between items-center text-xs font-semibold tracking-wide">
          <span>🚨 24/7 EMERGENCY REPAIR</span>
          <span>LICENSED & INSURED • LIC# 8472910</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-black italic tracking-tighter">FROST<span className="text-red-500">BITE</span> HVAC</h1>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-gray-300 text-sm font-semibold">Call Now</p>
              <p className="text-2xl font-bold text-white">(800) 555-0199</p>
            </div>
            <button className="bg-red-600 px-6 py-3 font-bold text-white uppercase tracking-wider rounded border-b-4 border-red-800 hover:bg-red-500 active:border-b-0 active:translate-y-1 transition-all">
              Request Service
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#002f6c] py-20 px-6 border-y-8 border-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start gap-6">
          <span className="bg-white text-[#002f6c] px-3 py-1 font-bold uppercase tracking-wider rounded-sm text-sm shadow-md">Same Day Service</span>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tight">
            Stop Sweating.<br/>
            Start <span className="text-red-500">Saving.</span>
          </h2>
          <p className="text-xl text-gray-200 font-medium max-w-xl leading-relaxed bg-black/20 p-4 rounded-md border-l-4 border-red-600">
            A/C blowing hot air? Heater acting up? Get upfront pricing and expert repairs from certified technicians out to your door immediately.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-red-600 text-white px-8 py-4 font-bold text-lg uppercase tracking-wider rounded shadow-2xl border-b-4 border-red-800">
              Book Appointment Online
            </button>
          </div>
        </div>
      </section>

      {/* Trust Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded shadow-md border-t-4 border-[#002f6c]">
           <h3 className="text-xl font-black mb-2 uppercase">Upfront Pricing</h3>
           <p className="text-gray-600 font-medium">No hidden fees, no surprises. You know the exact cost before we start any work.</p>
         </div>
         <div className="bg-white p-8 rounded shadow-md border-t-4 border-red-600">
           <h3 className="text-xl font-black mb-2 uppercase">A+ Rating</h3>
           <p className="text-gray-600 font-medium">Over 2,000 five-star reviews from local homeowners who trust our team completely.</p>
         </div>
         <div className="bg-white p-8 rounded shadow-md border-t-4 border-[#002f6c]">
           <h3 className="text-xl font-black mb-2 uppercase">10-Year Warranty</h3>
           <p className="text-gray-600 font-medium">We stand by our installations with the best parts and labor warranty in the entire state.</p>
         </div>
      </section>
    </div>
  );
}

function DefaultGenericDemo({ niche }: { niche: string }) {
  return (
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <header className="border-b px-8 py-6 flex justify-between items-center shadow-sm">
           <h1 className="text-2xl font-bold tracking-tight capitalize">{niche} Partners</h1>
           <button className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
              Contact Us
           </button>
        </header>
        <section className="py-32 px-8 text-center bg-gray-50 border-b">
           <h2 className="text-5xl font-extrabold tracking-tight mb-6 capitalize text-gray-900">
              The Premier {niche} Service
           </h2>
           <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Explore how our automated systems will instantly book, qualify, and convert your incoming leads. Notice the AI Chatbot waiting for you.
           </p>
           <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
              Schedule Your {niche} Callback
           </button>
        </section>
      </div>
  );
}

export default async function NichePage({ params }: Props) {
  const { niche: nicheSlug } = await params;
  
  // Floating overlay explaining this is a demo environment
  const DemoBanner = () => (
    <div className="fixed top-24 right-6 z-50 bg-black/90 backdrop-blur p-4 rounded-xl border border-white/10 shadow-2xl max-w-sm font-sans animate-in slide-in-from-right fade-in duration-500">
       <div className="flex items-center gap-2 mb-2">
         <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent)]"></span>
         </span>
         <span className="text-white font-bold text-sm tracking-tight">Live Preview Mode</span>
       </div>
       <p className="text-gray-400 text-xs leading-relaxed">
         This is what your customers see. Engage with the <strong>booking widget</strong> below to experience how FlyNerd AI qualifies your leads before you ever pick up the phone.
       </p>
    </div>
  );

  let Content;
  const normalized = nicheSlug.toLowerCase();
  
  if (normalized.includes("med") || normalized.includes("spa") || normalized.includes("salon")) {
    Content = <MedSpaDemo />;
  } else if (normalized.includes("hvac") || normalized.includes("plumb") || normalized.includes("roof") || normalized.includes("trade")) {
    Content = <HVACDemo />;
  } else {
    Content = <DefaultGenericDemo niche={nicheSlug.replace(/_/g, " ")} />;
  }

  return (
    <main className="relative">
      <DemoBanner />
      {Content}
    </main>
  );
}
