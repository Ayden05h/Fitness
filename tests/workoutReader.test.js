const { workoutCalculator } = require('../workoutReader'); 

describe('workoutCalculator', () => {
    test('calculates total workouts and minutes correctly', async () => {
        const result = await workoutCalculator('./data/workouts.csv');
        expect(result.totalWorkouts).toBe(10); 
        expect(result.totalMinutes).toBe(330); 
    });

    test('throws an error if file does not exist', async () => {
        await expect(workoutCalculator('./data/missing-file.csv')).rejects.toThrow();
    });
});
