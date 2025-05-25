import type { SentimentType } from "@/types";

interface LegendProps {
  sentimentType: SentimentType;
}

const Legend = ({ sentimentType }: LegendProps) => {
  const legendItems = getLegendItems(sentimentType);

  return (
    <div className="flex flex-col">
      <h2 className="text-sm font-medium mb-2">Legend</h2>
      <div
        className="flex items-center gap-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-4 h-4 mr-1 rounded" style={{ backgroundColor: item.color }} aria-hidden="true" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function getLegendItems(sentimentType: SentimentType) {
  switch (sentimentType) {
    case "overall":
      return [
        { color: "#ef4444", label: "Negative" },
        { color: "#f59e0b", label: "Neutral" },
        { color: "#10b981", label: "Positive" },
      ];
    case "positive":
      return [
        { color: "#d1fae5", label: "Low" },
        { color: "#34d399", label: "Medium" },
        { color: "#059669", label: "High" },
      ];
    case "neutral":
      return [
        { color: "#fef3c7", label: "Low" },
        { color: "#fbbf24", label: "Medium" },
        { color: "#d97706", label: "High" },
      ];
    case "negative":
      return [
        { color: "#fee2e2", label: "Low" },
        { color: "#f87171", label: "Medium" },
        { color: "#dc2626", label: "High" },
      ];
    default:
      return [
        { color: "#ef4444", label: "Negative" },
        { color: "#f59e0b", label: "Neutral" },
        { color: "#10b981", label: "Positive" },
      ];
  }
}

export default Legend;
