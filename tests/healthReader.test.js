const { healthMetricsCounter } = require('../healthReader');

describe('healthMetricsCounter', () => {
    test('counts health entries correctly', async () => {
        const count = await healthMetricsCounter('./data/health-metrics.json');
        expect(count).toBe(8); 
    });

    test('returns 0 if file does not exist', async () => {
        const count = await healthMetricsCounter('./data/missing-file.json');
        expect(count).toBe(0);
    });
});
