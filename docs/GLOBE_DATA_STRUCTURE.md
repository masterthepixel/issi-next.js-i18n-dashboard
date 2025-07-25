# Globe.json Data Structure Documentation

## Overview

The `globe.json` file contains geographic data in GeoJSON format that defines country boundaries and territories for the Aceternity UI Globe component. This file is a **FeatureCollection** containing polygon and multipolygon geometries representing world countries and administrative regions.

## Root Structure

```json
{
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    // Array of Feature objects
  ]
}
```

### Root Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Always "FeatureCollection" - indicates this is a GeoJSON FeatureCollection |
| `crs` | object | Coordinate Reference System definition |
| `features` | array | Array of Feature objects representing countries/territories |

## Coordinate Reference System (CRS)

```json
{
  "type": "name",
  "properties": {
    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
  }
}
```

- **Standard**: Uses OGC CRS84 coordinate reference system
- **Format**: Geographic coordinates (longitude, latitude) in decimal degrees
- **Datum**: WGS84 (World Geodetic System 1984)

## Feature Structure

Each country/territory is represented as a Feature object with properties and geometry:

### Feature Properties

```json
{
  "type": "Feature",
  "properties": {
    "admin": "Country Administrative Name",
    "name": "Country Display Name", 
    "continent": "Continent Name"
  },
  "geometry": {
    // Geometry object (Polygon or MultiPolygon)
  }
}
```

#### Properties Schema

| Property | Type | Description | Example Values |
|----------|------|-------------|----------------|
| `admin` | string | Official administrative name | "Afghanistan", "United States of America" |
| `name` | string | Common display name | "Afghanistan", "United States" |
| `continent` | string | Continent classification | "Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica" |

## Geometry Types

The file contains two types of geometries:

### 1. Polygon Geometry

Used for countries with a single continuous landmass.

```json
{
  "type": "Polygon",
  "coordinates": [
    [
      [longitude, latitude],
      [longitude, latitude],
      [longitude, latitude],
      // ... more coordinate pairs
      [longitude, latitude]  // Last point should match first point to close polygon
    ]
  ]
}
```

**Example - Afghanistan (Simple Polygon):**

```json
{
  "type": "Feature",
  "properties": {
    "admin": "Afghanistan",
    "name": "Afghanistan",
    "continent": "Asia"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [61.21081709172573, 35.650072333309218],
        [62.230651483005879, 35.270663967422287],
        [62.984662306576588, 35.404040839167614],
        // ... more coordinates defining the border
        [61.21081709172573, 35.650072333309218]  // Closed polygon
      ]
    ]
  }
}
```

### 2. MultiPolygon Geometry

Used for countries with multiple separate landmasses (islands, archipelagos, or non-contiguous territories).

```json
{
  "type": "MultiPolygon", 
  "coordinates": [
    [
      [
        [longitude, latitude],
        [longitude, latitude],
        // ... coordinates for first polygon
      ]
    ],
    [
      [
        [longitude, latitude],
        [longitude, latitude], 
        // ... coordinates for second polygon
      ]
    ]
    // ... additional polygons
  ]
}
```

**Example - Angola (MultiPolygon with separate regions):**

```json
{
  "type": "Feature",
  "properties": {
    "admin": "Angola",
    "name": "Angola", 
    "continent": "Africa"
  },
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [
          [16.326528354567042, -5.877470391466217],
          [16.573179965896141, -6.622644545115092],
          [16.860190870845226, -7.222297865429978],
          // ... more coordinates for main territory
        ]
      ],
      [
        [
          // Coordinates for Cabinda province (separate enclave)
        ]
      ]
    ]
  }
}
```

## Coordinate Format

All coordinates follow the **[longitude, latitude]** format:

- **Longitude**: East-West position (-180 to +180 degrees)
  - Negative values = West of Prime Meridian
  - Positive values = East of Prime Meridian
- **Latitude**: North-South position (-90 to +90 degrees)
  - Negative values = South of Equator
  - Positive values = North of Equator

**Example Coordinates:**

```json
[61.21081709172573, 35.650072333309218]
//  ^longitude        ^latitude
//  61.21° East       35.65° North
```

## Polygon Closure Rules

- **Polygon**: First and last coordinate points must be identical to close the shape
- **MultiPolygon**: Each individual polygon within the collection must be closed
- **Winding Order**: Exterior rings follow counter-clockwise winding, holes follow clockwise

## Continental Classifications

The dataset includes these continent values:

| Continent | Description | Example Countries |
|-----------|-------------|-------------------|
| "Asia" | Asian countries | Afghanistan, China, India |
| "Europe" | European countries | Albania, Germany, France |
| "Africa" | African countries | Angola, Nigeria, South Africa |
| "North America" | North American countries | United States, Canada, Mexico |
| "South America" | South American countries | Argentina, Brazil, Chile |
| "Oceania" | Oceanic countries | Australia, New Zealand, Fiji |
| "Antarctica" | Antarctic territories | Research stations, territorial claims |

## Data Usage in Globe Component

The Globe component processes this data as follows:

1. **Parsing**: Reads the FeatureCollection and extracts individual features
2. **Rendering**: Converts coordinate arrays into 3D globe polygons
3. **Styling**: Applies uniform styling to all country polygons based on `globeConfig.polygonColor`
4. **Interaction**: Enables hover/click interactions on country boundaries

## File Statistics

- **Total Features**: ~240+ countries and territories
- **File Size**: ~42,679 lines
- **Geometry Types**: Mixed Polygon and MultiPolygon
- **Coordinate Precision**: Up to 15 decimal places for high accuracy
- **Coverage**: Global coverage including all UN-recognized countries and major territories

## Technical Notes

- **Performance**: Large file size may impact initial load time; consider lazy loading for production
- **Precision**: High coordinate precision ensures accurate country boundary representation
- **Compatibility**: Standard GeoJSON format compatible with most mapping libraries
- **Updates**: Static data; may require periodic updates for geopolitical changes

## Integration Example

```typescript
// Loading and using the globe data
import globeData from '@/data/globe.json';

// The data structure matches:
interface GlobeData {
  type: "FeatureCollection";
  crs: {
    type: "name";
    properties: {
      name: string;
    };
  };
  features: Array<{
    type: "Feature";
    properties: {
      admin: string;
      name: string;
      continent: string;
    };
    geometry: {
      type: "Polygon" | "MultiPolygon";
      coordinates: number[][][] | number[][][][];
    };
  }>;
}
```

This data structure provides the foundation for rendering accurate, interactive country boundaries on the 3D globe visualization.
