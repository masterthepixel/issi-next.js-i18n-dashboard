// ISSI Datacenter Network Topology - Complete Global Infrastructure
export interface DataCenter {
    id: string;
    provider: 'aws' | 'gcp' | 'azure' | 'hq';
    name: string;
    coordinates: [number, number]; // [lat, lng]
    region: string;
    tier: 'hq' | 'primary' | 'secondary';
    code: string;
}

export const datacenters: DataCenter[] = [
    // ISSI Headquarters (always visible)
    {
        id: 'issi-hq',
        provider: 'hq',
        name: 'ISSI Headquarters',
        coordinates: [38.9912, -76.8751],
        region: 'Greenbelt, Maryland',
        tier: 'hq',
        code: 'HQ'
    },

    // ========== AWS REGIONS (reduced to 1/3 for cleaner visualization) ==========
    // North America (keeping 2 out of 6)
    {
        id: 'aws-us-east-1',
        provider: 'aws',
        name: 'US East (N. Virginia)',
        coordinates: [38.9940, -77.4524],
        region: 'US East',
        tier: 'primary',
        code: 'us-east-1'
    },
    // {
    //     id: 'aws-us-east-2',
    //     provider: 'aws',
    //     name: 'US East (Ohio)',
    //     coordinates: [40.0946, -82.7541],
    //     region: 'US East',
    //     tier: 'secondary',
    //     code: 'us-east-2'
    // },
    {
        id: 'aws-us-west-1',
        provider: 'aws',
        name: 'US West (N. California)',
        coordinates: [37.4437, -122.1537],
        region: 'US West',
        tier: 'primary',
        code: 'us-west-1'
    },
    // {
    //     id: 'aws-us-west-2',
    //     provider: 'aws',
    //     name: 'US West (Oregon)',
    //     coordinates: [45.9175, -119.2684],
    //     region: 'US West',
    //     tier: 'secondary',
    //     code: 'us-west-2'
    // },
    // {
    //     id: 'aws-ca-central-1',
    //     provider: 'aws',
    //     name: 'Canada (Central)',
    //     coordinates: [43.6532, -79.3832],
    //     region: 'North America',
    //     tier: 'secondary',
    //     code: 'ca-central-1'
    // },
    // {
    //     id: 'aws-ca-west-1',
    //     provider: 'aws',
    //     name: 'Canada West (Calgary)',
    //     coordinates: [51.0447, -114.0719],
    //     region: 'North America',
    //     tier: 'secondary',
    //     code: 'ca-west-1'
    // },

    // South America (keeping 1 out of 1)
    {
        id: 'aws-sa-east-1',
        provider: 'aws',
        name: 'South America (São Paulo)',
        coordinates: [-23.5558, -46.6396],
        region: 'South America',
        tier: 'secondary',
        code: 'sa-east-1'
    },

    // Europe (keeping 3 out of 8)
    {
        id: 'aws-eu-west-1',
        provider: 'aws',
        name: 'Europe (Ireland)',
        coordinates: [53.4056, -6.2245],
        region: 'Europe',
        tier: 'primary',
        code: 'eu-west-1'
    },
    {
        id: 'aws-eu-central-1',
        provider: 'aws',
        name: 'Europe (Frankfurt)',
        coordinates: [50.0992, 8.6304],
        region: 'Europe',
        tier: 'primary',
        code: 'eu-central-1'
    },
    // {
    //     id: 'aws-eu-west-2',
    //     provider: 'aws',
    //     name: 'Europe (London)',
    //     coordinates: [51.5074, -0.1278],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'eu-west-2'
    // },
    // {
    //     id: 'aws-eu-west-3',
    //     provider: 'aws',
    //     name: 'Europe (Paris)',
    //     coordinates: [48.8566, 2.3522],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'eu-west-3'
    // },
    // {
    //     id: 'aws-eu-north-1',
    //     provider: 'aws',
    //     name: 'Europe (Stockholm)',
    //     coordinates: [59.3293, 18.0686],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'eu-north-1'
    // },
    // {
    //     id: 'aws-eu-south-1',
    //     provider: 'aws',
    //     name: 'Europe (Milan)',
    //     coordinates: [45.4642, 9.1900],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'eu-south-1'
    // },
    // {
    //     id: 'aws-eu-south-2',
    //     provider: 'aws',
    //     name: 'Europe (Spain)',
    //     coordinates: [40.4168, -3.7038],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'eu-south-2'
    // },
    // {
    //     id: 'aws-eu-central-2',
    //     provider: 'aws',
    //     name: 'Europe (Zurich)',
    //     coordinates: [47.3769, 8.5417],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'eu-central-2'
    // },

    // Asia Pacific (keeping 3 out of 10)
    {
        id: 'aws-ap-southeast-1',
        provider: 'aws',
        name: 'Asia Pacific (Singapore)',
        coordinates: [1.3521, 103.8198],
        region: 'Asia Pacific',
        tier: 'primary',
        code: 'ap-southeast-1'
    },
    {
        id: 'aws-ap-northeast-1',
        provider: 'aws',
        name: 'Asia Pacific (Tokyo)',
        coordinates: [35.6762, 139.6503],
        region: 'Asia Pacific',
        tier: 'primary',
        code: 'ap-northeast-1'
    },
    // {
    //     id: 'aws-ap-southeast-2',
    //     provider: 'aws',
    //     name: 'Asia Pacific (Sydney)',
    //     coordinates: [-33.8688, 151.2093],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'ap-southeast-2'
    // },
    // {
    //     id: 'aws-ap-northeast-2',
    //     provider: 'aws',
    //     name: 'Asia Pacific (Seoul)',
    //     coordinates: [37.5665, 126.9780],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'ap-northeast-2'
    // },
    {
        id: 'aws-ap-south-1',
        provider: 'aws',
        name: 'Asia Pacific (Mumbai)',
        coordinates: [19.0760, 72.8777],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'ap-south-1'
    },
    {
        id: 'aws-ap-southeast-3',
        provider: 'aws',
        name: 'Asia Pacific (Jakarta)',
        coordinates: [-6.2088, 106.8456],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'ap-southeast-3'
    },
    {
        id: 'aws-ap-east-1',
        provider: 'aws',
        name: 'Asia Pacific (Hong Kong)',
        coordinates: [22.3193, 114.1694],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'ap-east-1'
    },
    {
        id: 'aws-ap-northeast-3',
        provider: 'aws',
        name: 'Asia Pacific (Osaka)',
        coordinates: [34.6937, 135.5023],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'ap-northeast-3'
    },
    {
        id: 'aws-ap-south-2',
        provider: 'aws',
        name: 'Asia Pacific (Hyderabad)',
        coordinates: [17.3850, 78.4867],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'ap-south-2'
    },
    {
        id: 'aws-ap-southeast-4',
        provider: 'aws',
        name: 'Asia Pacific (Melbourne)',
        coordinates: [-37.8136, 144.9631],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'ap-southeast-4'
    },

    // Middle East & Africa
    {
        id: 'aws-me-south-1',
        provider: 'aws',
        name: 'Middle East (Bahrain)',
        coordinates: [26.2041, 50.5897],
        region: 'Middle East',
        tier: 'secondary',
        code: 'me-south-1'
    },
    {
        id: 'aws-me-central-1',
        provider: 'aws',
        name: 'Middle East (UAE)',
        coordinates: [25.2048, 55.2708],
        region: 'Middle East',
        tier: 'secondary',
        code: 'me-central-1'
    },
    {
        id: 'aws-af-south-1',
        provider: 'aws',
        name: 'Africa (Cape Town)',
        coordinates: [-33.9249, 18.4241],
        region: 'Africa',
        tier: 'secondary',
        code: 'af-south-1'
    },
    {
        id: 'aws-il-central-1',
        provider: 'aws',
        name: 'Israel (Tel Aviv)',
        coordinates: [32.0853, 34.7818],
        region: 'Middle East',
        tier: 'secondary',
        code: 'il-central-1'
    },

    // ========== GOOGLE CLOUD PLATFORM (40+ regions) ==========
    // North America
    {
        id: 'gcp-us-central1',
        provider: 'gcp',
        name: 'US Central (Iowa)',
        coordinates: [41.5868, -93.6250],
        region: 'US Central',
        tier: 'primary',
        code: 'us-central1'
    },
    {
        id: 'gcp-us-east1',
        provider: 'gcp',
        name: 'US East (South Carolina)',
        coordinates: [33.8361, -81.1637],
        region: 'US East',
        tier: 'primary',
        code: 'us-east1'
    },
    // {
    //     id: 'gcp-us-east4',
    //     provider: 'gcp',
    //     name: 'US East (Northern Virginia)',
    //     coordinates: [38.9517, -77.4481],
    //     region: 'US East',
    //     tier: 'secondary',
    //     code: 'us-east4'
    // },
    // {
    //     id: 'gcp-us-east5',
    //     provider: 'gcp',
    //     name: 'US East (Columbus)',
    //     coordinates: [39.9612, -82.9988],
    //     region: 'US East',
    //     tier: 'secondary',
    //     code: 'us-east5'
    // },
    // {
    //     id: 'gcp-us-south1',
    //     provider: 'gcp',
    //     name: 'US South (Dallas)',
    //     coordinates: [32.7767, -96.7970],
    //     region: 'US South',
    //     tier: 'secondary',
    //     code: 'us-south1'
    // },
    {
        id: 'gcp-us-west1',
        provider: 'gcp',
        name: 'US West (Oregon)',
        coordinates: [45.8696, -119.6880],
        region: 'US West',
        tier: 'primary',
        code: 'us-west1'
    },
    // {
    //     id: 'gcp-us-west2',
    //     provider: 'gcp',
    //     name: 'US West (Los Angeles)',
    //     coordinates: [34.0522, -118.2437],
    //     region: 'US West',
    //     tier: 'secondary',
    //     code: 'us-west2'
    // },
    // {
    //     id: 'gcp-us-west3',
    //     provider: 'gcp',
    //     name: 'US West (Salt Lake City)',
    //     coordinates: [40.7608, -111.8910],
    //     region: 'US West',
    //     tier: 'secondary',
    //     code: 'us-west3'
    // },
    // {
    //     id: 'gcp-us-west4',
    //     provider: 'gcp',
    //     name: 'US West (Las Vegas)',
    //     coordinates: [36.1699, -115.1398],
    //     region: 'US West',
    //     tier: 'secondary',
    //     code: 'us-west4'
    // },
    {
        id: 'gcp-northamerica-northeast1',
        provider: 'gcp',
        name: 'Canada (Montreal)',
        coordinates: [45.5017, -73.5673],
        region: 'North America',
        tier: 'secondary',
        code: 'northamerica-northeast1'
    },
    // {
    //     id: 'gcp-northamerica-northeast2',
    //     provider: 'gcp',
    //     name: 'Canada (Toronto)',
    //     coordinates: [43.6532, -79.3832],
    //     region: 'North America',
    //     tier: 'secondary',
    //     code: 'northamerica-northeast2'
    // },

    // South America
    {
        id: 'gcp-southamerica-east1',
        provider: 'gcp',
        name: 'South America (São Paulo)',
        coordinates: [-23.5505, -46.6333],
        region: 'South America',
        tier: 'secondary',
        code: 'southamerica-east1'
    },
    {
        id: 'gcp-southamerica-west1',
        provider: 'gcp',
        name: 'South America (Santiago)',
        coordinates: [-33.4489, -70.6693],
        region: 'South America',
        tier: 'secondary',
        code: 'southamerica-west1'
    },

    // Europe
    {
        id: 'gcp-europe-west1',
        provider: 'gcp',
        name: 'Europe West (Belgium)',
        coordinates: [50.8503, 4.3517],
        region: 'Europe',
        tier: 'primary',
        code: 'europe-west1'
    },
    // {
    //     id: 'gcp-europe-west2',
    //     provider: 'gcp',
    //     name: 'Europe West (London)',
    //     coordinates: [51.5074, -0.1278],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-west2'
    // },
    {
        id: 'gcp-europe-west3',
        provider: 'gcp',
        name: 'Europe West (Frankfurt)',
        coordinates: [50.1109, 8.6821],
        region: 'Europe',
        tier: 'primary',
        code: 'europe-west3'
    },
    // {
    //     id: 'gcp-europe-west4',
    //     provider: 'gcp',
    //     name: 'Europe West (Netherlands)',
    //     coordinates: [52.3676, 4.9041],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-west4'
    // },
    // {
    //     id: 'gcp-europe-west6',
    //     provider: 'gcp',
    //     name: 'Europe West (Zurich)',
    //     coordinates: [47.3769, 8.5417],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-west6'
    // },
    // {
    //     id: 'gcp-europe-west8',
    //     provider: 'gcp',
    //     name: 'Europe West (Milan)',
    //     coordinates: [45.4642, 9.1900],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-west8'
    // },
    // {
    //     id: 'gcp-europe-west9',
    //     provider: 'gcp',
    //     name: 'Europe West (Paris)',
    //     coordinates: [48.8566, 2.3522],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-west9'
    // },
    // {
    //     id: 'gcp-europe-west10',
    //     provider: 'gcp',
    //     name: 'Europe West (Berlin)',
    //     coordinates: [52.5200, 13.4050],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-west10'
    // },
    // {
    //     id: 'gcp-europe-west12',
    //     provider: 'gcp',
    //     name: 'Europe West (Turin)',
    //     coordinates: [45.0703, 7.6869],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-west12'
    // },
    {
        id: 'gcp-europe-north1',
        provider: 'gcp',
        name: 'Europe North (Finland)',
        coordinates: [60.1699, 24.9384],
        region: 'Europe',
        tier: 'secondary',
        code: 'europe-north1'
    },
    // {
    //     id: 'gcp-europe-central2',
    //     provider: 'gcp',
    //     name: 'Europe Central (Warsaw)',
    //     coordinates: [52.2297, 21.0122],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-central2'
    // },
    // {
    //     id: 'gcp-europe-southwest1',
    //     provider: 'gcp',
    //     name: 'Europe Southwest (Madrid)',
    //     coordinates: [40.4168, -3.7038],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'europe-southwest1'
    // },

    // Asia Pacific
    {
        id: 'gcp-asia-southeast1',
        provider: 'gcp',
        name: 'Asia Southeast (Singapore)',
        coordinates: [1.3521, 103.8198],
        region: 'Asia Pacific',
        tier: 'primary',
        code: 'asia-southeast1'
    },
    // {
    //     id: 'gcp-asia-southeast2',
    //     provider: 'gcp',
    //     name: 'Asia Southeast (Jakarta)',
    //     coordinates: [-6.2088, 106.8456],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'asia-southeast2'
    // },
    {
        id: 'gcp-asia-northeast1',
        provider: 'gcp',
        name: 'Asia Northeast (Tokyo)',
        coordinates: [35.6762, 139.6503],
        region: 'Asia Pacific',
        tier: 'primary',
        code: 'asia-northeast1'
    },
    // {
    //     id: 'gcp-asia-northeast2',
    //     provider: 'gcp',
    //     name: 'Asia Northeast (Osaka)',
    //     coordinates: [34.6937, 135.5023],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'asia-northeast2'
    // },
    // {
    //     id: 'gcp-asia-northeast3',
    //     provider: 'gcp',
    //     name: 'Asia Northeast (Seoul)',
    //     coordinates: [37.5665, 126.9780],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'asia-northeast3'
    // },
    {
        id: 'gcp-asia-south1',
        provider: 'gcp',
        name: 'Asia South (Mumbai)',
        coordinates: [19.0760, 72.8777],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'asia-south1'
    },
    // {
    //     id: 'gcp-asia-south2',
    //     provider: 'gcp',
    //     name: 'Asia South (Delhi)',
    //     coordinates: [28.7041, 77.1025],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'asia-south2'
    // },
    // {
    //     id: 'gcp-asia-east1',
    //     provider: 'gcp',
    //     name: 'Asia East (Taiwan)',
    //     coordinates: [25.0330, 121.5654],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'asia-east1'
    // },
    // {
    //     id: 'gcp-asia-east2',
    //     provider: 'gcp',
    //     name: 'Asia East (Hong Kong)',
    //     coordinates: [22.3193, 114.1694],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'asia-east2'
    // },
    {
        id: 'gcp-australia-southeast1',
        provider: 'gcp',
        name: 'Australia Southeast (Sydney)',
        coordinates: [-33.8688, 151.2093],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'australia-southeast1'
    },
    // {
    //     id: 'gcp-australia-southeast2',
    //     provider: 'gcp',
    //     name: 'Australia Southeast (Melbourne)',
    //     coordinates: [-37.8136, 144.9631],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'australia-southeast2'
    // },

    // Middle East & Africa
    {
        id: 'gcp-me-west1',
        provider: 'gcp',
        name: 'Middle East West (Tel Aviv)',
        coordinates: [32.0853, 34.7818],
        region: 'Middle East',
        tier: 'secondary',
        code: 'me-west1'
    },
    {
        id: 'gcp-me-central1',
        provider: 'gcp',
        name: 'Middle East Central (Doha)',
        coordinates: [25.2854, 51.5310],
        region: 'Middle East',
        tier: 'secondary',
        code: 'me-central1'
    },
    {
        id: 'gcp-me-central2',
        provider: 'gcp',
        name: 'Middle East Central (Dammam)',
        coordinates: [26.4282, 50.1044],
        region: 'Middle East',
        tier: 'secondary',
        code: 'me-central2'
    },
    {
        id: 'gcp-africa-south1',
        provider: 'gcp',
        name: 'Africa South (Johannesburg)',
        coordinates: [-26.2041, 28.0473],
        region: 'Africa',
        tier: 'secondary',
        code: 'africa-south1'
    },

    // ========== MICROSOFT AZURE (60+ regions) ==========
    // North America
    {
        id: 'azure-eastus',
        provider: 'azure',
        name: 'East US (Virginia)',
        coordinates: [37.3719, -79.8164],
        region: 'US East',
        tier: 'primary',
        code: 'eastus'
    },
    // {
    //     id: 'azure-eastus2',
    //     provider: 'azure',
    //     name: 'East US 2 (Virginia)',
    //     coordinates: [36.6681, -78.3889],
    //     region: 'US East',
    //     tier: 'secondary',
    //     code: 'eastus2'
    // },
    // {
    //     id: 'azure-centralus',
    //     provider: 'azure',
    //     name: 'Central US (Iowa)',
    //     coordinates: [41.5868, -93.6250],
    //     region: 'US Central',
    //     tier: 'secondary',
    //     code: 'centralus'
    // },
    // {
    //     id: 'azure-northcentralus',
    //     provider: 'azure',
    //     name: 'North Central US (Illinois)',
    //     coordinates: [41.8781, -87.6298],
    //     region: 'US Central',
    //     tier: 'secondary',
    //     code: 'northcentralus'
    // },
    // {
    //     id: 'azure-southcentralus',
    //     provider: 'azure',
    //     name: 'South Central US (Texas)',
    //     coordinates: [29.4167, -98.5000],
    //     region: 'US Central',
    //     tier: 'secondary',
    //     code: 'southcentralus'
    // },
    // {
    //     id: 'azure-westcentralus',
    //     provider: 'azure',
    //     name: 'West Central US (Wyoming)',
    //     coordinates: [40.8906, -110.2348],
    //     region: 'US West',
    //     tier: 'secondary',
    //     code: 'westcentralus'
    // },
    {
        id: 'azure-westus',
        provider: 'azure',
        name: 'West US (California)',
        coordinates: [37.7749, -122.4194],
        region: 'US West',
        tier: 'primary',
        code: 'westus'
    },
    // {
    //     id: 'azure-westus2',
    //     provider: 'azure',
    //     name: 'West US 2 (Washington)',
    //     coordinates: [47.2529, -119.8520],
    //     region: 'US West',
    //     tier: 'secondary',
    //     code: 'westus2'
    // },
    // {
    //     id: 'azure-westus3',
    //     provider: 'azure',
    //     name: 'West US 3 (Arizona)',
    //     coordinates: [33.4484, -112.0740],
    //     region: 'US West',
    //     tier: 'secondary',
    //     code: 'westus3'
    // },
    {
        id: 'azure-canadacentral',
        provider: 'azure',
        name: 'Canada Central (Toronto)',
        coordinates: [43.6532, -79.3832],
        region: 'North America',
        tier: 'secondary',
        code: 'canadacentral'
    },
    // {
    //     id: 'azure-canadaeast',
    //     provider: 'azure',
    //     name: 'Canada East (Quebec)',
    //     coordinates: [46.8139, -71.2082],
    //     region: 'North America',
    //     tier: 'secondary',
    //     code: 'canadaeast'
    // },

    // South America
    {
        id: 'azure-brazilsouth',
        provider: 'azure',
        name: 'Brazil South (São Paulo)',
        coordinates: [-23.5505, -46.6333],
        region: 'South America',
        tier: 'secondary',
        code: 'brazilsouth'
    },
    {
        id: 'azure-brazilsoutheast',
        provider: 'azure',
        name: 'Brazil Southeast (Rio)',
        coordinates: [-22.9068, -43.1729],
        region: 'South America',
        tier: 'secondary',
        code: 'brazilsoutheast'
    },

    // Europe
    {
        id: 'azure-northeurope',
        provider: 'azure',
        name: 'North Europe (Ireland)',
        coordinates: [53.3498, -6.2603],
        region: 'Europe',
        tier: 'primary',
        code: 'northeurope'
    },
    {
        id: 'azure-westeurope',
        provider: 'azure',
        name: 'West Europe (Netherlands)',
        coordinates: [52.3676, 4.9041],
        region: 'Europe',
        tier: 'primary',
        code: 'westeurope'
    },
    // {
    //     id: 'azure-germanywestcentral',
    //     provider: 'azure',
    //     name: 'Germany West Central (Frankfurt)',
    //     coordinates: [50.1109, 8.6821],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'germanywestcentral'
    // },
    // {
    //     id: 'azure-germanynorth',
    //     provider: 'azure',
    //     name: 'Germany North (Berlin)',
    //     coordinates: [52.5200, 13.4050],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'germanynorth'
    // },
    {
        id: 'azure-uksouth',
        provider: 'azure',
        name: 'UK South (London)',
        coordinates: [51.5074, -0.1278],
        region: 'Europe',
        tier: 'secondary',
        code: 'uksouth'
    },
    // {
    //     id: 'azure-ukwest',
    //     provider: 'azure',
    //     name: 'UK West (Cardiff)',
    //     coordinates: [51.4816, -3.1791],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'ukwest'
    // },
    {
        id: 'azure-francecentral',
        provider: 'azure',
        name: 'France Central (Paris)',
        coordinates: [48.8566, 2.3522],
        region: 'Europe',
        tier: 'secondary',
        code: 'francecentral'
    },
    // {
    //     id: 'azure-francesouth',
    //     provider: 'azure',
    //     name: 'France South (Marseille)',
    //     coordinates: [43.2965, 5.3698],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'francesouth'
    // },
    // {
    //     id: 'azure-switzerlandnorth',
    //     provider: 'azure',
    //     name: 'Switzerland North (Zurich)',
    //     coordinates: [47.3769, 8.5417],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'switzerlandnorth'
    // },
    // {
    //     id: 'azure-switzerlandwest',
    //     provider: 'azure',
    //     name: 'Switzerland West (Geneva)',
    //     coordinates: [46.2044, 6.1432],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'switzerlandwest'
    // },
    // {
    //     id: 'azure-norwayeast',
    //     provider: 'azure',
    //     name: 'Norway East (Oslo)',
    //     coordinates: [59.9139, 10.7522],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'norwayeast'
    // },
    // {
    //     id: 'azure-norwaywest',
    //     provider: 'azure',
    //     name: 'Norway West (Stavanger)',
    //     coordinates: [58.9700, 5.7331],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'norwaywest'
    // },
    // {
    //     id: 'azure-swedencentral',
    //     provider: 'azure',
    //     name: 'Sweden Central (Gävle)',
    //     coordinates: [60.6749, 17.1413],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'swedencentral'
    // },
    // {
    //     id: 'azure-swedensouth',
    //     provider: 'azure',
    //     name: 'Sweden South (Malmö)',
    //     coordinates: [55.6050, 13.0038],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'swedensouth'
    // },
    // {
    //     id: 'azure-italynorth',
    //     provider: 'azure',
    //     name: 'Italy North (Milan)',
    //     coordinates: [45.4642, 9.1900],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'italynorth'
    // },
    // {
    //     id: 'azure-spaincentral',
    //     provider: 'azure',
    //     name: 'Spain Central (Madrid)',
    //     coordinates: [40.4168, -3.7038],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'spaincentral'
    // },
    // {
    //     id: 'azure-polandcentral',
    //     provider: 'azure',
    //     name: 'Poland Central (Warsaw)',
    //     coordinates: [52.2297, 21.0122],
    //     region: 'Europe',
    //     tier: 'secondary',
    //     code: 'polandcentral'
    // },

    // Asia Pacific
    {
        id: 'azure-southeastasia',
        provider: 'azure',
        name: 'Southeast Asia (Singapore)',
        coordinates: [1.3521, 103.8198],
        region: 'Asia Pacific',
        tier: 'primary',
        code: 'southeastasia'
    },
    // {
    //     id: 'azure-eastasia',
    //     provider: 'azure',
    //     name: 'East Asia (Hong Kong)',
    //     coordinates: [22.3193, 114.1694],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'eastasia'
    // },
    {
        id: 'azure-japaneast',
        provider: 'azure',
        name: 'Japan East (Tokyo)',
        coordinates: [35.6762, 139.6503],
        region: 'Asia Pacific',
        tier: 'primary',
        code: 'japaneast'
    },
    // {
    //     id: 'azure-japanwest',
    //     provider: 'azure',
    //     name: 'Japan West (Osaka)',
    //     coordinates: [34.6937, 135.5023],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'japanwest'
    // },
    // {
    //     id: 'azure-koreacentral',
    //     provider: 'azure',
    //     name: 'Korea Central (Seoul)',
    //     coordinates: [37.5665, 126.9780],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'koreacentral'
    // },
    // {
    //     id: 'azure-koreasouth',
    //     provider: 'azure',
    //     name: 'Korea South (Busan)',
    //     coordinates: [35.1796, 129.0756],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'koreasouth'
    // },
    {
        id: 'azure-australiaeast',
        provider: 'azure',
        name: 'Australia East (Sydney)',
        coordinates: [-33.8688, 151.2093],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'australiaeast'
    },
    // {
    //     id: 'azure-australiasoutheast',
    //     provider: 'azure',
    //     name: 'Australia Southeast (Melbourne)',
    //     coordinates: [-37.8136, 144.9631],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'australiasoutheast'
    // },
    // {
    //     id: 'azure-australiacentral',
    //     provider: 'azure',
    //     name: 'Australia Central (Canberra)',
    //     coordinates: [-35.2809, 149.1300],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'australiacentral'
    // },
    // {
    //     id: 'azure-australiacentral2',
    //     provider: 'azure',
    //     name: 'Australia Central 2 (Canberra)',
    //     coordinates: [-35.3075, 149.1244],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'australiacentral2'
    // },
    {
        id: 'azure-centralindia',
        provider: 'azure',
        name: 'Central India (Pune)',
        coordinates: [18.5204, 73.8567],
        region: 'Asia Pacific',
        tier: 'secondary',
        code: 'centralindia'
    },
    // {
    //     id: 'azure-southindia',
    //     provider: 'azure',
    //     name: 'South India (Chennai)',
    //     coordinates: [13.0827, 80.2707],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'southindia'
    // },
    // {
    //     id: 'azure-westindia',
    //     provider: 'azure',
    //     name: 'West India (Mumbai)',
    //     coordinates: [19.0760, 72.8777],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'westindia'
    // },
    // {
    //     id: 'azure-jioindiawest',
    //     provider: 'azure',
    //     name: 'Jio India West (Jamnagar)',
    //     coordinates: [22.4707, 70.0577],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'jioindiawest'
    // },
    // {
    //     id: 'azure-jioindiacentral',
    //     provider: 'azure',
    //     name: 'Jio India Central (Nagpur)',
    //     coordinates: [21.1458, 79.0882],
    //     region: 'Asia Pacific',
    //     tier: 'secondary',
    //     code: 'jioindiacentral'
    // },

    // Middle East & Africa
    {
        id: 'azure-uaecentral',
        provider: 'azure',
        name: 'UAE Central (Abu Dhabi)',
        coordinates: [24.4539, 54.3773],
        region: 'Middle East',
        tier: 'secondary',
        code: 'uaecentral'
    },
    {
        id: 'azure-uaenorth',
        provider: 'azure',
        name: 'UAE North (Dubai)',
        coordinates: [25.2048, 55.2708],
        region: 'Middle East',
        tier: 'secondary',
        code: 'uaenorth'
    },
    {
        id: 'azure-qatarcentral',
        provider: 'azure',
        name: 'Qatar Central (Doha)',
        coordinates: [25.2854, 51.5310],
        region: 'Middle East',
        tier: 'secondary',
        code: 'qatarcentral'
    },
    {
        id: 'azure-southafricanorth',
        provider: 'azure',
        name: 'South Africa North (Johannesburg)',
        coordinates: [-26.2041, 28.0473],
        region: 'Africa',
        tier: 'secondary',
        code: 'southafricanorth'
    },
    {
        id: 'azure-southafricawest',
        provider: 'azure',
        name: 'South Africa West (Cape Town)',
        coordinates: [-33.9249, 18.4241],
        region: 'Africa',
        tier: 'secondary',
        code: 'southafricawest'
    },
    {
        id: 'azure-israelcentral',
        provider: 'azure',
        name: 'Israel Central (Tel Aviv)',
        coordinates: [32.0853, 34.7818],
        region: 'Middle East',
        tier: 'secondary',
        code: 'israelcentral'
    }
];

// Network topology definitions (which datacenters connect to which)
export const networkTopology = {
    aws: {
        primary: 'aws-us-east-1',
        connections: [
            // Enhanced North America network
            ['aws-us-east-1', 'aws-us-west-1'],
            ['aws-us-east-1', 'aws-us-east-2'],
            ['aws-us-east-2', 'aws-us-west-1'], // Cross-country connection
            ['aws-us-west-1', 'aws-us-west-2'],
            ['aws-us-east-1', 'aws-ca-central-1'], // US-Canada
            ['aws-us-west-1', 'aws-ca-west-1'], // West Coast Canada
            ['aws-ca-central-1', 'aws-ca-west-1'], // Canada internal

            // Trans-Atlantic connections
            ['aws-us-east-1', 'aws-eu-west-1'],
            ['aws-us-west-1', 'aws-eu-central-1'],
            ['aws-ca-central-1', 'aws-eu-west-1'], // Canada to Europe

            // Trans-Pacific connections
            ['aws-us-west-1', 'aws-ap-southeast-1'],
            ['aws-us-west-1', 'aws-ap-northeast-1'],
            ['aws-us-west-2', 'aws-ap-northeast-1'], // Additional Pacific route

            // Enhanced European network
            ['aws-eu-west-1', 'aws-eu-central-1'],
            ['aws-eu-west-1', 'aws-eu-west-2'],
            ['aws-eu-west-2', 'aws-eu-west-3'], // London to Paris
            ['aws-eu-central-1', 'aws-eu-west-3'], // Frankfurt to Paris
            ['aws-eu-central-1', 'aws-eu-north-1'], // Frankfurt to Stockholm
            ['aws-eu-west-1', 'aws-eu-south-1'], // Ireland to Milan
            ['aws-eu-central-1', 'aws-eu-central-2'], // Frankfurt to Zurich

            // Enhanced Asia Pacific network
            ['aws-ap-southeast-1', 'aws-ap-northeast-1'],
            ['aws-ap-southeast-1', 'aws-ap-south-1'],
            ['aws-ap-northeast-1', 'aws-ap-northeast-2'], // Tokyo to Seoul
            ['aws-ap-northeast-1', 'aws-ap-northeast-3'], // Tokyo to Osaka
            ['aws-ap-southeast-1', 'aws-ap-southeast-2'], // Singapore to Sydney
            ['aws-ap-southeast-2', 'aws-ap-southeast-4'], // Sydney to Melbourne
            ['aws-ap-south-1', 'aws-ap-south-2'], // Mumbai to Hyderabad
            ['aws-ap-southeast-1', 'aws-ap-southeast-3'], // Singapore to Jakarta
            ['aws-ap-east-1', 'aws-ap-northeast-1'], // Hong Kong to Tokyo

            // South America
            ['aws-us-east-1', 'aws-sa-east-1'],

            // Middle East & Africa - Enhanced global connectivity
            ['aws-eu-west-1', 'aws-me-south-1'], // Europe to Bahrain
            ['aws-eu-central-1', 'aws-af-south-1'], // Europe to Cape Town
            ['aws-me-south-1', 'aws-ap-south-1'], // Middle East to India
            ['aws-us-east-1', 'aws-af-south-1'], // Trans-Atlantic to Africa
            ['aws-ap-southeast-1', 'aws-af-south-1'], // Asia to Africa
            ['aws-me-south-1', 'aws-me-central-1'], // Middle East internal
            ['aws-af-south-1', 'aws-me-south-1'], // Africa to Middle East
            
            // Additional intercontinental routes
            ['aws-us-west-1', 'aws-eu-west-2'], // US West to London
            ['aws-ca-central-1', 'aws-ap-northeast-1'], // Canada to Tokyo
            ['aws-sa-east-1', 'aws-eu-west-1'], // South America to Europe
            ['aws-sa-east-1', 'aws-af-south-1'], // South America to Africa
            ['aws-ap-southeast-1', 'aws-me-central-1'], // Asia to UAE
            ['aws-ap-northeast-1', 'aws-eu-central-1'], // Tokyo to Frankfurt
            ['aws-eu-west-1', 'aws-ap-south-1'], // Europe to Mumbai
            ['aws-us-east-2', 'aws-ap-southeast-2'] // US East to Sydney
        ]
    },
    gcp: {
        primary: 'gcp-us-central1',
        connections: [
            // Enhanced US network
            ['gcp-us-central1', 'gcp-us-east1'],
            ['gcp-us-central1', 'gcp-us-west1'],
            ['gcp-us-east1', 'gcp-us-east4'], // East Coast internal
            ['gcp-us-west1', 'gcp-us-west2'], // West Coast internal
            ['gcp-us-west1', 'gcp-us-west3'], // Additional West Coast
            ['gcp-us-west1', 'gcp-us-west4'], // Complete West Coast mesh
            ['gcp-us-east1', 'gcp-us-west1'], // Cross-country direct
            ['gcp-us-central1', 'gcp-northamerica-northeast1'], // US to Canada

            // Trans-Atlantic
            ['gcp-us-central1', 'gcp-europe-west1'],
            ['gcp-us-east1', 'gcp-europe-west2'],
            ['gcp-us-east4', 'gcp-europe-west4'], // Additional Atlantic route

            // Trans-Pacific
            ['gcp-us-west1', 'gcp-asia-southeast1'],
            ['gcp-us-west1', 'gcp-asia-northeast1'],
            ['gcp-us-west2', 'gcp-asia-northeast2'], // Additional Pacific route

            // Enhanced European network
            ['gcp-europe-west1', 'gcp-europe-west3'], // Belgium to Frankfurt
            ['gcp-europe-west2', 'gcp-europe-west4'], // London to Netherlands
            ['gcp-europe-west3', 'gcp-europe-west6'], // Frankfurt to Zurich
            ['gcp-europe-west1', 'gcp-europe-west2'], // Belgium to London
            ['gcp-europe-west4', 'gcp-europe-west6'], // Netherlands to Zurich
            ['gcp-europe-west1', 'gcp-europe-central2'], // Belgium to Warsaw
            ['gcp-europe-west3', 'gcp-europe-north1'], // Frankfurt to Finland

            // Enhanced Asia Pacific network
            ['gcp-asia-southeast1', 'gcp-asia-northeast1'], // Singapore to Tokyo
            ['gcp-asia-southeast1', 'gcp-asia-south1'], // Singapore to Mumbai
            ['gcp-asia-northeast1', 'gcp-asia-northeast2'], // Tokyo to Osaka
            ['gcp-asia-northeast1', 'gcp-asia-northeast3'], // Tokyo to Seoul
            ['gcp-asia-southeast1', 'gcp-asia-southeast2'], // Singapore to Jakarta
            ['gcp-asia-south1', 'gcp-asia-south2'], // Mumbai to Delhi

            // Australia connections
            ['gcp-asia-southeast1', 'gcp-australia-southeast1'], // Singapore to Sydney
            ['gcp-australia-southeast1', 'gcp-australia-southeast2'], // Sydney to Melbourne

            // South America
            ['gcp-us-central1', 'gcp-southamerica-east1'], // US to Brazil
            ['gcp-southamerica-east1', 'gcp-southamerica-west1'], // Brazil internal
            
            // Enhanced Middle East & Africa connectivity
            ['gcp-europe-west1', 'gcp-me-west1'], // Europe to Tel Aviv
            ['gcp-europe-west3', 'gcp-me-central1'], // Frankfurt to Doha
            ['gcp-me-central1', 'gcp-me-central2'], // Middle East internal
            ['gcp-asia-south1', 'gcp-me-central1'], // India to Qatar
            ['gcp-europe-west1', 'gcp-africa-south1'], // Europe to Johannesburg
            ['gcp-me-west1', 'gcp-africa-south1'], // Middle East to Africa
            
            // Additional intercontinental routes
            ['gcp-us-west1', 'gcp-europe-west2'], // US West to London
            ['gcp-us-east1', 'gcp-africa-south1'], // US East to Africa
            ['gcp-northamerica-northeast1', 'gcp-asia-northeast1'], // Canada to Tokyo
            ['gcp-southamerica-east1', 'gcp-europe-west1'], // Brazil to Europe
            ['gcp-southamerica-east1', 'gcp-africa-south1'], // Brazil to Africa
            ['gcp-asia-southeast1', 'gcp-me-central1'], // Singapore to Qatar
            ['gcp-asia-northeast1', 'gcp-europe-west3'], // Tokyo to Frankfurt
            ['gcp-australia-southeast1', 'gcp-me-west1'], // Australia to Middle East
            ['gcp-us-central1', 'gcp-asia-south1'] // US Central to India
        ]
    },
    azure: {
        primary: 'azure-eastus',
        connections: [
            // Enhanced US network
            ['azure-eastus', 'azure-westus'],
            ['azure-eastus', 'azure-centralus'],
            ['azure-eastus', 'azure-eastus2'], // East Coast internal
            ['azure-westus', 'azure-westus2'], // West Coast internal
            ['azure-westus', 'azure-westus3'], // Additional West Coast
            ['azure-centralus', 'azure-southcentralus'], // Central US mesh
            ['azure-centralus', 'azure-northcentralus'], // Central expansion
            ['azure-eastus', 'azure-canadacentral'], // US to Canada East
            ['azure-westus', 'azure-canadacentral'], // Cross-connection
            ['azure-canadacentral', 'azure-canadaeast'], // Canada internal

            // Trans-Atlantic connections
            ['azure-eastus', 'azure-northeurope'],
            ['azure-westus', 'azure-westeurope'],
            ['azure-centralus', 'azure-westeurope'], // Additional Atlantic route

            // Trans-Pacific connections
            ['azure-westus', 'azure-southeastasia'],
            ['azure-westus', 'azure-japaneast'],
            ['azure-westus2', 'azure-koreacentral'], // Additional Pacific route

            // Enhanced European network
            ['azure-northeurope', 'azure-westeurope'], // Ireland to Netherlands
            ['azure-westeurope', 'azure-germanywestcentral'], // Netherlands to Germany
            ['azure-northeurope', 'azure-uksouth'], // Ireland to UK
            ['azure-uksouth', 'azure-ukwest'], // UK internal
            ['azure-westeurope', 'azure-francecentral'], // Netherlands to France
            ['azure-germanywestcentral', 'azure-switzerlandnorth'], // Germany to Switzerland
            ['azure-northeurope', 'azure-swedencentral'], // Ireland to Sweden

            // Enhanced Asia Pacific network
            ['azure-southeastasia', 'azure-japaneast'], // Singapore to Japan
            ['azure-southeastasia', 'azure-australiaeast'], // Singapore to Australia
            ['azure-japaneast', 'azure-koreacentral'], // Japan to Korea
            ['azure-japaneast', 'azure-japanwest'], // Japan internal
            ['azure-australiaeast', 'azure-australiasoutheast'], // Australia internal
            ['azure-southeastasia', 'azure-eastasia'], // Singapore to Hong Kong
            ['azure-southeastasia', 'azure-centralindia'], // Singapore to India

            // Brazil
            ['azure-eastus', 'azure-brazilsouth'],
            ['azure-brazilsouth', 'azure-brazilsoutheast'], // Brazil internal

            // India network
            ['azure-centralindia', 'azure-southindia'], // India internal
            ['azure-centralindia', 'azure-westindia'], // India mesh

            // Middle East & South Africa - Enhanced global connectivity
            ['azure-westeurope', 'azure-uaecentral'], // Europe to UAE
            ['azure-westeurope', 'azure-southafricanorth'], // Europe to South Africa
            ['azure-northeurope', 'azure-qatarcentral'], // Ireland to Qatar
            ['azure-germanywestcentral', 'azure-israelcentral'], // Germany to Israel
            ['azure-uaecentral', 'azure-uaenorth'], // UAE internal
            ['azure-southafricanorth', 'azure-southafricawest'], // South Africa internal
            ['azure-uaecentral', 'azure-qatarcentral'], // UAE to Qatar
            ['azure-centralindia', 'azure-uaecentral'], // India to UAE
            ['azure-southafricanorth', 'azure-centralindia'], // Africa to India
            
            // Enhanced intercontinental routes
            ['azure-eastus', 'azure-southafricanorth'], // US East to Africa
            ['azure-westus', 'azure-northeurope'], // US West to Ireland
            ['azure-canadacentral', 'azure-japaneast'], // Canada to Tokyo
            ['azure-brazilsouth', 'azure-westeurope'], // Brazil to Europe
            ['azure-brazilsouth', 'azure-southafricanorth'], // Brazil to Africa
            ['azure-southeastasia', 'azure-uaecentral'], // Singapore to UAE
            ['azure-japaneast', 'azure-germanywestcentral'], // Tokyo to Germany
            ['azure-australiaeast', 'azure-uaecentral'], // Australia to UAE
            ['azure-eastus2', 'azure-centralindia'], // US East to India
            ['azure-swedencentral', 'azure-japaneast'], // Northern Europe to Asia
            ['azure-francecentral', 'azure-southafricanorth'], // France to Africa
            ['azure-spaincentral', 'azure-southafricanorth'], // Spain to Africa (historical ties)
            ['azure-norwayeast', 'azure-centralindia'] // Norway to India
        ]
    }
};

// HQ connection targets (enhanced global coverage)
export const hqTargets = [
    // Primary hubs
    'aws-us-east-1',      // Priority target - US East
    'aws-eu-west-1',      // Europe hub
    'aws-ap-southeast-1', // Asia Pacific hub
    'gcp-us-central1',    // US Central
    'gcp-europe-west1',   // Europe hub
    'gcp-asia-southeast1', // Asia hub
    'azure-eastus',       // US East
    'azure-northeurope',  // Europe hub
    'azure-southeastasia', // Asia hub
    
    // Africa connections (enhanced)
    'aws-af-south-1',     // Cape Town
    'gcp-africa-south1',  // Johannesburg
    'azure-southafricanorth', // Johannesburg
    'azure-southafricawest',  // Cape Town
    
    // Middle East hubs
    'aws-me-south-1',     // Bahrain
    'aws-me-central-1',   // UAE
    'gcp-me-central1',    // Qatar
    'azure-uaecentral',   // UAE
    
    // South America
    'aws-sa-east-1',      // São Paulo
    'gcp-southamerica-east1', // São Paulo
    'azure-brazilsouth',  // Brazil
    
    // Additional global coverage
    'aws-ap-northeast-1', // Tokyo
    'gcp-asia-northeast1', // Tokyo
    'azure-japaneast',    // Tokyo
    'aws-ap-south-1',     // Mumbai
    'gcp-asia-south1',    // Mumbai
    'azure-centralindia', // India
    'aws-ap-southeast-2', // Sydney
    'gcp-australia-southeast1', // Sydney
    'azure-australiaeast' // Sydney
];

// Provider color mapping (with transparency for better visual integration)
export const providerColors = {
    hq: 'rgba(255, 215, 0, 0.8)',      // Gold for headquarters (80% opacity)
    aws: 'rgba(255, 153, 0, 0.7)',     // AWS orange (70% opacity)
    gcp: 'rgba(66, 133, 244, 0.7)',    // Google blue (70% opacity)
    azure: 'rgba(150, 1, 7, 0.7)'      // Deep red for Azure (70% opacity)
};

// Tier sizing for globe points (much smaller for 123 datacenters to avoid overlap)
export const tierSizes = {
    hq: 0.006,      // Tiny but visible for HQ
    primary: 0.004,  // Very small for primary datacenters  
    secondary: 0.003 // Minimal for secondary datacenters
};

// Helper functions to get specific datacenter groups
export const getDatacentersByProvider = (provider: string): DataCenter[] => {
    return datacenters.filter(dc => dc.provider === provider);
};

export const getPrimaryDatacenters = (): DataCenter[] => {
    return datacenters.filter(dc => dc.tier === 'primary' || dc.tier === 'hq');
};

export const getDatacenterById = (id: string): DataCenter | undefined => {
    return datacenters.find(dc => dc.id === id);
};

export const getHQDatacenter = (): DataCenter => {
    return datacenters.find(dc => dc.provider === 'hq')!;
};

// Convert lat/lon to 3D coordinates for Three.js
export const convertLatLonToVector3 = (lat: number, lon: number, radius: number = 1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return { x, y, z };
};

// Arc data for connections between datacenters
export const generateArcData = () => {
    const arcData = [];

    // Add HQ connections
    const hq = getHQDatacenter();
    hqTargets.forEach(targetId => {
        const target = getDatacenterById(targetId);
        if (target) {
            arcData.push({
                order: 1,
                startLat: hq.coordinates[0],
                startLng: hq.coordinates[1],
                endLat: target.coordinates[0],
                endLng: target.coordinates[1],
                arcAlt: 0.3,
                color: providerColors.hq
            });
        }
    });

    // Add provider network connections
    Object.values(networkTopology).forEach(topology => {
        topology.connections.forEach(([start, end]) => {
            const startDc = getDatacenterById(start);
            const endDc = getDatacenterById(end);
            if (startDc && endDc) {
                arcData.push({
                    order: 2,
                    startLat: startDc.coordinates[0],
                    startLng: startDc.coordinates[1],
                    endLat: endDc.coordinates[0],
                    endLng: endDc.coordinates[1],
                    arcAlt: 0.2,
                    color: providerColors[startDc.provider]
                });
            }
        });
    });

    return arcData;
};

// Point data for datacenters
export const generatePointsData = () => {
    return datacenters.map(dc => ({
        lat: dc.coordinates[0],
        lng: dc.coordinates[1],
        size: tierSizes[dc.tier],
        color: providerColors[dc.provider],
        label: dc.name,
        tier: dc.tier,
        provider: dc.provider
    }));
};

// Global statistics
export const getGlobalStats = () => {
    const stats = {
        total: datacenters.length,
        byProvider: {
            hq: datacenters.filter(dc => dc.provider === 'hq').length,
            aws: datacenters.filter(dc => dc.provider === 'aws').length,
            gcp: datacenters.filter(dc => dc.provider === 'gcp').length,
            azure: datacenters.filter(dc => dc.provider === 'azure').length
        },
        byTier: {
            hq: datacenters.filter(dc => dc.tier === 'hq').length,
            primary: datacenters.filter(dc => dc.tier === 'primary').length,
            secondary: datacenters.filter(dc => dc.tier === 'secondary').length
        },
        byRegion: {
            northAmerica: datacenters.filter(dc =>
                dc.region.includes('US') || dc.region.includes('North America')
            ).length,
            southAmerica: datacenters.filter(dc =>
                dc.region.includes('South America')
            ).length,
            europe: datacenters.filter(dc =>
                dc.region.includes('Europe')
            ).length,
            asiaPacific: datacenters.filter(dc =>
                dc.region.includes('Asia Pacific')
            ).length,
            middleEast: datacenters.filter(dc =>
                dc.region.includes('Middle East')
            ).length,
            africa: datacenters.filter(dc =>
                dc.region.includes('Africa')
            ).length
        }
    };

    return stats;
};