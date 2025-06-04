import { BrainCircuitIcon, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#00080D] pt-20 pb-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 rounded-xl border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300">
              <BrainCircuitIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold font-mono tracking-tight">
              <span className="text-white">Train</span>
              <span className="text-cyan-400">etic</span>
              <span className="text-cyan-400">.ai</span>
            </span>
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Terms of </span>
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-gray-400 font-mono">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <Card className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20">
          <div className="p-8 space-y-8">
            {/* Section 1 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 font-mono">Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using Trainetic.ai, you accept and agree to be bound by these terms. 
                  This AI-powered fitness platform is designed to provide personalized workout and nutrition plans.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 font-mono">Use of Service</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Trainetic.ai provides AI-generated fitness and nutrition recommendations. You agree to:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Provide accurate information about your fitness level and health</li>
                  <li>• Consult healthcare professionals before starting any new fitness program</li>
                  <li>• Use the platform responsibly and not misuse the AI-generated content</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                <BrainCircuitIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 font-mono">AI Disclaimers</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our AI generates fitness plans based on the information you provide. These recommendations are not 
                  medical advice. Always consult qualified professionals for health-related decisions.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-cyan-400/20">
              <p className="text-sm text-gray-400 font-mono text-center">
                This is a portfolio project demonstrating AI fitness application development.
              </p>
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;