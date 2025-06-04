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
    <Bot key="bot" className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
    <Cpu key="cpu" className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
    <Zap key="zap" className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
  ];

  return (
    <div className="w-full pb-16 sm:pb-24 pt-12 sm:pt-16 relative" style={{ backgroundColor: '#00080D' }}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* HEADER - PROGRAM GALLERY */}
        <div className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20 rounded-lg overflow-hidden mb-12 sm:mb-16">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 border-b border-cyan-400/20 bg-gray-800/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"></div>
              <span className="text-xs sm:text-sm text-cyan-400 font-medium font-mono">Program Gallery</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-mono">Featured Plans</div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-4 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-white">AI-Generated </span>
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">Programs</span>
            </h2>

            <p className="text-sm sm:text-lg text-gray-300 max-w-xl mx-auto mb-6 sm:mb-10 px-2">
              Explore personalized fitness plans our AI assistant has created for other users
            </p>

            {/* STATS */}
            <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-16 mt-6 sm:mt-10 font-mono">
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-3xl bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">500+</p>
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mt-1">
                  PROGRAMS
                </p>
              </div>
              <div className="w-px h-8 sm:h-12 bg-cyan-400/20"></div>
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-3xl bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">3min</p>
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mt-1">
                  CREATION
                </p>
              </div>
              <div className="w-px h-8 sm:h-12 bg-cyan-400/20"></div>
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-3xl bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">100%</p>
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mt-1">
                  PERSONAL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {USER_PROGRAMS.map((program, index) => (
            <Card
              key={program.id}
              className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 overflow-hidden"
            >
              {/* Card header with user info */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-cyan-400/20 bg-gray-800/70">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400"></div>
                  <span className="text-xs sm:text-sm text-cyan-400 font-mono">AI.{program.id}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-mono">
                  {program.fitness_level.toUpperCase()}
                </div>
              </div>

              <CardHeader className="pt-4 sm:pt-6 px-3 sm:px-5">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 relative flex items-center justify-center flex-shrink-0">
                    {aiAvatars[index % aiAvatars.length]}
                    {/* Scan line effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-xl text-white font-mono truncate">
                      {program.first_name}
                    </CardTitle>
                    <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 mt-1 font-mono">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{program.age}y • {program.workout_days}d/week</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <div className="px-2 sm:px-3 py-1 bg-cyan-400/10 rounded border border-cyan-400/20 text-xs sm:text-sm text-cyan-400 flex items-center gap-2 font-mono">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{program.fitness_goal}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 font-mono">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                    v3.5
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-3 sm:px-5">
                {/* Program details */}
                <div className="space-y-3 sm:space-y-5 pt-2">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-md bg-cyan-400/10 text-cyan-400 mt-0.5 border border-cyan-400/20 flex-shrink-0">
                      <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white font-mono text-sm sm:text-base truncate">
                        {program.workout_plan.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono truncate">
                        {program.equipment_access}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-md bg-cyan-400/10 text-cyan-400 mt-0.5 border border-cyan-400/20 flex-shrink-0">
                      <AppleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white font-mono text-sm sm:text-base truncate">
                        {program.diet_plan.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
                        System optimized nutrition
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-md bg-cyan-400/10 text-cyan-400 mt-0.5 border border-cyan-400/20 flex-shrink-0">
                      <ShieldIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white font-mono text-sm sm:text-base">
                        AI Safety Protocols
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
                        Protection systems enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program description */}
                <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-cyan-400/20">
                  <div className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                    <span className="text-cyan-400">&gt; </span>
                    {program.workout_plan.description.substring(0, 100)}...
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-3 sm:px-5 py-3 sm:py-4 border-t border-cyan-400/20">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm font-mono">Active</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 fill-current" />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-400 ml-2 font-mono">5.0</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <Link href="/generate-program">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-gray-900 hover:from-cyan-300 hover:to-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-mono font-semibold w-full sm:w-auto"
            >
              Generate Your Program
              <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <p className="text-gray-300 mt-4 font-mono text-sm sm:text-base">
            Join 500+ users with AI-customized fitness programs
          </p>
        </div>

        {/* Gradient separator at bottom */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mt-12 sm:mt-16"></div>
      </div>
    </div>
  );
};

export default UserPrograms;