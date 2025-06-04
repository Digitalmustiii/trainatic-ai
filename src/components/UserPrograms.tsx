import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dumbbell,
  Sparkles,
  Users,
  Clock,
  AppleIcon,
  ShieldIcon,
  Bot,
  Cpu,
  Zap,
  Star,
  CheckCircle,
} from "lucide-react";
import { USER_PROGRAMS } from "@/constants";

const UserPrograms = () => {
  // AI Avatar icons to replace user profile pictures
const aiAvatars = [
  <Bot key="bot" className="w-8 h-8 text-cyan-400" />,
  <Cpu key="cpu" className="w-8 h-8 text-cyan-400" />,
  <Zap key="zap" className="w-8 h-8 text-cyan-400" />,
];


  return (
    <div className="w-full pb-24 pt-16 relative" style={{ backgroundColor: '#00080D' }}>
      <div className="container mx-auto max-w-6xl px-4">
        {/* HEADER- PROGRAM GALLERY */}
        <div className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20 rounded-lg overflow-hidden mb-16">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-400/20 bg-gray-800/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
              <span className="text-sm text-cyan-400 font-medium font-mono">Program Gallery</span>
            </div>
            <div className="text-sm text-gray-400 font-mono">Featured Plans</div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">AI-Generated </span>
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Programs</span>
            </h2>

            <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">
              Explore personalized fitness plans our AI assistant has created for other users
            </p>

            {/* STATS */}
            <div className="flex items-center justify-center gap-16 mt-10 font-mono">
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">500+</p>
                <p className="text-sm text-gray-400 uppercase tracking-wide mt-1">
                  PROGRAMS
                </p>
              </div>
              <div className="w-px h-12 bg-cyan-400/20"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">3min</p>
                <p className="text-sm text-gray-400 uppercase tracking-wide mt-1">
                  CREATION TIME
                </p>
              </div>
              <div className="w-px h-12 bg-cyan-400/20"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">100%</p>
                <p className="text-sm text-gray-400 uppercase tracking-wide mt-1">
                  PERSONALIZED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program, index) => (
            <Card
              key={program.id}
              className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 overflow-hidden"
            >
              {/* Card header with user info */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-400/20 bg-gray-800/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span className="text-sm text-cyan-400 font-mono">AI.{program.id}</span>
                </div>
                <div className="text-sm text-gray-400 font-mono">
                  {program.fitness_level.toUpperCase()}
                </div>
              </div>

              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 relative flex items-center justify-center">
                    {aiAvatars[index % aiAvatars.length]}
                    {/* Scan line effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse rounded-full" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white font-mono">
                      {program.first_name}
                      <span className="text-cyan-400"></span>
                    </CardTitle>
                    <div className="text-sm text-gray-400 flex items-center gap-2 mt-1 font-mono">
                      <Users className="h-4 w-4 text-cyan-400" />
                      {program.age}y • {program.workout_days}d/week
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="px-3 py-1 bg-cyan-400/10 rounded border border-cyan-400/20 text-sm text-cyan-400 flex items-center gap-2 font-mono">
                    <Sparkles className="h-4 w-4" />
                    {program.fitness_goal}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-2 font-mono">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    v3.5
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5">
                {/* Program details */}
                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-cyan-400/10 text-cyan-400 mt-0.5 border border-cyan-400/20">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white font-mono">
                          {program.workout_plan.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 font-mono">
                        {program.equipment_access}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-cyan-400/10 text-cyan-400 mt-0.5 border border-cyan-400/20">
                      <AppleIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white font-mono">{program.diet_plan.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 font-mono">
                        System optimized nutrition
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-cyan-400/10 text-cyan-400 mt-0.5 border border-cyan-400/20">
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white font-mono">AI Safety Protocols</h3>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 font-mono">
                        Protection systems enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program description */}
                <div className="mt-5 pt-5 border-t border-cyan-400/20">
                  <div className="text-sm text-gray-300 font-mono">
                    <span className="text-cyan-400">&gt; </span>
                    {program.workout_plan.description.substring(0, 120)}...
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-5 py-4 border-t border-cyan-400/20">
                {/* Replace the broken link with a status indicator */}
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-mono">Program Active</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-cyan-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-400 ml-2 font-mono">5.0</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-16 text-center">
          <Link href="/generate-program">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-gray-900 hover:from-cyan-300 hover:to-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 px-8 py-6 text-lg font-mono font-semibold"
            >
              Generate Your Program
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-gray-300 mt-4 font-mono">
            Join 500+ users with AI-customized fitness programs
          </p>
        </div>

        {/* Gradient separator at bottom */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mt-16"></div>
      </div>
    </div>
  );
};

export default UserPrograms;