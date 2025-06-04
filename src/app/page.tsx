"use client"
//app/page.tsx
import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon, SparklesIcon, ZapIcon, TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden" style={{ backgroundColor: '#00080D' }}>
      <section className="relative z-10 py-6 sm:py-8 md:py-12 lg:py-4 flex-1 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[80vh]">
            {/* CORNER DECORATION - Hidden on mobile for cleaner look */}
            <div className="hidden sm:block absolute -top-4 left-0 w-16 md:w-24 lg:w-32 h-16 md:h-24 lg:h-32 border-l-2 border-t-2 border-cyan-400/30" />

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 relative flex flex-col justify-center order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider">AI-Powered Fitness</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                  <div className="mb-1 sm:mb-2">
                    <span className="text-white">Transform Your</span>
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Body & Mind</span>
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <span className="text-white">With Advanced</span>
                  </div>
                  <div>
                    <span className="text-white">AI </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Technology</span>
                  </div>
                </h1>

                {/* SUBTITLE - Added for better mobile experience */}
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-lg leading-relaxed mt-4">
                  Experience personalized fitness programs powered by cutting-edge AI technology. Transform your workout routine with intelligent coaching.
                </p>
              </div>

              {/* GRADIENT SEPARATOR */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent my-6 sm:my-8"></div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-4 sm:gap-5 pt-2">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-gray-900 px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold hover:from-cyan-300 hover:to-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 rounded-lg border border-cyan-400/50 w-full sm:w-auto"
                >
                  <Link href="/generate-program" className="flex items-center justify-center font-mono">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-4 sm:size-5" />
                  </Link>
                </Button>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-400">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <span>Instant Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <span>Track Progress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2 mb-6 lg:mb-0">
              {/* CORNER PIECES - Adjusted for mobile */}
              <div className="absolute -inset-2 sm:-inset-4 md:-inset-6 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-l-2 border-t-2 border-cyan-400/40" />
                <div className="absolute top-0 right-0 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-r-2 border-t-2 border-cyan-400/40" />
                <div className="absolute bottom-0 left-0 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-l-2 border-b-2 border-cyan-400/40" />
                <div className="absolute bottom-0 right-0 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-r-2 border-b-2 border-cyan-400/40" />
              </div>

              {/* IMAGE CONTAINER */}
              <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-md aspect-square mx-auto">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400/5 to-cyan-400/10 border border-cyan-400/20 backdrop-blur-sm">
                  <div className="relative w-full h-full">
                    <Image
                      src="/AI avatar 2.png"
                      alt="AI Fitness Coach"
                      width={512}
                      height={512}
                      className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl"
                      priority
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
                    />
                  </div>

                  {/* SCAN LINE ANIMATION */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1 animate-pulse pointer-events-none" 
                       style={{
                         background: 'linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.3) 50%, transparent 100%)',
                         animation: 'scanline 3s ease-in-out infinite'
                       }} />

                  {/* OVERLAY DECORATIONS - Simplified for mobile */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-cyan-400/30 rounded-full animate-pulse" />
                    
                    {/* Targeting Lines - Hidden on small screens */}
                    <div className="hidden sm:block absolute top-1/2 left-0 w-1/4 h-px bg-cyan-400/40" />
                    <div className="hidden sm:block absolute top-1/2 right-0 w-1/4 h-px bg-cyan-400/40" />
                    <div className="hidden sm:block absolute top-0 left-1/2 h-1/4 w-px bg-cyan-400/40" />
                    <div className="hidden sm:block absolute bottom-0 left-1/2 h-1/4 w-px bg-cyan-400/40" />
                  </div>

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent rounded-xl sm:rounded-2xl" />
                </div>

                {/* TERMINAL OVERLAY */}
                <TerminalOverlay />
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserPrograms />
      
      {/* CUSTOM STYLES */}
      <style jsx>{`
        @keyframes scanline {
          0%, 100% { 
            transform: translateY(-100px); 
            opacity: 0; 
          }
          50% { 
            transform: translateY(calc(100% + 100px)); 
            opacity: 1; 
          }
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;