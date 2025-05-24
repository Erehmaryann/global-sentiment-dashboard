import Papa from "papaparse";
import type { SentimentData } from "@/types";

// const CSV_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/geo_sentiments-FL68nnKEBDceoyglxqfCrkiEgPrffT.csv";
const CSV_URL = "/geo_sentiments.csv";

export async function fetchSentimentData(): Promise<SentimentData[]> {
  try {
    const response = await fetch(CSV_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      interface CsvRow {
        Country: string;
        Region: string;
        RandomValue: string;
      }

      interface PapaParseResult {
        data: CsvRow[];
        errors: { message: string }[];
      }

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results: PapaParseResult) => {
          if (results.errors && results.errors.length > 0) {
            reject(
              new Error(`CSV parsing error: ${results.errors[0].message}`)
            );
            return;
          }

          const data = results.data.map((row: CsvRow) => ({
            country: row.Country,
            region: row.Region,
            value: Number.parseFloat(row.RandomValue) || 0,
          }));

          resolve(data as SentimentData[]);
        },
        error: (error: Error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        },
      });
    });
  } catch (error) {
    console.error("Error fetching sentiment data:", error);
    throw error;
  }
}
