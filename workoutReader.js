const fs = require('fs');
const csv = require('csv-parser');

function workoutCalculator(filePath) {
    return new Promise((resolve, reject) => {
        let totalMinutes = 0;
        let totalWorkouts = 0;

        
        if (!fs.existsSync(filePath)) {
            console.error("Error: Workout file does not exist.");
            return reject(new Error("Workout file not found"));
        }

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                totalWorkouts++;
                totalMinutes += Number(row.duration) || 0; 
            })
            .on('end', () => {
                console.log(`Total workouts: ${totalWorkouts}`);
                console.log(`Total minutes: ${totalMinutes}`);
                resolve({ totalWorkouts, totalMinutes });
            })
            .on('error', (err) => {
                console.error("Error reading workout file:", err.message);
                reject(err);
            });
    });
}

if (require.main === module) {
    workoutCalculator('./data/workouts.csv').catch(() => {});
}

module.exports = { workoutCalculator };
