import type { RegionData } from "@/types";

interface RegionDetailsProps {
  region: RegionData;
}

const RegionDetails = ({ region }: RegionDetailsProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{region?.name}</h2>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentBadgeClass(region?.sentiment)}`}>
          {getSentimentLabel(region?.sentiment)}
        </div>
      </div>

      {region?.region && <p className="text-sm text-gray-600 mb-2">Region: {region?.region}</p>}

      <p className="text-sm text-gray-600 mb-4">Country: {region?.country}</p>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Sentiment Breakdown</h3>
        <div className="space-y-3">
          <SentimentBar
            label="Positive"
            value={region?.details?.positive || calculateSentimentPercentage(region?.sentiment, "positive")}
            color="bg-green-500"
          />
          <SentimentBar
            label="Neutral"
            value={region?.details?.neutral || calculateSentimentPercentage(region?.sentiment, "neutral")}
            color="bg-amber-400"
          />
          <SentimentBar
            label="Negative"
            value={region?.details?.negative || calculateSentimentPercentage(region?.sentiment, "negative")}
            color="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

interface SentimentBarProps {
  label: string;
  value: number;
  color: string;
}

const SentimentBar = ({ label, value, color }: SentimentBarProps) => {
  const percentage = Math.round(value * 100);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} sentiment: ${percentage}%`}
        ></div>
      </div>
    </div>
  );
};

// Helper functions
function getSentimentLabel(value: number): string {
  if (value < -0.33) return "Negative";
  if (value < 0.33) return "Neutral";
  return "Positive";
}

function getSentimentBadgeClass(value: number): string {
  if (value < -0.33) return "bg-red-100 text-red-800 px-2";
  if (value < 0.33) return "bg-amber-100 text-amber-800 px-2";
  return "bg-green-100 text-green-800 px-2";
}

function calculateSentimentPercentage(sentiment: number, type: "positive" | "neutral" | "negative"): number {
  // Convert sentiment value (-1 to 1) to percentages for each type
  const normalized = (sentiment + 1) / 2; // Convert to 0-1 range

  switch (type) {
    case "positive":
      return normalized;
    case "neutral":
      return 1 - Math.abs(2 * normalized - 1); // Peak at 0.5, decrease toward extremes
    case "negative":
      return 1 - normalized;
    default:
      return 0;
  }
}

export default RegionDetails;
