"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function ServicesMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Load D3 and TopoJSON scripts dynamically
    const loadScripts = async () => {
      // Check if D3 is already loaded
      if (!(window as any).d3) {
        const d3Script = document.createElement('script');
        d3Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
        d3Script.async = true;
        document.body.appendChild(d3Script);
        await new Promise(resolve => d3Script.onload = resolve);
      }

      // Check if TopoJSON is already loaded
      if (!(window as any).topojson) {
        const topoScript = document.createElement('script');
        topoScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';
        topoScript.async = true;
        document.body.appendChild(topoScript);
        await new Promise(resolve => topoScript.onload = resolve);
      }

      // Now that scripts are loaded, initialize the map
      initializeMap();
    };

    loadScripts();

    function initializeMap() {
      const d3 = (window as any).d3;
      const topojson = (window as any).topojson;
      if (!d3 || !topojson) return;

      // State capitals coordinates (longitude, latitude)
      const stateCapitals = {
        "California": [-121.4694, 38.5556],      // Sacramento
        "Colorado": [-104.9903, 39.7392],        // Denver
        "District of Columbia": [-77.0369, 38.9072], // Washington DC
        "Florida": [-84.27277, 30.4518],         // Tallahassee
        "Georgia": [-84.39, 33.76],              // Atlanta
        "Illinois": [-89.650373, 39.78325],      // Springfield
        "Indiana": [-86.147685, 39.790942],      // Indianapolis
        "Iowa": [-93.620866, 41.590939],         // Des Moines
        "Louisiana": [-91.140229, 30.45809],     // Baton Rouge
        "Maryland": [-76.501157, 38.972945],     // Annapolis
        "Massachusetts": [-71.0275, 42.2352],    // Boston
        "Minnesota": [-94.6859, 44.95],          // Saint Paul
        "New Jersey": [-74.756138, 40.221741],   // Trenton
        "New York": [-73.781339, 42.659829],     // Albany
        "North Carolina": [-78.638, 35.771],     // Raleigh
        "Pennsylvania": [-76.875613, 40.269789], // Harrisburg
        "Tennessee": [-86.784, 36.165],          // Nashville
        "Texas": [-97.75, 30.266667],            // Austin
        "Virginia": [-77.46, 37.54],             // Richmond
        "Washington": [-122.893077, 47.042418],  // Olympia
        "Wisconsin": [-89.384444, 43.074722]     // Madison
      };

      const servedStates = Object.keys(stateCapitals);

      // Clear any existing SVG
      d3.select(mapRef.current).selectAll("svg").remove();

      // Set up the map
      const width = 960;
      const height = 400;

      const svg = d3.select(mapRef.current)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");

      const projection = d3.geoAlbersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath()
        .projection(projection);

      const tooltip = d3.select(tooltipRef.current);

      // Load US map data
      d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(function(us: any) {
        // Draw states
        svg.append("g")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", function(d: any) {
            const stateName = getStateName(d.id);
            return servedStates.includes(stateName) ? "state served" : "state";
          });

        // Add state borders
        svg.append("path")
          .datum(topojson.mesh(us, us.objects.states, function(a: any, b: any) { return a !== b; }))
          .attr("fill", "none")
          .attr("stroke", isDark ? "#475569" : "#94a3b8")
          .attr("stroke-linejoin", "round")
          .attr("d", path);

        // Add markers for served state capitals
        svg.selectAll(".state-marker")
          .data(Object.entries(stateCapitals))
          .enter()
          .append("circle")
          .attr("class", "state-marker")
          .attr("cx", function(d: any) { return projection(d[1])[0]; })
          .attr("cy", function(d: any) { return projection(d[1])[1]; })
          .attr("r", 6)
          .on("mouseenter", function(event: any, d: any) {
            const [stateName, coordinates] = d;
            tooltip.html(stateName)
              .classed("visible", true);
            
            const [x, y] = d3.pointer(event, document.body);
            tooltip.style("left", (x - tooltip.node().offsetWidth / 2) + "px")
                   .style("top", (y - tooltip.node().offsetHeight - 10) + "px");
          })
          .on("mouseleave", function() {
            tooltip.classed("visible", false);
          });
      });
    }

    // Helper function to get state name from FIPS code
    function getStateName(fipsCode: number | string) {
      const stateNames: {[key: string]: string} = {
        "01": "Alabama", "02": "Alaska", "04": "Arizona", "05": "Arkansas", "06": "California",
        "08": "Colorado", "09": "Connecticut", "10": "Delaware", "11": "District of Columbia",
        "12": "Florida", "13": "Georgia", "15": "Hawaii", "16": "Idaho", "17": "Illinois",
        "18": "Indiana", "19": "Iowa", "20": "Kansas", "21": "Kentucky", "22": "Louisiana",
        "23": "Maine", "24": "Maryland", "25": "Massachusetts", "26": "Michigan", "27": "Minnesota",
        "28": "Mississippi", "29": "Missouri", "30": "Montana", "31": "Nebraska", "32": "Nevada",
        "33": "New Hampshire", "34": "New Jersey", "35": "New Mexico", "36": "New York",
        "37": "North Carolina", "38": "North Dakota", "39": "Ohio", "40": "Oklahoma", "41": "Oregon",
        "42": "Pennsylvania", "44": "Rhode Island", "45": "South Carolina", "46": "South Dakota",
        "47": "Tennessee", "48": "Texas", "49": "Utah", "50": "Vermont", "51": "Virginia",
        "53": "Washington", "54": "West Virginia", "55": "Wisconsin", "56": "Wyoming"
      };
      return stateNames[fipsCode.toString().padStart(2, '0')] || "";
    }

    // Clean up event listeners when component unmounts
    return () => {
      // Any cleanup code here if needed
    };
  }, [isDark]);
  return (
    <div className="w-full">
      <style jsx>{`
        .state {
          fill: ${isDark ? '#1e293b' : '#e2e8f0'};
          stroke: ${isDark ? '#475569' : '#94a3b8'};
          stroke-width: 1;
          transition: all 0.3s ease;
        }

        .state.served {
          fill: ${isDark ? 'rgba(30, 64, 175, 0.6)' : 'rgba(219, 234, 254, 0.8)'};
          backdrop-filter: blur(4px);
        }

        .state-marker {
          fill: ${isDark ? '#60a5fa' : '#3b82f6'};
          stroke: ${isDark ? '#0f172a' : 'white'};
          stroke-width: 2;
          filter: drop-shadow(0 0 8px ${isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)'});
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .state-marker:hover {
          fill: ${isDark ? '#f87171' : '#ef4444'};
          stroke-width: 3;
          r: 8;
          filter: drop-shadow(0 0 12px ${isDark ? 'rgba(248, 113, 113, 0.6)' : 'rgba(239, 68, 68, 0.6)'});
          transform: translateY(-2px);
        }

        .tooltip {
          position: absolute;
          background: ${isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(30, 41, 59, 0.85)'};
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          backdrop-filter: blur(8px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
          transform: translateY(10px);
        }

        .tooltip.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div ref={mapRef} className="w-full h-96"></div>
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
}
