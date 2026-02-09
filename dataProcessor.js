require('dotenv').config();
const { healthMetricsCounter } = require('./healthReader');
const { workoutCalculator } = require('./workoutReader');

async function processFiles() {
    const userName = process.env.USER_NAME || "User";
    const weeklyGoal = Number(process.env.WEEKLY_GOAL) || 150;

    console.log(`Processing data for: ${userName}\n`);

    try {
        
        console.log("📁 Reading workout data...");
        const workoutData = await workoutCalculator('./data/workouts.csv');

        
        console.log("📁 Reading health data...");
        const healthCount = await healthMetricsCounter('./data/health-metrics.json');

        
        console.log("\n=== SUMMARY ===");
        console.log(`Workouts found: ${workoutData.totalWorkouts}`);
        console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
        console.log(`Health entries found: ${healthCount}`);
        console.log(`Weekly goal: ${weeklyGoal} minutes`);

        if (workoutData.totalMinutes >= weeklyGoal) {
            console.log(`😎 Congratulations ${userName}! You have exceeded your weekly goal!`);
        } else {
            const remaining = weeklyGoal - workoutData.totalMinutes;
            console.log(`😑 Keep going ${userName}! You need ${remaining} more minutes to reach your weekly goal.`);
        }
    } catch (error) {
        console.error("Error processing files:", error.message);
    }
}


processFiles();
