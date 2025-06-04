"use client"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ChevronLeft, ChevronRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

interface FormData {
  age: number;
  weight: number;
  height: number;
  injuries: string;
  goal: string;
  frequency: number;
  level: string;
  restrictions: string;
}

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "General Fitness",
  "Strength Training",
  "Endurance",
  "Flexibility"
];

const FITNESS_LEVELS = [
  "Beginner",
  "Intermediate", 
  "Advanced"
];

const COMMON_INJURIES = [
  "None",
  "Knee Problems",
  "Back Pain",
  "Shoulder Issues",
  "Ankle Problems",
  "Wrist Pain",
  "Other"
];

const DIETARY_RESTRICTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Low-Carb",
  "Other"
];

export default function GenerateProgramPage() {
  const { user } = useUser();
  const router = useRouter();
  const generatePlan = useAction(api.actions.generateFitnessPlan);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    age: 25,
    weight: 70,
    height: 170,
    injuries: "None",
    goal: "General Fitness",
    frequency: 3,
    level: "Beginner",
    restrictions: "None"
  });
  const [customInjury, setCustomInjury] = useState("");
  const [customRestriction, setCustomRestriction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const totalSteps = 8;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep) {
      submitData();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const submitData = async () => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const finalInjuries = formData.injuries === "Other" ? customInjury : formData.injuries;
      const finalRestrictions = formData.restrictions === "Other" ? customRestriction : formData.restrictions;
      
      const result = await generatePlan({
        userId: user.id,
        age: formData.age.toString(),
        height: formData.height.toString(),
        weight: formData.weight.toString(),
        injuries: finalInjuries,
        frequency: formData.frequency.toString(),
        goal: formData.goal,
        level: formData.level,
        restrictions: finalRestrictions,
      });

      if (result.success) {
        setSuccess(true);
        // Small delay to show success message before redirect
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      } else {
        setError(result.error || "Failed to generate plan");
      }
    } catch (err) {
      console.error("Error generating plan:", err);
      setError("An unexpected error occurred while generating your plan");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#00080D] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900/90 border-cyan-400/20">
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-gray-900" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Plan Generated Successfully!</h2>
              <p className="text-cyan-400">Your personalized fitness plan is ready. Redirecting to your profile...</p>
            </div>
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </Card>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Age
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                What&apos;s your age?
              </h2>
              <p className="text-gray-400">This helps us tailor your workout intensity</p>
            </div>
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 rounded-2xl border border-cyan-400/20">
                <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  {formData.age}
                </span>
                <span className="text-xl text-gray-300 ml-3">years old</span>
              </div>
              <div className="px-6">
                <input
                  type="range"
                  min="16"
                  max="80"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-700/50 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-3 font-medium">
                  <span>16</span>
                  <span>80</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Weight
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                What&apos;s your weight?
              </h2>
              <p className="text-gray-400">This helps us calculate your nutritional needs</p>
            </div>
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 rounded-2xl border border-cyan-400/20">
                <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  {formData.weight}
                </span>
                <span className="text-xl text-gray-300 ml-3">kg</span>
              </div>
              <div className="px-6">
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-700/50 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-3 font-medium">
                  <span>40kg</span>
                  <span>150kg</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Height
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                What&apos;s your height?
              </h2>
              <p className="text-gray-400">This helps us assess your body composition goals</p>
            </div>
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 rounded-2xl border border-cyan-400/20">
                <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  {formData.height}
                </span>
                <span className="text-xl text-gray-300 ml-3">cm</span>
              </div>
              <div className="px-6">
                <input
                  type="range"
                  min="140"
                  max="220"
                  value={formData.height}
                  onChange={(e) => updateFormData('height', parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-700/50 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-3 font-medium">
                  <span>140cm</span>
                  <span>220cm</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Injuries
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                Any injuries or physical limitations?
              </h2>
              <p className="text-gray-400">We&apos;ll customize your plan to work around any issues</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {COMMON_INJURIES.map((injury) => (
                <button
                  key={injury}
                  onClick={() => updateFormData('injuries', injury)}
                  className={`p-4 rounded-xl border-2 transition-all font-medium ${
                    formData.injuries === injury
                      ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20'
                      : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:bg-gray-800/70'
                  }`}
                >
                  {injury}
                </button>
              ))}
            </div>
            {formData.injuries === "Other" && (
              <input
                type="text"
                placeholder="Please specify your injury or limitation"
                value={customInjury}
                onChange={(e) => setCustomInjury(e.target.value)}
                className="w-full p-4 bg-gray-800/50 border-2 border-gray-600 focus:border-cyan-400 text-white rounded-xl focus:outline-none focus:ring-0 transition-colors placeholder-gray-400"
              />
            )}
          </div>
        );

      case 4: // Fitness Goal
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                What&apos;s your primary fitness goal?
              </h2>
              <p className="text-gray-400">Choose the goal that matters most to you</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {FITNESS_GOALS.map((goal) => (
                <button
                  key={goal}
                  onClick={() => updateFormData('goal', goal)}
                  className={`p-5 rounded-xl border-2 transition-all font-medium ${
                    formData.goal === goal
                      ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20'
                      : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:bg-gray-800/70'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        );

      case 5: // Workout Frequency
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                How many days per week can you workout?
              </h2>
              <p className="text-gray-400">Be realistic about your schedule for best results</p>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                <button
                  key={days}
                  onClick={() => updateFormData('frequency', days)}
                  className={`w-20 h-20 rounded-2xl border-2 transition-all font-bold text-xl ${
                    formData.frequency === days
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 border-cyan-400 text-gray-900 shadow-lg shadow-cyan-400/30'
                      : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:bg-gray-800/70'
                  }`}
                >
                  {days}
                </button>
              ))}
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 rounded-xl border border-cyan-400/20">
              <p className="text-gray-300 font-medium">
                Selected: <span className="text-cyan-400 font-bold">{formData.frequency}</span> day{formData.frequency !== 1 ? 's' : ''} per week
              </p>
            </div>
          </div>
        );

      case 6: // Fitness Level
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                What&apos;s your fitness level?
              </h2>
              <p className="text-gray-400">This helps us set the right difficulty level</p>
            </div>
            <div className="space-y-4">
              {FITNESS_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => updateFormData('level', level)}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    formData.level === level
                      ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20'
                      : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:bg-gray-800/70'
                  }`}
                >
                  <div className="font-semibold text-lg">{level}</div>
                  <div className="text-sm mt-1 opacity-80">
                    {level === "Beginner" && "New to fitness or returning after a break"}
                    {level === "Intermediate" && "Regular exercise routine for 6+ months"}
                    {level === "Advanced" && "Consistent training for 2+ years"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 7: // Dietary Restrictions
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4">
                Any dietary restrictions?
              </h2>
              <p className="text-gray-400">We&apos;ll customize your meal plan accordingly</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {DIETARY_RESTRICTIONS.map((restriction) => (
                <button
                  key={restriction}
                  onClick={() => updateFormData('restrictions', restriction)}
                  className={`p-4 rounded-xl border-2 transition-all font-medium ${
                    formData.restrictions === restriction
                      ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20'
                      : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:bg-gray-800/70'
                  }`}
                >
                  {restriction}
                </button>
              ))}
            </div>
            {formData.restrictions === "Other" && (
              <input
                type="text"
                placeholder="Please specify your dietary restrictions"
                value={customRestriction}
                onChange={(e) => setCustomRestriction(e.target.value)}
                className="w-full p-4 bg-gray-800/50 border-2 border-gray-600 focus:border-cyan-400 text-white rounded-xl focus:outline-none focus:ring-0 transition-colors placeholder-gray-400"
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#00080D] p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-900/90 border-cyan-400/20 backdrop-blur-sm">
          <div className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">Create Your Fitness Plan</h1>
                <span className="text-cyan-400 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-cyan-300 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderStep()}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-400/20 rounded-xl">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={loading}
                className="bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-gray-900 font-medium"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : isLastStep ? (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Plan
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}