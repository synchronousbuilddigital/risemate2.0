"use client";

import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function Globe3D({
  className = "w-full h-full min-h-[400px]",
  initialRotation = null,
  focusLocation = null
}) {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // Check if window is defined (Next.js SSR compatibility)
    if (typeof window === "undefined") return;

    // Create root element
    let root = am5.Root.new(chartRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Determine initial rotation centered on India HQ
    let startX = -77.02; // Longitude of Gurugram HQ is ~77.02 E (inverted for amCharts rotationX)
    let startY = -20;    // Tilt slightly down to showcase northern hemisphere

    if (focusLocation) {
      startX = -focusLocation.longitude;
      startY = -focusLocation.latitude;
    } else if (initialRotation) {
      startX = initialRotation.x;
      startY = initialRotation.y;
    }

    // Create map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        rotationX: startX,
        rotationY: startY,
        zoomLevel: focusLocation && focusLocation.zoom ? focusLocation.zoom : 1
      })
    );

    // Add subtle background/ocean
    let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0x000d24),
      fillOpacity: 0.5,
      strokeOpacity: 0
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    // Create polygon series for countries
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    // Configure polygon templates
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0x001233), // Base RMV Dark Blue
      stroke: am5.color(0xFF7B00), // RMV Gold stroke
      strokeWidth: 0.5,
      strokeOpacity: 0.8
    });

    // Hover state color change
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x00ffff), // Cyan highlight
    });

    // Active (selected) state
    let activeState = polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color(0xFF7B00), // Gold highlight for active
    });

    // --- Add Global Hubs & Connections ---
    const hubs = [
      { id: "gurugram", name: "Gurugram (HQ)", latitude: 28.4595, longitude: 77.0266 },
      { id: "jaipur", name: "Jaipur Office", latitude: 26.9124, longitude: 75.7873 },
      { id: "mumbai", name: "Mumbai Office", latitude: 19.0760, longitude: 72.8777 },
      { id: "singapore", name: "Singapore Hub", latitude: 1.3521, longitude: 103.8198 },
      { id: "london", name: "London Hub", latitude: 51.5074, longitude: -0.1278 },
      { id: "newyork", name: "New York Hub", latitude: 40.7128, longitude: -74.0060 },
      { id: "sanfrancisco", name: "San Francisco Office", latitude: 37.7749, longitude: -122.4194 },
      { id: "dubai", name: "Dubai Hub", latitude: 25.2048, longitude: 55.2708 },
      { id: "tokyo", name: "Tokyo Hub", latitude: 35.6762, longitude: 139.6503 },
      { id: "sydney", name: "Sydney Hub", latitude: -33.8688, longitude: 151.2093 },
      { id: "frankfurt", name: "Frankfurt Office", latitude: 50.1109, longitude: 8.6821 }
    ];

    // Create point series for global hubs
    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        clipFront: true
      })
    );

    pointSeries.bullets.push(function () {
      let container = am5.Container.new(root, {});

      // Outer glowing ring
      let glowingRing = container.children.push(
        am5.Circle.new(root, {
          radius: 8,
          fill: am5.color(0xFF7B00),
          fillOpacity: 0.3,
          strokeWidth: 0,
        })
      );

      // Pulse animation for the ring
      glowingRing.animate({
        key: "scale",
        from: 1,
        to: 2.2,
        duration: 2000,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic)
      });

      glowingRing.animate({
        key: "opacity",
        from: 0.6,
        to: 0,
        duration: 2000,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic)
      });

      // Inner solid point
      container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipText: "{name}",
          fill: am5.color(0xFF7B00), // RMV Gold
          stroke: am5.color(0xffffff),
          strokeWidth: 1,
        })
      );

      return am5.Bullet.new(root, {
        sprite: container
      });
    });

    // Populate hub locations
    pointSeries.data.setAll(
      hubs.map((hub) => ({
        geometry: {
          type: "Point",
          coordinates: [hub.longitude, hub.latitude]
        },
        name: hub.name
      }))
    );

    // Create line series for curved connection paths
    let lineSeries = chart.series.push(
      am5map.MapLineSeries.new(root, {
        lineType: "curved",
        clipBack: true
      })
    );

    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0xFF7B00), // Gold stroke
      strokeWidth: 1.5,
      strokeOpacity: 0.45
    });

    // Define connection paths
    const connections = [
      // HQ Connections
      { from: "gurugram", to: "jaipur" },
      { from: "gurugram", to: "mumbai" },
      { from: "gurugram", to: "singapore" },
      { from: "gurugram", to: "london" },
      { from: "gurugram", to: "newyork" },
      { from: "gurugram", to: "dubai" },
      
      // International Network Links
      { from: "london", to: "newyork" },
      { from: "newyork", to: "sanfrancisco" },
      { from: "london", to: "frankfurt" },
      { from: "dubai", to: "london" },
      { from: "singapore", to: "tokyo" },
      { from: "singapore", to: "sydney" },
      { from: "tokyo", to: "sanfrancisco" }
    ];

    const linesData = [];
    connections.forEach((conn) => {
      const fromHub = hubs.find((h) => h.id === conn.from);
      const toHub = hubs.find((h) => h.id === conn.to);
      if (fromHub && toHub) {
        linesData.push({
          geometry: {
            type: "LineString",
            coordinates: [
              [fromHub.longitude, fromHub.latitude],
              [toHub.longitude, toHub.latitude]
            ]
          }
        });
      }
    });

    lineSeries.data.setAll(linesData);
    // -------------------------------------

    let previousPolygon;

    // Click event handler
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      // Unselect previous
      if (previousPolygon && previousPolygon !== ev.target) {
        previousPolygon.set("active", false);
      }

      // Select clicked
      if (ev.target.get("active")) {
        // If clicking already active, just unselect it and return to default zoom
        ev.target.set("active", false);
        chart.goHome();
        previousPolygon = null;
      } else {
        ev.target.set("active", true);
        previousPolygon = ev.target;

        // Center the globe on the clicked polygon
        chart.zoomToGeoPoint(ev.target.geoCentroid(), 1.5, true);
      }
    });

    // Auto-rotate behavior (skip if focusLocation is active)
    let animation;
    if (!focusLocation) {
      animation = chart.animate({
        key: "rotationX",
        from: startX,
        to: startX + 360,
        duration: 40000,
        loops: Infinity
      });
    }

    // Pause rotation on user interaction
    chart.events.on("panstarted", () => {
      if (animation) {
        animation.pause();
      }
    });

    // Make sure map doesn't scale weirdly
    chart.appear(1000, 100);

    // Cleanup function
    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, [focusLocation, initialRotation]);

  return (
    <div className={`relative ${className}`}>
      {/* Container for amCharts */}
      <div ref={chartRef} className="w-full h-full absolute inset-0 z-10" />

      {/* Background ambient glow behind the globe */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#000d24] to-[#001f54] pointer-events-none -z-10" />
    </div>
  );
}
