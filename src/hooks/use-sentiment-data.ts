import { useState, useEffect } from "react";
import type { SentimentData } from "@/types";
import { fetchSentimentData } from "@/services/api";
import { normalizeSentimentData } from "@/utils/data-processing";

export function useSentimentData() {
  const [data, setData] = useState<SentimentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const rawData = await fetchSentimentData();
        const normalizedData = normalizeSentimentData(rawData);
        setData(normalizedData);
        setError(null);
      } catch (err) {
        console.error("Error loading sentiment data:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load sentiment data")
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading, error };
}
