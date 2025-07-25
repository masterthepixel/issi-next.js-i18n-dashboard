import { DatacenterLocation } from '@/types/globe.types';

// ISSI Headquarters (Always Visible)
export const issiHeadquarters: DatacenterLocation = {
  id: 'issi-hq',
  provider: 'hq',
  name: 'ISSI Headquarters',
  coordinates: [38.9912, -76.8751], // Greenbelt, Maryland
  region: 'Greenbelt, Maryland',
  tier: 'hq',
  code: 'HQ'
};

// AWS Locations (Orange markers, orange arcs)
export const awsLocations: DatacenterLocation[] = [
  { id: 'aws-us-east-1', provider: 'aws', coordinates: [38.9940, -77.4524], name: 'US East (Virginia)', region: 'Virginia', tier: 'primary', code: 'USE1' },
  { id: 'aws-us-east-2', provider: 'aws', coordinates: [40.0946, -82.7541], name: 'US East (Ohio)', region: 'Ohio', tier: 'secondary', code: 'USE2' },
  { id: 'aws-us-west-1', provider: 'aws', coordinates: [37.4437, -122.1537], name: 'US West (California)', region: 'California', tier: 'primary', code: 'USW1' },
  { id: 'aws-us-west-2', provider: 'aws', coordinates: [45.9175, -119.2684], name: 'US West (Oregon)', region: 'Oregon', tier: 'secondary', code: 'USW2' },
  { id: 'aws-eu-west-1', provider: 'aws', coordinates: [53.4056, -6.2245], name: 'Europe (Ireland)', region: 'Ireland', tier: 'primary', code: 'EUW1' },
  { id: 'aws-eu-west-2', provider: 'aws', coordinates: [51.5085, -0.0609], name: 'Europe (London)', region: 'London', tier: 'secondary', code: 'EUW2' },
  { id: 'aws-eu-west-3', provider: 'aws', coordinates: [48.6010, 2.2977], name: 'Europe (Paris)', region: 'Paris', tier: 'secondary', code: 'EUW3' },
  { id: 'aws-eu-central-1', provider: 'aws', coordinates: [50.0992, 8.6304], name: 'Europe (Frankfurt)', region: 'Frankfurt', tier: 'secondary', code: 'EUC1' },
  { id: 'aws-sa-east-1', provider: 'aws', coordinates: [-23.4926, -46.8106], name: 'South America (São Paulo)', region: 'São Paulo', tier: 'secondary', code: 'SAE1' },
  { id: 'aws-ap-southeast-1', provider: 'aws', coordinates: [1.3218, 103.6931], name: 'Asia Pacific (Singapore)', region: 'Singapore', tier: 'primary', code: 'APS1' },
  { id: 'aws-ap-southeast-2', provider: 'aws', coordinates: [-33.9118, 151.1908], name: 'Asia Pacific (Sydney)', region: 'Sydney', tier: 'secondary', code: 'APS2' },
  { id: 'aws-ap-northeast-1', provider: 'aws', coordinates: [35.6174, 139.7459], name: 'Asia Pacific (Tokyo)', region: 'Tokyo', tier: 'secondary', code: 'APN1' },
  { id: 'aws-ap-northeast-2', provider: 'aws', coordinates: [37.5616, 126.8736], name: 'Asia Pacific (Seoul)', region: 'Seoul', tier: 'secondary', code: 'APN2' },
  { id: 'aws-ap-south-1', provider: 'aws', coordinates: [19.2426, 72.9668], name: 'Asia Pacific (Mumbai)', region: 'Mumbai', tier: 'secondary', code: 'APS1' },
  { id: 'aws-ca-central-1', provider: 'aws', coordinates: [45.5, -73.6], name: 'Canada (Central)', region: 'Toronto', tier: 'secondary', code: 'CAC1' },
  { id: 'aws-af-south-1', provider: 'aws', coordinates: [-33.9147, 18.3759], name: 'Africa (Cape Town)', region: 'Cape Town', tier: 'secondary', code: 'AFS1' },
  { id: 'aws-eu-north-1', provider: 'aws', coordinates: [59.3262, 17.8420], name: 'Europe (Stockholm)', region: 'Stockholm', tier: 'secondary', code: 'EUN1' },
  { id: 'aws-eu-south-1', provider: 'aws', coordinates: [45.4628, 9.1077], name: 'Europe (Milan)', region: 'Milan', tier: 'secondary', code: 'EUS1' },
  { id: 'aws-me-south-1', provider: 'aws', coordinates: [25.9413, 50.3074], name: 'Middle East (Bahrain)', region: 'Bahrain', tier: 'secondary', code: 'MES1' },
  { id: 'aws-ap-east-1', provider: 'aws', coordinates: [22.2908, 114.2723], name: 'Asia Pacific (Hong Kong)', region: 'Hong Kong', tier: 'secondary', code: 'APE1' },
  { id: 'aws-cn-north-1', provider: 'aws', coordinates: [39.8094, 116.5783], name: 'China (Beijing)', region: 'Beijing', tier: 'secondary', code: 'CNN1' },
  { id: 'aws-cn-northwest-1', provider: 'aws', coordinates: [37.5024, 105.1627], name: 'China (Ningxia)', region: 'Ningxia', tier: 'secondary', code: 'CNW1' }
];

// Google Cloud Platform Locations (Blue markers, blue arcs)
export const gcpLocations: DatacenterLocation[] = [
  { id: 'gcp-us-central1', provider: 'gcp', coordinates: [41.59, -93.62], name: 'US Central (Iowa)', region: 'Iowa', tier: 'primary', code: 'USC1' },
  { id: 'gcp-us-west1', provider: 'gcp', coordinates: [45.87, -119.69], name: 'US West (Oregon)', region: 'Oregon', tier: 'secondary', code: 'USW1' },
  { id: 'gcp-us-west2', provider: 'gcp', coordinates: [34.05, -118.24], name: 'US West (Los Angeles)', region: 'Los Angeles', tier: 'secondary', code: 'USW2' },
  { id: 'gcp-us-east1', provider: 'gcp', coordinates: [33.84, -81.16], name: 'US East (South Carolina)', region: 'South Carolina', tier: 'secondary', code: 'USE1' },
  { id: 'gcp-us-east4', provider: 'gcp', coordinates: [39.03, -77.47], name: 'US East (N Virginia)', region: 'Virginia', tier: 'secondary', code: 'USE4' },
  { id: 'gcp-us-south1', provider: 'gcp', coordinates: [32.78, -96.80], name: 'US South (Dallas)', region: 'Dallas', tier: 'secondary', code: 'USS1' },
  { id: 'gcp-northamerica-northeast1', provider: 'gcp', coordinates: [43.65, -79.38], name: 'Canada (Toronto)', region: 'Toronto', tier: 'secondary', code: 'NAN1' },
  { id: 'gcp-europe-west1', provider: 'gcp', coordinates: [50.85, 4.35], name: 'Europe (Belgium)', region: 'Belgium', tier: 'primary', code: 'EUW1' },
  { id: 'gcp-europe-west2', provider: 'gcp', coordinates: [51.51, -0.13], name: 'Europe (London)', region: 'London', tier: 'secondary', code: 'EUW2' },
  { id: 'gcp-europe-west3', provider: 'gcp', coordinates: [50.11, 8.68], name: 'Europe (Frankfurt)', region: 'Frankfurt', tier: 'secondary', code: 'EUW3' },
  { id: 'gcp-europe-west4', provider: 'gcp', coordinates: [52.37, 4.90], name: 'Europe (Netherlands)', region: 'Netherlands', tier: 'secondary', code: 'EUW4' },
  { id: 'gcp-europe-west6', provider: 'gcp', coordinates: [47.37, 8.55], name: 'Europe (Zurich)', region: 'Zurich', tier: 'secondary', code: 'EUW6' },
  { id: 'gcp-europe-west9', provider: 'gcp', coordinates: [48.86, 2.35], name: 'Europe (Paris)', region: 'Paris', tier: 'secondary', code: 'EUW9' },
  { id: 'gcp-europe-north1', provider: 'gcp', coordinates: [60.17, 24.94], name: 'Europe (Finland)', region: 'Finland', tier: 'secondary', code: 'EUN1' },
  { id: 'gcp-europe-central2', provider: 'gcp', coordinates: [52.23, 21.01], name: 'Europe (Warsaw)', region: 'Warsaw', tier: 'secondary', code: 'EUC2' },
  { id: 'gcp-asia-southeast1', provider: 'gcp', coordinates: [1.35, 103.82], name: 'Asia (Singapore)', region: 'Singapore', tier: 'primary', code: 'ASE1' },
  { id: 'gcp-asia-southeast2', provider: 'gcp', coordinates: [-6.21, 106.85], name: 'Asia (Jakarta)', region: 'Jakarta', tier: 'secondary', code: 'ASE2' },
  { id: 'gcp-asia-east1', provider: 'gcp', coordinates: [25.03, 121.56], name: 'Asia (Taiwan)', region: 'Taiwan', tier: 'secondary', code: 'ASE1' },
  { id: 'gcp-asia-east2', provider: 'gcp', coordinates: [22.32, 114.17], name: 'Asia (Hong Kong)', region: 'Hong Kong', tier: 'secondary', code: 'ASE2' },
  { id: 'gcp-asia-northeast1', provider: 'gcp', coordinates: [35.68, 139.69], name: 'Asia (Tokyo)', region: 'Tokyo', tier: 'secondary', code: 'ANE1' },
  { id: 'gcp-asia-northeast2', provider: 'gcp', coordinates: [34.69, 135.50], name: 'Asia (Osaka)', region: 'Osaka', tier: 'secondary', code: 'ANE2' },
  { id: 'gcp-asia-northeast3', provider: 'gcp', coordinates: [37.57, 126.98], name: 'Asia (Seoul)', region: 'Seoul', tier: 'secondary', code: 'ANE3' },
  { id: 'gcp-asia-south1', provider: 'gcp', coordinates: [19.08, 72.88], name: 'Asia (Mumbai)', region: 'Mumbai', tier: 'secondary', code: 'ASS1' },
  { id: 'gcp-asia-south2', provider: 'gcp', coordinates: [28.61, 77.21], name: 'Asia (Delhi)', region: 'Delhi', tier: 'secondary', code: 'ASS2' },
  { id: 'gcp-australia-southeast1', provider: 'gcp', coordinates: [-33.87, 151.21], name: 'Australia (Sydney)', region: 'Sydney', tier: 'secondary', code: 'AUS1' },
  { id: 'gcp-australia-southeast2', provider: 'gcp', coordinates: [-37.81, 144.96], name: 'Australia (Melbourne)', region: 'Melbourne', tier: 'secondary', code: 'AUS2' },
  { id: 'gcp-southamerica-east1', provider: 'gcp', coordinates: [-23.55, -46.64], name: 'South America (São Paulo)', region: 'São Paulo', tier: 'secondary', code: 'SAE1' },
  { id: 'gcp-me-west1', provider: 'gcp', coordinates: [32.08, 34.78], name: 'Middle East (Tel Aviv)', region: 'Tel Aviv', tier: 'secondary', code: 'MEW1' },
  { id: 'gcp-me-central1', provider: 'gcp', coordinates: [26.43, 50.10], name: 'Middle East (Dammam)', region: 'Dammam', tier: 'secondary', code: 'MEC1' },
  { id: 'gcp-africa-south1', provider: 'gcp', coordinates: [-26.20, 28.05], name: 'Africa (Johannesburg)', region: 'Johannesburg', tier: 'secondary', code: 'AFS1' }
];

// Microsoft Azure Locations (Purple markers, purple arcs)
export const azureLocations: DatacenterLocation[] = [
  { id: 'azure-eastus', provider: 'azure', coordinates: [37.37, -79.82], name: 'East US (Virginia)', region: 'Virginia', tier: 'primary', code: 'EUS' },
  { id: 'azure-eastus2', provider: 'azure', coordinates: [36.60, -78.74], name: 'East US 2 (Virginia)', region: 'Virginia', tier: 'secondary', code: 'EUS2' },
  { id: 'azure-eastus3', provider: 'azure', coordinates: [33.45, -84.39], name: 'East US 3 (Georgia)', region: 'Georgia', tier: 'secondary', code: 'EUS3' },
  { id: 'azure-centralus', provider: 'azure', coordinates: [41.59, -93.62], name: 'Central US (Iowa)', region: 'Iowa', tier: 'secondary', code: 'CUS' },
  { id: 'azure-southcentralus', provider: 'azure', coordinates: [29.42, -98.49], name: 'South Central US (Texas)', region: 'Texas', tier: 'secondary', code: 'SCUS' },
  { id: 'azure-westcentralus', provider: 'azure', coordinates: [41.06, -106.32], name: 'West Central US (Wyoming)', region: 'Wyoming', tier: 'secondary', code: 'WCUS' },
  { id: 'azure-westus', provider: 'azure', coordinates: [37.78, -122.42], name: 'West US (California)', region: 'California', tier: 'secondary', code: 'WUS' },
  { id: 'azure-westus2', provider: 'azure', coordinates: [47.23, -119.85], name: 'West US 2 (Washington)', region: 'Washington', tier: 'primary', code: 'WUS2' },
  { id: 'azure-westus3', provider: 'azure', coordinates: [33.45, -112.07], name: 'West US 3 (Arizona)', region: 'Arizona', tier: 'secondary', code: 'WUS3' },
  { id: 'azure-northcentralus', provider: 'azure', coordinates: [41.83, -87.61], name: 'North Central US (Illinois)', region: 'Illinois', tier: 'secondary', code: 'NCUS' },
  { id: 'azure-canadacentral', provider: 'azure', coordinates: [43.65, -79.38], name: 'Canada Central (Toronto)', region: 'Toronto', tier: 'secondary', code: 'CAC' },
  { id: 'azure-canadaeast', provider: 'azure', coordinates: [46.82, -71.21], name: 'Canada East (Quebec)', region: 'Quebec', tier: 'secondary', code: 'CAE' },
  { id: 'azure-northeurope', provider: 'azure', coordinates: [53.35, -6.26], name: 'North Europe (Ireland)', region: 'Ireland', tier: 'primary', code: 'NEU' },
  { id: 'azure-westeurope', provider: 'azure', coordinates: [52.37, 4.90], name: 'West Europe (Netherlands)', region: 'Netherlands', tier: 'secondary', code: 'WEU' },
  { id: 'azure-uksouth', provider: 'azure', coordinates: [51.51, -0.13], name: 'UK South (London)', region: 'London', tier: 'secondary', code: 'UKS' },
  { id: 'azure-ukwest', provider: 'azure', coordinates: [51.48, -3.18], name: 'UK West (Cardiff)', region: 'Cardiff', tier: 'secondary', code: 'UKW' },
  { id: 'azure-francecentral', provider: 'azure', coordinates: [46.36, 2.37], name: 'France Central (Paris)', region: 'Paris', tier: 'secondary', code: 'FRC' },
  { id: 'azure-francesouth', provider: 'azure', coordinates: [43.30, 5.40], name: 'France South (Marseille)', region: 'Marseille', tier: 'secondary', code: 'FRS' },
  { id: 'azure-germanywestcentral', provider: 'azure', coordinates: [50.11, 8.68], name: 'Germany West Central (Frankfurt)', region: 'Frankfurt', tier: 'secondary', code: 'GWC' },
  { id: 'azure-germanynorth', provider: 'azure', coordinates: [52.52, 13.40], name: 'Germany North (Berlin)', region: 'Berlin', tier: 'secondary', code: 'GN' },
  { id: 'azure-norwayeast', provider: 'azure', coordinates: [59.91, 10.75], name: 'Norway East (Oslo)', region: 'Oslo', tier: 'secondary', code: 'NOE' },
  { id: 'azure-swedencentral', provider: 'azure', coordinates: [60.67, 17.14], name: 'Sweden Central (Stockholm)', region: 'Stockholm', tier: 'secondary', code: 'SWC' },
  { id: 'azure-switzerlandnorth', provider: 'azure', coordinates: [47.45, 8.56], name: 'Switzerland North (Zurich)', region: 'Zurich', tier: 'secondary', code: 'CHN' },
  { id: 'azure-eastasia', provider: 'azure', coordinates: [22.32, 114.17], name: 'East Asia (Hong Kong)', region: 'Hong Kong', tier: 'secondary', code: 'EA' },
  { id: 'azure-southeastasia', provider: 'azure', coordinates: [1.35, 103.82], name: 'Southeast Asia (Singapore)', region: 'Singapore', tier: 'primary', code: 'SEA' },
  { id: 'azure-australiaeast', provider: 'azure', coordinates: [-33.87, 151.21], name: 'Australia East (Sydney)', region: 'Sydney', tier: 'secondary', code: 'AUE' },
  { id: 'azure-australiasoutheast', provider: 'azure', coordinates: [-37.81, 144.96], name: 'Australia Southeast (Melbourne)', region: 'Melbourne', tier: 'secondary', code: 'AUSE' },
  { id: 'azure-australiacentral', provider: 'azure', coordinates: [-35.28, 149.13], name: 'Australia Central (Canberra)', region: 'Canberra', tier: 'secondary', code: 'AUC' },
  { id: 'azure-japaneast', provider: 'azure', coordinates: [35.68, 139.69], name: 'Japan East (Tokyo)', region: 'Tokyo', tier: 'secondary', code: 'JPE' },
  { id: 'azure-japanwest', provider: 'azure', coordinates: [34.69, 135.50], name: 'Japan West (Osaka)', region: 'Osaka', tier: 'secondary', code: 'JPW' },
  { id: 'azure-koreacentral', provider: 'azure', coordinates: [37.57, 126.98], name: 'Korea Central (Seoul)', region: 'Seoul', tier: 'secondary', code: 'KRC' },
  { id: 'azure-centralindia', provider: 'azure', coordinates: [18.52, 73.86], name: 'Central India (Pune)', region: 'Pune', tier: 'secondary', code: 'CIN' },
  { id: 'azure-southindia', provider: 'azure', coordinates: [13.09, 80.27], name: 'South India (Chennai)', region: 'Chennai', tier: 'secondary', code: 'SIN' },
  { id: 'azure-westindia', provider: 'azure', coordinates: [19.07, 72.88], name: 'West India (Mumbai)', region: 'Mumbai', tier: 'secondary', code: 'WIN' },
  { id: 'azure-brazilsouth', provider: 'azure', coordinates: [-23.55, -46.64], name: 'Brazil South (São Paulo)', region: 'São Paulo', tier: 'secondary', code: 'BRS' },
  { id: 'azure-southafricanorth', provider: 'azure', coordinates: [-26.20, 28.05], name: 'South Africa North (Johannesburg)', region: 'Johannesburg', tier: 'secondary', code: 'SAN' },
  { id: 'azure-uaenorth', provider: 'azure', coordinates: [25.20, 55.27], name: 'UAE North (Dubai)', region: 'Dubai', tier: 'secondary', code: 'UAN' }
];

// All locations combined
export const allLocations: DatacenterLocation[] = [
  issiHeadquarters,
  ...awsLocations,
  ...gcpLocations,
  ...azureLocations
];

// Priority HQ connections (always visible)
export const priorityConnections = [
  {
    source: 'issi-hq',
    target: 'aws-us-east-1',
    provider: 'hq' as const,
    color: '#dc2626',
    altitude: 0.4,
    thickness: 3,
    isPriority: true
  }
];

// HQ random targets (cycling every 3 seconds)
export const hqRandomTargets = [
  'aws-us-east-1',      // AWS Virginia (priority)
  'aws-eu-west-1',      // AWS Ireland
  'gcp-us-central1',    // GCP Iowa
  'gcp-europe-west1',   // GCP Belgium
  'azure-eastus',       // Azure Virginia
  'azure-northeurope'   // Azure Ireland
];

// Provider internal connections
export const awsConnections = [
  ['aws-us-east-1', 'aws-us-west-1'],
  ['aws-us-east-1', 'aws-eu-west-1'],
  ['aws-us-east-1', 'aws-ap-southeast-1'],
  ['aws-us-west-1', 'aws-ap-northeast-1'],
  ['aws-eu-west-1', 'aws-eu-central-1'],
  ['aws-ap-southeast-1', 'aws-ap-northeast-1'],
  ['aws-eu-west-1', 'aws-eu-west-2'],
  ['aws-us-east-2', 'aws-us-west-2']
];

export const gcpConnections = [
  ['gcp-us-central1', 'gcp-us-west1'],
  ['gcp-us-central1', 'gcp-europe-west1'],
  ['gcp-us-central1', 'gcp-asia-southeast1'],
  ['gcp-europe-west1', 'gcp-europe-west2'],
  ['gcp-asia-southeast1', 'gcp-asia-northeast1'],
  ['gcp-europe-west1', 'gcp-europe-west3'],
  ['gcp-us-east1', 'gcp-us-west2'],
  ['gcp-asia-southeast1', 'gcp-australia-southeast1']
];

export const azureConnections = [
  ['azure-eastus', 'azure-westus2'],
  ['azure-eastus', 'azure-northeurope'],
  ['azure-eastus', 'azure-southeastasia'],
  ['azure-northeurope', 'azure-westeurope'],
  ['azure-southeastasia', 'azure-japaneast'],
  ['azure-eastus2', 'azure-westus'],
  ['azure-centralus', 'azure-canadacentral'],
  ['azure-australiaeast', 'azure-japaneast']
];

export const getLocationById = (id: string): DatacenterLocation | undefined => {
  return allLocations.find(location => location.id === id);
};
