"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef } from 'react';

export function ServicesMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    let resizeObserver: ResizeObserver;

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

      // Set up resize observer to redraw map on container size change
      if (mapRef.current) {
        resizeObserver = new ResizeObserver(() => {
          // Debounce resize events
          clearTimeout((window as any).mapResizeTimeout);
          (window as any).mapResizeTimeout = setTimeout(() => {
            initializeMap();
          }, 250);
        });
        resizeObserver.observe(mapRef.current);
      }
    };

    loadScripts();    function initializeMap() {
      const d3 = (window as any).d3;
      const topojson = (window as any).topojson;
      if (!d3 || !topojson || !mapRef.current) return;
      
      // Get container dimensions for responsive sizing
      const containerRect = mapRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width || 800;
      const containerHeight = containerRect.height || 400;
      
      // Enhanced state capitals data with comprehensive information
      const stateCapitals = {
        "California": {
          coordinates: [-121.4694, 38.5556], // Sacramento
          city: "Sacramento",
          population: "39.5M",
          gdp: "$3.6T",
          itBudget: "$1.2B",
          cybersecurityGrade: "B+",
          techEmployment: "1.8M",
          majorIndustries: ["Technology", "Entertainment", "Agriculture"]
        },
        "Colorado": {
          coordinates: [-104.9903, 39.7392], // Denver
          city: "Denver",
          population: "5.8M",
          gdp: "$374B",
          itBudget: "$89M",
          cybersecurityGrade: "A-",
          techEmployment: "145K",
          majorIndustries: ["Aerospace", "Technology", "Energy"]
        },
        "District of Columbia": {
          coordinates: [-77.0369, 38.9072], // Washington DC
          city: "Washington DC",
          population: "702K",
          gdp: "$141B",
          itBudget: "$2.1B",
          cybersecurityGrade: "A+",
          techEmployment: "89K",
          majorIndustries: ["Government", "Technology", "Defense"]
        },
        "Florida": {
          coordinates: [-84.27277, 30.4518], // Tallahassee
          city: "Tallahassee", 
          population: "22.6M",
          gdp: "$1.1T",
          itBudget: "$445M",
          cybersecurityGrade: "B",
          techEmployment: "312K",
          majorIndustries: ["Tourism", "Aerospace", "Agriculture"]
        },
        "Georgia": {
          coordinates: [-84.39, 33.76], // Atlanta
          city: "Atlanta",
          population: "10.9M",
          gdp: "$602B",
          itBudget: "$234M",
          cybersecurityGrade: "B+",
          techEmployment: "189K",
          majorIndustries: ["Logistics", "Technology", "Film"]
        },
        "Illinois": {
          coordinates: [-89.650373, 39.78325], // Springfield
          city: "Springfield",
          population: "12.6M",
          gdp: "$825B",
          itBudget: "$378M",
          cybersecurityGrade: "B",
          techEmployment: "267K",
          majorIndustries: ["Manufacturing", "Agriculture", "Technology"]
        },
        "Indiana": {
          coordinates: [-86.147685, 39.790942], // Indianapolis
          city: "Indianapolis",
          population: "6.8M",
          gdp: "$379B",
          itBudget: "$156M",
          cybersecurityGrade: "B-",
          techEmployment: "98K",
          majorIndustries: ["Manufacturing", "Healthcare", "Technology"]
        },
        "Iowa": {
          coordinates: [-93.620866, 41.590939], // Des Moines
          city: "Des Moines",
          population: "3.2M",
          gdp: "$195B",
          itBudget: "$67M",
          cybersecurityGrade: "B",
          techEmployment: "45K",
          majorIndustries: ["Agriculture", "Insurance", "Manufacturing"]
        },
        "Louisiana": {
          coordinates: [-91.140229, 30.45809], // Baton Rouge
          city: "Baton Rouge",
          population: "4.6M",
          gdp: "$253B",
          itBudget: "$89M",
          cybersecurityGrade: "C+",
          techEmployment: "56K",
          majorIndustries: ["Petrochemicals", "Agriculture", "Tourism"]
        },
        "Maryland": {
          coordinates: [-76.501157, 38.972945], // Annapolis
          city: "Annapolis",
          population: "6.2M",
          gdp: "$405B",
          itBudget: "$892M",
          cybersecurityGrade: "A",
          techEmployment: "234K",
          majorIndustries: ["Cybersecurity", "Biotechnology", "Defense"]
        },
        "Massachusetts": {
          coordinates: [-71.0275, 42.2352], // Boston
          city: "Boston",
          population: "7.0M",
          gdp: "$584B",
          itBudget: "$445M",
          cybersecurityGrade: "A",
          techEmployment: "298K",
          majorIndustries: ["Technology", "Biotechnology", "Finance"]
        },
        "Minnesota": {
          coordinates: [-94.6859, 44.95], // Saint Paul
          city: "Saint Paul",
          population: "5.7M",
          gdp: "$374B",
          itBudget: "$167M",
          cybersecurityGrade: "B+",
          techEmployment: "134K",
          majorIndustries: ["Healthcare", "Technology", "Manufacturing"]
        },
        "New Jersey": {
          coordinates: [-74.756138, 40.221741], // Trenton
          city: "Trenton",
          population: "9.3M",
          gdp: "$625B",
          itBudget: "$389M",
          cybersecurityGrade: "B+",
          techEmployment: "245K",
          majorIndustries: ["Pharmaceuticals", "Technology", "Finance"]
        },
        "New York": {
          coordinates: [-73.781339, 42.659829], // Albany
          city: "Albany",
          population: "19.3M",
          gdp: "$1.9T",
          itBudget: "$1.8B",
          cybersecurityGrade: "A-",
          techEmployment: "756K",
          majorIndustries: ["Finance", "Technology", "Media"]
        },
        "North Carolina": {
          coordinates: [-78.638, 35.771], // Raleigh
          city: "Raleigh",
          population: "10.7M",
          gdp: "$596B",
          itBudget: "$278M",
          cybersecurityGrade: "B+",
          techEmployment: "189K",
          majorIndustries: ["Technology", "Banking", "Biotechnology"]
        },
        "Pennsylvania": {
          coordinates: [-76.875613, 40.269789], // Harrisburg
          city: "Harrisburg",
          population: "13.0M",
          gdp: "$788B",
          itBudget: "$456M",
          cybersecurityGrade: "B",
          techEmployment: "234K",
          majorIndustries: ["Manufacturing", "Healthcare", "Technology"]
        },
        "Tennessee": {
          coordinates: [-86.784, 36.165], // Nashville
          city: "Nashville",
          population: "7.0M",
          gdp: "$384B",
          itBudget: "$123M",
          cybersecurityGrade: "B-",
          techEmployment: "89K",
          majorIndustries: ["Healthcare", "Music", "Manufacturing"]
        },
        "Texas": {
          coordinates: [-97.75, 30.266667], // Austin
          city: "Austin",
          population: "30.0M",
          gdp: "$2.4T",
          itBudget: "$892M",
          cybersecurityGrade: "B+",
          techEmployment: "567K",
          majorIndustries: ["Technology", "Energy", "Aerospace"]
        },
        "Virginia": {
          coordinates: [-77.46, 37.54], // Richmond
          city: "Richmond",
          population: "8.6M",
          gdp: "$536B",
          itBudget: "$678M",
          cybersecurityGrade: "A",
          techEmployment: "289K",
          majorIndustries: ["Defense", "Technology", "Government"]
        },
        "Washington": {
          coordinates: [-122.893077, 47.042418], // Olympia
          city: "Olympia",
          population: "7.7M",
          gdp: "$613B",
          itBudget: "$445M",
          cybersecurityGrade: "A-",
          techEmployment: "387K",
          majorIndustries: ["Technology", "Aerospace", "Agriculture"]
        },
        "Wisconsin": {
          coordinates: [-89.384444, 43.074722], // Madison
          city: "Madison",
          population: "5.9M",
          gdp: "$348B",
          itBudget: "$134M",
          cybersecurityGrade: "B",
          techEmployment: "98K",
          majorIndustries: ["Manufacturing", "Agriculture", "Technology"]
        }
      };      const servedStates = Object.keys(stateCapitals);

      // Clear any existing SVG
      d3.select(mapRef.current).selectAll("svg").remove();
      
      // Set up the map with responsive dimensions
      const width = Math.min(containerWidth, 1000);  // Max width of 1000px
      const height = Math.min(containerHeight, width * 0.6); // Maintain aspect ratio
      
      // Calculate optimal scale based on container size
      const scale = Math.min(width * 1.2, height * 2.4, 1200);

      const svg = d3.select(mapRef.current)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("background", "transparent")
        .style("max-width", "100%")
        .style("height", "auto");

      const projection = d3.geoAlbersUsa()
        .scale(scale)
        .translate([width / 2, height / 2])
        .fitSize([width * 0.95, height * 0.95], {type: "Sphere"});

      const path = d3.geoPath()
        .projection(projection);

      const tooltip = d3.select(tooltipRef.current);      // Load US map data
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
          .attr("d", path);        // Add markers for served state capitals
        svg.selectAll(".state-marker")
          .data(Object.entries(stateCapitals))
          .enter()
          .append("circle")
          .attr("class", "state-marker")
          .attr("cx", function(d: any) { 
            const coords = projection(d[1].coordinates);
            return coords ? coords[0] : 0;
          })
          .attr("cy", function(d: any) { 
            const coords = projection(d[1].coordinates);
            return coords ? coords[1] : 0;
          })
          .attr("r", Math.max(4, Math.min(8, width / 120))) // Responsive marker size
          .on("mouseenter", function(event: any, d: any) {
            const [stateName, stateData] = d;
            const tooltipContent = `
              <div class="tooltip-header">
                <h3>${stateData.city}, ${stateName}</h3>
              </div>
              <div class="tooltip-content">
                <div class="tooltip-row">
                  <span class="tooltip-label">Population:</span>
                  <span class="tooltip-value">${stateData.population}</span>
                </div>
                <div class="tooltip-row">
                  <span class="tooltip-label">GDP:</span>
                  <span class="tooltip-value">${stateData.gdp}</span>
                </div>
                <div class="tooltip-row">
                  <span class="tooltip-label">IT Budget:</span>
                  <span class="tooltip-value">${stateData.itBudget}</span>
                </div>
                <div class="tooltip-row">
                  <span class="tooltip-label">Cybersecurity Grade:</span>
                  <span class="tooltip-value grade-${stateData.cybersecurityGrade.replace('+', 'plus').replace('-', 'minus')}">${stateData.cybersecurityGrade}</span>
                </div>
                <div class="tooltip-row">
                  <span class="tooltip-label">Tech Employment:</span>
                  <span class="tooltip-value">${stateData.techEmployment}</span>
                </div>
                <div class="tooltip-industries">
                  <span class="tooltip-label">Key Industries:</span>
                  <div class="industry-tags">
                    ${stateData.majorIndustries.map((industry: string) => `<span class="industry-tag">${industry}</span>`).join('')}
                  </div>
                </div>
              </div>
            `;
            
            tooltip.html(tooltipContent)
              .classed("visible", true);
            
            const [x, y] = d3.pointer(event, document.body);
            tooltip.style("left", (x - tooltip.node().offsetWidth / 2) + "px")
                   .style("top", (y - tooltip.node().offsetHeight - 15) + "px");
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
    }    // Clean up event listeners when component unmounts
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout((window as any).mapResizeTimeout);
    };
  }, [isDark]);return (
    <div className="w-full relative">
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
        }.tooltip {
          position: absolute;
          background: ${isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(30, 41, 59, 0.95)'};
          color: white;
          padding: 0;
          border-radius: 12px;
          font-size: 0.875rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 1000;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          backdrop-filter: blur(12px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
          transform: translateY(10px);
          min-width: 280px;
          max-width: 320px;
        }

        .tooltip.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tooltip-header {
          background: ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.2)'};
          padding: 12px 16px;
          border-radius: 12px 12px 0 0;
          border-bottom: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)'};
        }

        .tooltip-header h3 {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          color: ${isDark ? '#93c5fd' : '#dbeafe'};
        }

        .tooltip-content {
          padding: 12px 16px;
        }

        .tooltip-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          padding: 4px 0;
        }

        .tooltip-row:last-child {
          margin-bottom: 0;
        }

        .tooltip-label {
          font-weight: 500;
          color: ${isDark ? '#cbd5e1' : '#e2e8f0'};
          font-size: 0.8rem;
        }

        .tooltip-value {
          font-weight: 600;
          color: white;
          font-size: 0.85rem;
        }

        .tooltip-value.grade-Aplus,
        .tooltip-value.grade-A {
          color: #22c55e;
        }

        .tooltip-value.grade-Aminus,
        .tooltip-value.grade-Bplus {
          color: #84cc16;
        }

        .tooltip-value.grade-B {
          color: #eab308;
        }

        .tooltip-value.grade-Bminus,
        .tooltip-value.grade-Cplus {
          color: #f97316;
        }

        .tooltip-value.grade-C,
        .tooltip-value.grade-Cminus {
          color: #ef4444;
        }

        .tooltip-industries {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)'};
        }

        .tooltip-industries .tooltip-label {
          display: block;
          margin-bottom: 8px;
        }

        .industry-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }        .industry-tag {
          background: ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'};
          color: ${isDark ? '#93c5fd' : '#dbeafe'};
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.4)'};
        }      `}</style>      
      <div ref={mapRef} className="w-full h-[400px] min-h-[300px] flex items-center justify-center"></div>
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
}
