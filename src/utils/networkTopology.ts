// Utility to convert datacenter topology to globe arc format
import { datacenters, hqTargets, networkTopology, providerColors, type DataCenter } from '../data/datacenters';

// Globe Position type (keeping compatibility with existing globe component)
export interface Position {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
}

// Create lookup map for datacenter coordinates
const datacenterMap = new Map<string, DataCenter>();
datacenters.forEach((dc: DataCenter) => datacenterMap.set(dc.id, dc));

// Convert network topology to arc positions
export function generateNetworkArcs(): Position[] {
    const arcs: Position[] = [];
    let order = 1;

    // Generate arcs for each provider's network topology
    Object.entries(networkTopology).forEach(([provider, topology]) => {
        const color = providerColors[provider as keyof typeof providerColors];

        topology.connections.forEach((connection: string[]) => {
            const [startId, endId] = connection;
            const startDC = datacenterMap.get(startId);
            const endDC = datacenterMap.get(endId);

            if (startDC && endDC) {
                arcs.push({
                    order,
                    startLat: startDC.coordinates[0],
                    startLng: startDC.coordinates[1],
                    endLat: endDC.coordinates[0],
                    endLng: endDC.coordinates[1],
                    arcAlt: getArcAltitude(startDC, endDC),
                    color
                });
                order++;
            }
        });
    });

    // Generate HQ connections
    const hq = datacenterMap.get('issi-hq');
    if (hq) {
        hqTargets.forEach((targetId: string) => {
            const target = datacenterMap.get(targetId);
            if (target) {
                arcs.push({
                    order,
                    startLat: hq.coordinates[0],
                    startLng: hq.coordinates[1],
                    endLat: target.coordinates[0],
                    endLng: target.coordinates[1],
                    arcAlt: 0.4, // Higher altitude for HQ connections
                    color: providerColors.hq
                });
                order++;
            }
        });
    }

    return arcs;
}

// Calculate arc altitude based on distance and datacenter types
function getArcAltitude(startDC: DataCenter, endDC: DataCenter): number {
    // Higher altitude for longer distances
    const distance = calculateDistance(
        startDC.coordinates[0], startDC.coordinates[1],
        endDC.coordinates[0], endDC.coordinates[1]
    );

    // Primary connections get higher altitude
    const isPrimary = startDC.tier === 'primary' || endDC.tier === 'primary';

    if (distance > 5000) { // Trans-continental
        return isPrimary ? 0.6 : 0.5;
    } else if (distance > 2000) { // Continental
        return isPrimary ? 0.4 : 0.3;
    } else { // Regional
        return isPrimary ? 0.2 : 0.1;
    }
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Export datacenter data for reference
export { datacenters, providerColors };

