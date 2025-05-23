// Data types
export interface SentimentData {
  country: string;
  region: string;
  value: number;
  // Normalized sentiment value between -1 and 1
  sentiment: number;
  // Geographic coordinates for mapping
  latitude?: number;
  longitude?: number;
}

export interface RegionData {
  id: string;
  name: string;
  country: string;
  region?: string;
  sentiment: number;
  details?: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

// Sentiment visualization types
export type SentimentType = "overall" | "positive" | "neutral" | "negative";

// API response types
export interface ApiResponse {
  data: SentimentData[];
  error?: string;
}
