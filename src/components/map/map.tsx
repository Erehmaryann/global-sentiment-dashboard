import { useRef, useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import type { SentimentData, SentimentType, RegionData } from "@/types";
import { createSentimentColorScale } from "@/utils/color-scales";
import { processMapData } from "@/utils/data-processing";

interface MapProps {
  data: SentimentData[];
  sentimentType: SentimentType;
  onRegionClick: (region: RegionData | null) => void;
  onRegionHover: (region: RegionData | null) => void;
}

const Map = ({ data, sentimentType, onRegionClick, onRegionHover }: MapProps) => {
  const chartRef = useRef<am5.Root | null>(null);
  const chartDivRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the map
  useEffect(() => {
    // Clean up function to dispose of the chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, []);

  // Create and configure the map
  useEffect(() => {
    if (!chartDivRef.current) return;

    // Only initialize the chart once
    if (!chartRef.current) {
      // Create root element
      const root = am5.Root.new(chartDivRef.current);

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create the map chart
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "rotateY",
          projection: am5map.geoMercator(),
          maxZoomLevel: 30,
        }),
      );

      // Create polygon series for the world map
      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"], // Exclude Antarctica
          fill: am5.color(0xdddddd),
          stroke: am5.color(0xffffff),
          calculateAggregates: true,
          tooltipText: "{name}",
          interactive: true,
        }),
      );

      // Configure polygon series
      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        toggleKey: "active",
        interactive: true,
        cursorOverStyle: "pointer",
      });

      // Add zoom control
      chart.set(
        "zoomControl",
        am5map.ZoomControl.new(root, {
          x: 10,
          y: 10,
        }),
      );

      // Configure zoom behavior for performance
      chart.set("zoomStep", 1.5);
      chart.set("zoomLevel", 1);
      chart.set("maxZoomLevel", 32);

      // Add click and hover events
      polygonSeries.mapPolygons.template.events.on("click", (ev) => {
        const dataItem = ev.target.dataItem;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = dataItem?.dataContext as any;

        if (data) {
          onRegionClick({
            id: data.id,
            name: data.name,
            country: data.country || data.name,
            region: data.region,
            sentiment: data.value,
            details: data.details,
          });
        }
      });

      polygonSeries.mapPolygons.template.events.on("pointerover", (ev) => {
        const dataItem = ev.target.dataItem;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = dataItem?.dataContext as any;

        if (data) {
          onRegionHover({
            id: data.id,
            name: data.name,
            country: data.country || data.name,
            region: data.region,
            sentiment: data.value,
            details: data.details,
          });
        }
      });

      polygonSeries.mapPolygons.template.events.on("pointerout", () => {
        onRegionHover(null);
      });

      // Store references
      chartRef.current = root;

      // Set initialization flag
      setIsInitialized(true);
    }
  }, [onRegionClick, onRegionHover]);

  // Update the map data when data or sentiment type changes
  useEffect(() => {
    if (!chartRef.current || !isInitialized || !data.length) return;

    const root = chartRef.current;
    const chart = root.container.children.getIndex(0) as am5map.MapChart;
    const polygonSeries = chart.series.getIndex(0) as am5map.MapPolygonSeries;

    // Process data based on sentiment type
    const processedData = processMapData(data, sentimentType);

    // Create color scale based on sentiment type
    const colorScale = createSentimentColorScale(root, sentimentType);

    // Update polygon series with new data
    polygonSeries.data.setAll(processedData);

    // Update polygon colors based on data values
    polygonSeries.mapPolygons.template.set("fill", am5.color(0xdddddd));

    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataContext = target.dataItem?.dataContext as any;
      if (dataContext && dataContext.value !== undefined) {
        return colorScale.getIndex(dataContext.value);
      }
      return fill;
    });

    // Force redraw
    polygonSeries.appear(1000, 100);
  }, [data, sentimentType, isInitialized]);

  return (
    <div
      ref={chartDivRef}
      className="map-container w-full h-full"
      role="region"
      aria-label="Interactive sentiment map"
    />
  );
};

export default Map;
