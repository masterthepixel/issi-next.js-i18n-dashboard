"use client";

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import styles from './services-map.module.css';

export function ServicesMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
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

    loadScripts(); function initializeMap() {
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
      }; const servedStates = Object.keys(stateCapitals);

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
        .fitSize([width * 0.95, height * 0.95], { type: "Sphere" });

      const path = d3.geoPath()
        .projection(projection);

      const tooltip = d3.select(tooltipRef.current);      // Load US map data
      d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(function (us: any) {
        // Draw states
        svg.append("g")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", function (d: any) {
            const stateName = getStateName(d.id);
            return `${styles.state} ${servedStates.includes(stateName) ? styles.served : ''
              }`;
          });

        // Add state borders
        svg.append("path")
          .datum(topojson.mesh(us, us.objects.states, function (a: any, b: any) { return a !== b; }))
          .attr("fill", "none")
          .attr("stroke", "hsl(var(--border))")
          .attr("stroke-linejoin", "round")
          .attr("d", path);        // Add markers for served state capitals
        svg.selectAll(".state-marker")
          .data(Object.entries(stateCapitals))
          .enter()
          .append("circle")
          .attr("class", styles.stateMarker)
          .attr("cx", function (d: any) {
            const coords = projection(d[1].coordinates);
            return coords ? coords[0] : 0;
          })
          .attr("cy", function (d: any) {
            const coords = projection(d[1].coordinates);
            return coords ? coords[1] : 0;
          })
          .attr("r", Math.max(4, Math.min(8, width / 120))) // Responsive marker size
          .on("mouseenter", function (event: any, d: any) {
            const [stateName, stateData] = d;
            const tooltipContent = `
              <div class="${styles.tooltipHeader}">
                <h3>${stateData.city}, ${stateName}</h3>
              </div>
              <div class="${styles.tooltipContent}">
                <div class="${styles.tooltipRow}">
                  <span class="${styles.tooltipLabel}">Population:</span>
                  <span class="${styles.tooltipValue}">${stateData.population}</span>
                </div>
                <div class="${styles.tooltipRow}">
                  <span class="${styles.tooltipLabel}">GDP:</span>
                  <span class="${styles.tooltipValue}">${stateData.gdp}</span>
                </div>
                <div class="${styles.tooltipRow}">
                  <span class="${styles.tooltipLabel}">IT Budget:</span>
                  <span class="${styles.tooltipValue}">${stateData.itBudget}</span>
                </div>
                <div class="${styles.tooltipRow}">
                  <span class="${styles.tooltipLabel}">Cybersecurity Grade:</span>
                  <span class="${styles.tooltipValue} ${styles[`grade${stateData.cybersecurityGrade.replace('+', 'plus').replace('-', 'minus')}`]}">${stateData.cybersecurityGrade}</span>
                </div>
                <div class="${styles.tooltipRow}">
                  <span class="${styles.tooltipLabel}">Tech Employment:</span>
                  <span class="${styles.tooltipValue}">${stateData.techEmployment}</span>
                </div>
                <div class="${styles.tooltipIndustries}">
                  <span class="${styles.tooltipLabel}">Key Industries:</span>
                  <div class="${styles.industryTags}">
                    ${stateData.majorIndustries.map((industry: string) => `<span class="${styles.industryTag}">${industry}</span>`).join('')}
                  </div>
                </div>
              </div>
            `;

            tooltip.html(tooltipContent)
              .classed(styles.visible, true);

            const [x, y] = d3.pointer(event, document.body);
            tooltip.style("left", (x - tooltip.node().offsetWidth / 2) + "px")
              .style("top", (y - tooltip.node().offsetHeight - 15) + "px");
          })
          .on("mouseleave", function () {
            tooltip.classed(styles.visible, false);
          });
      });
    }

    // Helper function to get state name from FIPS code
    function getStateName(fipsCode: number | string) {
      const stateNames: { [key: string]: string } = {
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
  }, [theme]);
  return (
    <div className="w-full relative" data-testid="map-container">
      <div
        ref={mapRef}
        className="w-full h-[400px] min-h-[300px] flex items-center justify-center"
      ></div>
      <div ref={tooltipRef} className={styles.tooltip}></div>
    </div>
  );
}
