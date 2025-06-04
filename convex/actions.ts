// convex/actions.ts
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const generateFitnessPlan = action({
  args: {
    userId: v.string(),
    age: v.optional(v.string()),
    height: v.optional(v.string()),
    weight: v.optional(v.string()),
    injuries: v.optional(v.string()),
    frequency: v.optional(v.string()),
    goal: v.optional(v.string()),
    level: v.optional(v.string()),
    restrictions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      console.log("Generating AI fitness plan...");
      
      // Generate AI plans using OpenAI
      const aiPlans = await generateAIPlan(args);
      
      // Save to database using mutation
      await ctx.runMutation(api.plans.createPlan, {
        userId: args.userId,
        dietPlan: aiPlans.dietPlan,
        workoutPlan: aiPlans.workoutPlan,
        isActive: true,
        name: `${args.goal || "Custom"} Plan`,
      });

      console.log("Successfully saved AI-generated fitness plan");
      return { 
        success: true, 
        workoutPlan: aiPlans.workoutPlan,
        dietPlan: aiPlans.dietPlan 
      };
    } catch (error) {
      console.error("Error generating fitness plan:", error);
      return { success: false, error: String(error) };
    }
  },
});

async function generateAIPlan(userInputs: {
  age?: string;
  height?: string;
  weight?: string;
  injuries?: string;
  frequency?: string;
  goal?: string;
  level?: string;
  restrictions?: string;
}) {
  const { age, height, weight, injuries, frequency, goal, level, restrictions } = userInputs;
  
  try {
    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional fitness trainer and nutritionist. Create personalized workout and diet plans based on user information. Always respond with valid JSON only, no additional text.'
          },
          {
            role: 'user',
            content: `Create a personalized fitness plan for:
            - Age: ${age || 'Not specified'}
            - Height: ${height || 'Not specified'}
            - Weight: ${weight || 'Not specified'}
            - Injuries: ${injuries || 'None'}
            - Workout frequency: ${frequency || '3'} days per week
            - Goal: ${goal || 'General fitness'}
            - Fitness level: ${level || 'Beginner'}
            - Dietary restrictions: ${restrictions || 'None'}
            
            Return a JSON object with this exact structure:
            {
              "workoutPlan": {
                "schedule": ["Monday", "Tuesday", "Wednesday"],
                "exercises": [
                  {
                    "day": "Monday",
                    "routines": [
                      {
                        "name": "Exercise Name", 
                        "sets": 3, 
                        "reps": 12, 
                        "duration": "30 seconds",
                        "description": "form tips and instructions"
                      }
                    ]
                  }
                ]
              },
              "dietPlan": {
                "dailyCalories": 2200,
                "meals": [
                  {"name": "Breakfast", "foods": ["Food1", "Food2"]}
                ]
              }
            }`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response
    const plans = JSON.parse(aiResponse);
    return plans;
    
  } catch (error) {
    console.error('AI generation error:', error);
    // Fallback to a randomized plan if AI fails
    return generateFallbackPlan(userInputs);
  }
}

// Define types for exercises and plans
interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: string;
  description: string;
}

interface DayWorkout {
  day: string;
  routines: Exercise[];
}

interface WorkoutPlan {
  schedule: string[];
  exercises: DayWorkout[];
}

interface Meal {
  name: string;
  foods: string[];
}

interface DietPlan {
  dailyCalories: number;
  meals: Meal[];
}

interface FitnessPlan {
  workoutPlan: WorkoutPlan;
  dietPlan: DietPlan;
}

function generateFallbackPlan(userInputs: {
  frequency?: string;
  goal?: string;
  level?: string;
}): FitnessPlan {
  // Enhanced exercise database with different categories
  const exercisesByCategory: Record<string, Exercise[]> = {
    cardio: [
      { name: "Jumping Jacks", duration: "60 seconds", description: "Full body cardio movement, keep steady rhythm" },
      { name: "High Knees", duration: "45 seconds", description: "Run in place, bring knees up high to waist level" },
      { name: "Burpees", sets: 2, reps: 8, description: "Full body movement, jump at the top with arms overhead" },
      { name: "Mountain Climbers", duration: "45 seconds", description: "Keep core tight, alternate legs quickly in plank position" },
      { name: "Jump Squats", sets: 3, reps: 12, description: "Explosive jump from squat position, land softly" },
    ],
    strength: [
      { name: "Push-ups", sets: 3, reps: 12, description: "Keep body straight, lower chest to ground, full range of motion" },
      { name: "Squats", sets: 3, reps: 15, description: "Go down until thighs parallel to ground, keep chest up" },
      { name: "Lunges", sets: 3, reps: 10, description: "Step forward, lower back knee toward ground, alternate legs" },
      { name: "Pike Push-ups", sets: 3, reps: 8, description: "Downward dog position, lower head toward hands" },
      { name: "Single-leg Glute Bridges", sets: 3, reps: 12, description: "Squeeze glutes at top, control the movement" },
    ],
    core: [
      { name: "Planks", duration: "45 seconds", description: "Hold position steady, keep core tight and body straight" },
      { name: "Bicycle Crunches", sets: 3, reps: 20, description: "Alternate elbow to opposite knee, controlled movement" },
      { name: "Dead Bug", sets: 3, reps: 10, description: "Opposite arm and leg extensions, keep lower back pressed down" },
      { name: "Russian Twists", sets: 3, reps: 20, description: "Rotate torso side to side, keep feet elevated" },
      { name: "Wall Sit", duration: "45 seconds", description: "Back against wall, thighs parallel to ground" },
    ],
    flexibility: [
      { name: "Cat-Cow Stretch", sets: 1, reps: 10, description: "Gentle spinal movement, hold each position briefly" },
      { name: "Hip Circles", sets: 1, reps: 10, description: "Large circles with hips, both directions" },
      { name: "Arm Circles", sets: 1, reps: 15, description: "Forward and backward, gradually increase size" },
      { name: "Leg Swings", sets: 1, reps: 12, description: "Forward and back, side to side, hold wall for balance" },
      { name: "Shoulder Rolls", sets: 1, reps: 10, description: "Backward and forward rolls, relax shoulders" },
    ]
  };

  const foods: string[][] = [
    ["Oatmeal with berries", "Greek yogurt", "Almonds"],
    ["Scrambled eggs", "Avocado toast", "Fresh fruit"],
    ["Protein smoothie", "Banana", "Peanut butter"],
    ["Grilled chicken breast", "Brown rice", "Steamed broccoli"],
    ["Baked salmon", "Quinoa", "Roasted vegetables"],
    ["Turkey wrap", "Sweet potato", "Mixed greens"],
    ["Lean beef", "Wild rice", "Asparagus"],
    ["Tofu stir-fry", "Brown rice", "Mixed vegetables"]
  ];

  // Parse the frequency (could be "3", "5 days", etc.)
  const workoutDays = parseInt(userInputs.frequency?.toString().split(' ')[0] || "3");
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const schedule = allDays.slice(0, workoutDays);

  // Create a balanced workout plan
  const workoutExercises: DayWorkout[] = schedule.map((day, dayIndex) => {
    const routines: Exercise[] = [];
    
    // Determine workout focus based on day and total frequency
    let focusAreas: string[] = [];
    
    if (workoutDays <= 3) {
      // Full body workouts for 3 or fewer days
      focusAreas = ['cardio', 'strength', 'core'];
    } else if (workoutDays <= 5) {
      // Split routine for 4-5 days
      const focuses = [
        ['cardio', 'core'],
        ['strength', 'flexibility'], 
        ['cardio', 'strength'],
        ['core', 'flexibility'],
        ['strength', 'cardio']
      ];
      focusAreas = focuses[dayIndex % focuses.length];
    } else {
      // 6-7 days - more specialized
      const focuses = [
        ['strength'], 
        ['cardio'], 
        ['core', 'flexibility'],
        ['strength'], 
        ['cardio'], 
        ['core'],
        ['flexibility']
      ];
      focusAreas = focuses[dayIndex % focuses.length];
    }

    // Add exercises from each focus area
    focusAreas.forEach(category => {
      const exercisesInCategory = exercisesByCategory[category];
      if (exercisesInCategory) {
        const numExercises = Math.max(1, Math.floor(4 / focusAreas.length));
        
        // Shuffle and take exercises from this category
        const shuffled = [...exercisesInCategory].sort(() => 0.5 - Math.random());
        const selectedExercises = shuffled.slice(0, numExercises);
        
        routines.push(...selectedExercises);
      }
    });

    // Ensure we have at least 3 exercises per day
    while (routines.length < 3) {
      const allExercises = Object.values(exercisesByCategory).flat();
      const randomExercise = allExercises[Math.floor(Math.random() * allExercises.length)];
      if (!routines.find(r => r.name === randomExercise.name)) {
        routines.push(randomExercise);
      }
    }

    return {
      day: day,
      routines: routines.slice(0, 5) // Cap at 5 exercises per day
    };
  });

  // Shuffle foods for variety
  const randomFoods = foods.sort(() => 0.5 - Math.random()).slice(0, 4);

  return {
    workoutPlan: {
      schedule,
      exercises: workoutExercises
    },
    dietPlan: {
      dailyCalories: 1800 + Math.floor(Math.random() * 600), // 1800-2400 calories
      meals: [
        { name: "Breakfast", foods: randomFoods[0] },
        { name: "Lunch", foods: randomFoods[1] },
        { name: "Dinner", foods: randomFoods[2] },
        { name: "Snack", foods: randomFoods[3] || ["Mixed nuts", "Fruit"] }
      ]
    }
  };
}