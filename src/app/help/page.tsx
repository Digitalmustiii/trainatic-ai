"use client"
import { BrainCircuitIcon, Mail, MessageCircle, Bot, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HelpPage = () => {
  const handleEmailContact = () => {
    window.location.href = "mailto:sanusimustapha387@gmail.com?subject=Trainetic.ai Support Request";
  };

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
            <span className="text-white">Help & </span>
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Support</span>
          </h1>
          <p className="text-gray-400 font-mono">Get assistance with your AI fitness journey</p>
        </div>

        {/* FAQ Section */}
        <Card className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20 mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-cyan-400" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">How does the AI generate my fitness plan?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our AI analyzes your personal information (age, fitness level, goals) to create customized 
                    workout routines and nutrition plans tailored specifically to your needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">How long does it take to generate a plan?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Plan generation typically takes 2-3 minutes. Our AI processes your information and creates 
                    comprehensive workout and nutrition recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1 border border-cyan-400/20">
                  <BrainCircuitIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">Can I modify my generated plan?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Currently, you can generate new plans with updated preferences. Future versions will include 
                    plan editing and progression tracking features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-400/30">
              <Mail className="h-8 w-8 text-cyan-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4 font-mono">Need More Help?</h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              Have questions, feedback, or need technical support? I&apos;d love to hear from you!
            </p>
            
            <Button
              onClick={handleEmailContact}
              className="bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-gray-900 font-mono font-semibold px-8 py-3 text-lg"
            >
              <Mail className="w-5 h-5 mr-3" />
              Contact Support
            </Button>
            
            <p className="text-sm text-gray-400 mt-4 font-mono">
              Response time: Usually within 24 hours
            </p>
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

export default HelpPage;