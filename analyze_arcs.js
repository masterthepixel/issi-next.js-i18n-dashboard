// Script to analyze landing points in GlobeDemo sampleArcs
const arcs = [
    { startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729 },
    { startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869 },
    { startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443 },
    { startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503 },
    { startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869 },
    { startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411 },
    { startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694 },
    { startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006 },
    { startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276 },
    { startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918 },
    { startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694 },
    { startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522 },
    { startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276 },
    { startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093 },
    { startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522 },
    { startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546 },
    { startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503 },
    { startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276 },
    { startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918 },
    { startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405 },
    { startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437 },
    { startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529 },
    { startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041 },
    { startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006 },
    { startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437 },
    { startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729 },
    { startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816 },
    { startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209 },
    { startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737 },
    { startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041 },
    { startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437 },
    { startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737 },
    { startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198 },
    { startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194 },
    { startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694 },
    { startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437 },
    { startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694 },
    { startLat: 11.986597, startLng: 8.571831, endLat: 35.6762, endLng: 139.6503 },
    { startLat: -22.9068, startLng: -43.1729, endLat: -34.6037, endLng: -58.3816 },
    { startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798 }
];

// Collect all unique coordinates
const uniquePoints = new Set();
const pointCounts = {};

arcs.forEach((arc, index) => {
    const startPoint = `${arc.startLat},${arc.startLng}`;
    const endPoint = `${arc.endLat},${arc.endLng}`;

    uniquePoints.add(startPoint);
    uniquePoints.add(endPoint);

    // Count frequency of each point
    pointCounts[startPoint] = (pointCounts[startPoint] || 0) + 1;
    pointCounts[endPoint] = (pointCounts[endPoint] || 0) + 1;
});

console.log(`Total number of arcs: ${arcs.length}`);
console.log(`Total unique landing points: ${uniquePoints.size}`);
console.log(`Total coordinate pairs (start + end): ${arcs.length * 2}`);

console.log('\nMost frequently used landing points:');
const sortedPoints = Object.entries(pointCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

sortedPoints.forEach(([point, count], index) => {
    const [lat, lng] = point.split(',');
    console.log(`${index + 1}. Lat: ${lat}, Lng: ${lng} (used ${count} times)`);
});

console.log('\nAll unique landing points:');
Array.from(uniquePoints).sort().forEach((point, index) => {
    const [lat, lng] = point.split(',');
    const count = pointCounts[point];
    console.log(`${index + 1}. Lat: ${lat}, Lng: ${lng} (${count} times)`);
});
