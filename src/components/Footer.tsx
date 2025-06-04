import { BrainCircuitIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-cyan-400/20 bg-gradient-to-r from-background/70 via-background/80 to-background/70 backdrop-blur-xl shadow-lg shadow-cyan-400/5">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Top row - Logo and Status */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 rounded-xl border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300">
                <BrainCircuitIcon className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold font-mono tracking-tight">
                <span className="text-white">Train</span>
                <span className="text-cyan-400">etic</span>
                <span className="text-cyan-400">.ai</span>
              </span>
            </Link>
            
            {/* Status */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-cyan-400/30 rounded-lg bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50"></div>
              <span className="text-xs font-mono text-cyan-400 font-medium">SYSTEM OPERATIONAL</span>
            </div>
          </div>
          
          {/* Bottom row - Links and Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-gray-400 font-mono text-center sm:text-left order-2 sm:order-1">
              © {new Date().getFullYear()} Trainetic.ai - All rights reserved
            </p>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-sm order-1 sm:order-2">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                Privacy
              </Link>
              <Link
                href="/help"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;