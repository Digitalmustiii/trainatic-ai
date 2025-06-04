
import { BrainCircuitIcon, Lock, Eye, Database } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const PrivacyPage = () => {
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
            <span className="text-white">Privacy </span>
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-gray-400 font-mono">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <Card className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20">
          <div className="p-8 space-y-8">
            {/* Section 1 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 font-mono">Data Collection</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  We collect the following information to provide personalized fitness plans:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Basic profile information (age, height, weight)</li>
                  <li>• Fitness goals and experience level</li>
                  <li>• Workout preferences and dietary restrictions</li>
                  <li>• Usage data to improve our AI recommendations</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 font-mono">Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  Your data is encrypted and stored securely. We implement industry-standard security measures 
                  to protect your personal information. We never sell your data to third parties.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 font-mono">Data Usage</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Your information is used solely to:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Generate personalized AI fitness and nutrition plans</li>
                  <li>• Improve our recommendation algorithms</li>
                  <li>• Provide customer support when needed</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                <BrainCircuitIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3 font-mono">Your Rights</h2>
                <p className="text-gray-300 leading-relaxed">
                  You have the right to access, update, or delete your personal data at any time. 
                  Contact us if you wish to exercise these rights or have privacy concerns.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-cyan-400/20">
              <p className="text-sm text-gray-400 font-mono text-center">
                This is a portfolio project. 
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

export default PrivacyPage;