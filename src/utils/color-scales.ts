import * as am5 from "@amcharts/amcharts5";
import type { SentimentType } from "@/types";

export function createSentimentColorScale(
  root: am5.Root,
  sentimentType: SentimentType
): am5.ColorSet {
  const colorSet = am5.ColorSet.new(root, {});

  switch (sentimentType) {
    case "overall":
      // Red (negative) to Yellow (neutral) to Green (positive)
      colorSet.set("colors", [
        am5.color(0xef4444), // Red for negative
        am5.color(0xf59e0b), // Amber for neutral
        am5.color(0x10b981), // Green for positive
      ]);
      break;
    case "positive":
      // Light green to dark green
      colorSet.set("colors", [
        am5.color(0xd1fae5), // Light green
        am5.color(0x34d399), // Medium green
        am5.color(0x059669), // Dark green
      ]);
      break;
    case "neutral":
      // Light yellow to dark amber
      colorSet.set("colors", [
        am5.color(0xfef3c7), // Light yellow
        am5.color(0xfbbf24), // Medium yellow
        am5.color(0xd97706), // Dark amber
      ]);
      break;
    case "negative":
      // Light red to dark red
      colorSet.set("colors", [
        am5.color(0xfee2e2), // Light red
        am5.color(0xf87171), // Medium red
        am5.color(0xdc2626), // Dark red
      ]);
      break;
    default:
      // Default color scale
      colorSet.set("colors", [
        am5.color(0xef4444), // Red
        am5.color(0xf59e0b), // Amber
        am5.color(0x10b981), // Green
      ]);
  }

  return colorSet;
}
