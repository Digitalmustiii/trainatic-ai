"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Dumbbell, Apple, Activity, Calendar, Target, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const userId = user?.id;

  const allPlans = useQuery(api.plans.getUserPlans, userId ? { userId } : "skip");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/');
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (allPlans && allPlans.length > 0 && !selectedPlanId) {
      // Find the most recent active plan or just the first one
      const activePlan = allPlans.find(plan => plan.isActive) || allPlans[0];
      setSelectedPlanId(activePlan._id);
    }
  }, [allPlans, selectedPlanId]);

  const calculateTotalCalories = (meals: any[]) => {
    return meals?.reduce((total, meal) => total + (meal.calories || 0), 0) || 0;
  };

  const calculateTotalExercises = (exercises: any[]) => {
    return exercises?.reduce((total: number, day: any) => 
      total + (day.routines?.length || 0), 0) || 0;
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#00080D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const currentPlan = selectedPlanId && allPlans ? allPlans.find(plan => plan._id === selectedPlanId) : null;

  return (
    <div className="min-h-screen bg-[#00080D] p-3 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header */}
        <Card className="bg-gray-900/90 border-cyan-400/20">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 flex items-center justify-center flex-shrink-0">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt="Profile" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                  ) : (
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-3xl font-bold text-white truncate">
                    Welcome, {user?.firstName || "User"}!
                  </h1>
                  <p className="text-sm sm:text-base text-cyan-400">Your personalized fitness journey</p>
                </div>
              </div>
              <Button 
                onClick={() => router.push('/generate-program')} 
                className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 w-full sm:w-auto text-sm sm:text-base"
              >
                Create New Plan
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Loading state for plans */}
        {allPlans === undefined && (
          <Card className="bg-gray-900/90 border-cyan-400/20">
            <CardContent className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-cyan-400">Loading your plans...</p>
            </CardContent>
          </Card>
        )}

        {allPlans && allPlans.length > 0 ? (
          <>
            {/* Plan Selection */}
            {allPlans.length > 1 && (
              <Card className="bg-gray-900/90 border-cyan-400/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-cyan-400 text-lg sm:text-xl">Your Plans</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {allPlans.map((plan, index) => (
                      <Button
                        key={plan._id}
                        onClick={() => setSelectedPlanId(plan._id)}
                        variant={selectedPlanId === plan._id ? "default" : "outline"}
                        className={`text-xs sm:text-sm flex-shrink-0 ${
                          selectedPlanId === plan._id 
                            ? "bg-cyan-400 hover:bg-cyan-300 text-gray-900" 
                            : "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                        }`}
                      >
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="truncate max-w-[120px] sm:max-w-none">
                          {plan.name || `Plan ${index + 1}`}
                        </span>
                        {plan.isActive && (
                          <Badge className="ml-1 sm:ml-2 bg-green-400/20 text-green-400 text-xs">
                            Active
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentPlan && (
              <>
                {/* Plan Summary */}
                <Card className="bg-gray-900/90 border-cyan-400/20">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <CardTitle className="text-cyan-400 text-lg sm:text-xl">
                        {currentPlan.name || "Your Fitness Plan"}
                      </CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        {currentPlan.isActive && (
                          <Badge className="bg-green-400/20 text-green-400 text-xs sm:text-sm">
                            Active Plan
                          </Badge>
                        )}
                        <Badge className="bg-cyan-400/20 text-cyan-400 text-xs sm:text-sm">
                          {currentPlan.workoutPlan?.schedule?.length || 0} days/week
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 text-center">
                        <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-xs sm:text-sm">Workout Days</p>
                        <p className="text-cyan-400 text-lg sm:text-2xl font-bold">
                          {currentPlan.workoutPlan?.schedule?.length || 0}
                        </p>
                      </div>
                      <div className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 text-center">
                        <Apple className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-xs sm:text-sm">Daily Calories</p>
                        <p className="text-cyan-400 text-lg sm:text-2xl font-bold">
                          {currentPlan.dietPlan?.dailyCalories || 0}
                        </p>
                      </div>
                      <div className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 text-center">
                        <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-xs sm:text-sm">Total Exercises</p>
                        <p className="text-cyan-400 text-lg sm:text-2xl font-bold">
                          {calculateTotalExercises(currentPlan.workoutPlan?.exercises)}
                        </p>
                      </div>
                      <div className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 text-center">
                        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-xs sm:text-sm">Plan Created</p>
                        <p className="text-cyan-400 text-xs sm:text-sm font-bold">
                          {currentPlan._creationTime ? 
                            new Date(currentPlan._creationTime).toLocaleDateString() : 
                            'Recently'
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Workout and Diet Tabs */}
                <Tabs defaultValue="workout" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-900/90 h-auto">
                    <TabsTrigger 
                      value="workout" 
                      className="data-[state=active]:bg-cyan-400 data-[state=active]:text-gray-900 text-xs sm:text-sm py-2 sm:py-3"
                    >
                      <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Workout Plan</span>
                      <span className="sm:hidden">Workout</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="diet" 
                      className="data-[state=active]:bg-cyan-400 data-[state=active]:text-gray-900 text-xs sm:text-sm py-2 sm:py-3"
                    >
                      <Apple className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Diet Plan</span>
                      <span className="sm:hidden">Diet</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="workout">
                    <div className="space-y-4">
                      {/* Workout Schedule Overview */}
                      {currentPlan.workoutPlan?.schedule && currentPlan.workoutPlan.schedule.length > 0 && (
                        <Card className="bg-gray-900/90 border-cyan-400/20 mb-4">
                          <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-cyan-400 flex items-center space-x-2 text-lg sm:text-xl">
                              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Weekly Schedule</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="flex flex-wrap gap-2">
                              {currentPlan.workoutPlan.schedule.map((day: string, index: number) => (
                                <Badge key={index} className="bg-cyan-400/20 text-cyan-400 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Daily Workouts */}
                      {currentPlan.workoutPlan?.exercises && currentPlan.workoutPlan.exercises.length > 0 ? (
                        currentPlan.workoutPlan.exercises.map((day: any, index: number) => (
                          <Card key={index} className="bg-gray-900/90 border-cyan-400/20">
                            <CardHeader className="p-4 sm:p-6">
                              <CardTitle className="text-cyan-400 flex items-center justify-between text-lg sm:text-xl">
                                <div className="flex items-center space-x-2">
                                  <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                                  <span className="truncate">{day.day}</span>
                                </div>
                                <Badge className="bg-cyan-400/20 text-cyan-400 text-xs sm:text-sm">
                                  {day.routines?.length || 0} exercises
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                              {day.routines && day.routines.length > 0 ? (
                                day.routines.map((routine: any, idx: number) => (
                                  <div key={idx} className="p-3 sm:p-4 bg-cyan-400/10 rounded-lg border border-cyan-400/20">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-semibold text-base sm:text-lg mb-1">
                                          {routine.name}
                                        </h4>
                                        {routine.description && (
                                          <p className="text-cyan-200 text-xs sm:text-sm mb-2">
                                            {routine.description}
                                          </p>
                                        )}
                                        {routine.notes && (
                                          <p className="text-cyan-300 text-xs sm:text-sm italic">
                                            💡 {routine.notes}
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                        {routine.sets && (
                                          <Badge className="bg-cyan-400/30 text-cyan-300 text-xs flex-1 sm:flex-none">
                                            <Dumbbell className="w-3 h-3 mr-1" />
                                            {routine.sets} sets
                                          </Badge>
                                        )}
                                        {routine.reps && (
                                          <Badge className="bg-cyan-400/30 text-cyan-300 text-xs flex-1 sm:flex-none">
                                            <Activity className="w-3 h-3 mr-1" />
                                            {routine.reps} reps
                                          </Badge>
                                        )}
                                        {routine.duration && (
                                          <Badge className="bg-cyan-400/30 text-cyan-300 text-xs flex-1 sm:flex-none">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {routine.duration}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-6 sm:py-8">
                                  <Activity className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3" />
                                  <p className="text-gray-400 text-sm sm:text-base">
                                    No exercises scheduled for this day
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card className="bg-gray-900/90 border-cyan-400/20">
                          <CardContent className="text-center py-8 sm:py-12">
                            <Dumbbell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                              No Workout Plan Available
                            </h3>
                            <p className="text-cyan-400 mb-6 text-sm sm:text-base">
                              Your workout plan might be loading or not yet created.
                            </p>
                            <Button 
                              onClick={() => router.push('/generate-program')} 
                              className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 w-full sm:w-auto"
                            >
                              Generate New Plan
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="diet">
                    <Card className="bg-gray-900/90 border-cyan-400/20">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-cyan-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="flex items-center space-x-2">
                            <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-lg sm:text-xl">Daily Nutrition Plan</span>
                          </div>
                          {currentPlan.dietPlan?.dailyCalories && (
                            <Badge className="bg-cyan-400 text-gray-900 text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                              {currentPlan.dietPlan.dailyCalories} kcal/day
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                        {currentPlan.dietPlan?.meals && currentPlan.dietPlan.meals.length > 0 ? (
                          <>
                            {/* Nutrition Summary */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                              <div className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 text-center">
                                <Apple className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-2" />
                                <p className="text-white font-medium text-sm">Meals per Day</p>
                                <p className="text-cyan-400 text-lg sm:text-xl font-bold">
                                  {currentPlan.dietPlan.meals.length}
                                </p>
                              </div>
                              <div className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 text-center">
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-2" />
                                <p className="text-white font-medium text-sm">Total Calories</p>
                                <p className="text-cyan-400 text-lg sm:text-xl font-bold">
                                  {calculateTotalCalories(currentPlan.dietPlan.meals)}
                                </p>
                              </div>
                              <div className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 text-center">
                                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-2" />
                                <p className="text-white font-medium text-sm">Avg per Meal</p>
                                <p className="text-cyan-400 text-lg sm:text-xl font-bold">
                                  {Math.round(calculateTotalCalories(currentPlan.dietPlan.meals) / currentPlan.dietPlan.meals.length) || 0}
                                </p>
                              </div>
                            </div>

                            {/* Meal Details */}
                            <div className="space-y-4">
                              {currentPlan.dietPlan.meals.map((meal: any, index: number) => (
                                <div key={index} className="bg-cyan-400/10 rounded-lg p-3 sm:p-4 border border-cyan-400/20">
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                                    <h4 className="text-cyan-400 font-semibold text-base sm:text-lg flex items-center">
                                      <Apple className="w-4 h-4 mr-2" />
                                      {meal.name}
                                    </h4>
                                    {meal.calories && (
                                      <Badge className="bg-cyan-400/30 text-cyan-300 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                                        {meal.calories} kcal
                                      </Badge>
                                    )}
                                  </div>
                                  {meal.foods && meal.foods.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {meal.foods.map((food: string, idx: number) => (
                                        <div key={idx} className="flex items-center text-white text-xs sm:text-sm bg-gray-800/50 rounded px-2 sm:px-3 py-2">
                                          <span className="text-cyan-400 mr-2">•</span>
                                          <span className="break-words">{food}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-400 italic text-sm">No specific foods listed</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8 sm:py-12">
                            <Apple className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                              No Diet Plan Available
                            </h3>
                            <p className="text-cyan-400 mb-6 text-sm sm:text-base">
                              Your nutrition plan might be loading or not yet created.
                            </p>
                            <Button 
                              onClick={() => router.push('/generate-program')} 
                              className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 w-full sm:w-auto"
                            >
                              Generate New Plan
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}

            {!currentPlan && selectedPlanId && (
              <Card className="bg-gray-900/90 border-red-400/20">
                <CardContent className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Plan Not Found</h3>
                  <p className="text-red-400 mb-6 text-sm sm:text-base">
                    The selected plan could not be loaded.
                  </p>
                  <Button 
                    onClick={() => router.push('/generate-program')} 
                    className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 w-full sm:w-auto"
                  >
                    Create New Plan
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ) : allPlans && allPlans.length === 0 ? (
          <Card className="bg-gray-900/90 border-cyan-400/20">
            <CardContent className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-400/20 to-cyan-300/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">No Fitness Plans Yet</h3>
              <p className="text-cyan-400 text-base sm:text-lg mb-8 max-w-md mx-auto px-4">
                Ready to start your fitness journey? Create your first personalized workout and nutrition plan!
              </p>
              <Button 
                onClick={() => router.push('/generate-program')} 
                className="bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-gray-900 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto"
              >
                <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Generate Your First Plan
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;