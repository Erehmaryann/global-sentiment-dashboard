import type React from "react";

import type { SentimentType } from "@/types";

interface ControlsProps {
  selectedSentimentType: SentimentType;
  onSentimentTypeChange: (type: SentimentType) => void;
}

const Controls = ({ selectedSentimentType, onSentimentTypeChange }: ControlsProps) => {
  return (
    <div
      style={{ padding: "16px", gap: "16px" }}
      className="flex flex-wrap items-center bg-white rounded-lg shadow-sm md:w-auto w-full">
      <div className="w-full">
        <label style={{ marginBottom: "4px" }} htmlFor="sentiment-type" className="block text-sm font-medium text-gray-700">
          Sentiment View
        </label>
        <div className="flex gap-2 flex-wrap">
          <SentimentButton
            type="overall"
            selected={selectedSentimentType === "overall"}
            onClick={() => onSentimentTypeChange("overall")}
          >
            Overall
          </SentimentButton>
          <SentimentButton
            type="positive"
            selected={selectedSentimentType === "positive"}
            onClick={() => onSentimentTypeChange("positive")}
          >
            Positive
          </SentimentButton>
          <SentimentButton
            type="neutral"
            selected={selectedSentimentType === "neutral"}
            onClick={() => onSentimentTypeChange("neutral")}
          >
            Neutral
          </SentimentButton>
          <SentimentButton
            type="negative"
            selected={selectedSentimentType === "negative"}
            onClick={() => onSentimentTypeChange("negative")}
          >
            Negative
          </SentimentButton>
        </div>
      </div>
    </div>
  );
};

interface SentimentButtonProps {
  type: SentimentType;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const SentimentButton = ({ type, selected, onClick, children }: SentimentButtonProps) => {
  const baseClasses =
    "px-3 py-1.5 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors";

  const typeClasses = {
    overall: selected ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200",
    positive: selected ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100",
    neutral: selected ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100",
    negative: selected ? "bg-red-600 text-white" : "bg-red-50 text-red-700 hover:bg-red-100",
  };

  return (
    <button style={{ padding: "0 12px" }} type="button" onClick={onClick} className={`${baseClasses} ${typeClasses[type]}`} aria-pressed={selected}>
      {children}
    </button>
  );
};

export default Controls;
