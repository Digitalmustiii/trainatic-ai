import { BrainCircuitIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-cyan-400/20 bg-gradient-to-r from-background/70 via-background/80 to-background/70 backdrop-blur-xl shadow-lg shadow-cyan-400/5">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
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
            <p className="text-sm text-gray-400 font-mono">
              © {new Date().getFullYear()} Trainetic.ai - All rights reserved
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2 text-sm">
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
          
          {/* Status */}
          <div className="flex items-center gap-2 px-4 py-2 border border-cyan-400/30 rounded-lg bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50"></div>
            <span className="text-xs font-mono text-cyan-400 font-medium">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;