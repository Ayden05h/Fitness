const fs = require('fs').promises;
async function healthMetricsCounter(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');
        const healthData = JSON.parse(data);
        const totalEntries = healthData.metrics.length;
        console.log(`Total health entries: ${totalEntries}`);
        return totalEntries
    } catch (error) {
        console.error('Error reading health data:', error.message);
        return 0;
    }
}

if (require.main === module) {
    healthMetricsCounter("./data/health-metrics.json");
}

module.exports = { healthMetricsCounter };