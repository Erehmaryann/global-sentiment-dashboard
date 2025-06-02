import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/map/map";
import Legend from "@/components/legend/legend";
import Controls from "@/components/controls/controls";
import RegionDetails from "@/components/region-details";
import { StatsCards } from "@/components/dashboard/stats-card";
import { useSentimentData } from "@/hooks/use-sentiment-data";
import type { SentimentType, RegionData } from "@/types";

export default function Overview() {
  const { data, loading, error } = useSentimentData();
  const [selectedSentimentType, setSelectedSentimentType] = useState<SentimentType>("overall");
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);

  // Reset selected region when sentiment type changes
  useEffect(() => {
    setSelectedRegion(null);
  }, [selectedSentimentType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg">Loading sentiment data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-4">
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Data</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div
      className="w-full space-y-5">
      {/* Stats Overview */}
      <StatsCards data={data} />

      {/* Main Dashboard */}
      <div className="grid gap-4 md:grid-cols-4 w-full">
        <div className="md:col-span-3 w-full">
          <Card>
            <CardHeader>
              <div className="flex w-full md:flex-row flex-col gap-3 items-center justify-between">
                <div className="md:w-auto w-full">
                  <CardTitle>Global Sentiment Map</CardTitle>
                  <CardDescription>Interactive visualization of sentiment data across countries</CardDescription>
                </div>
                <Controls
                  selectedSentimentType={selectedSentimentType}
                  onSentimentTypeChange={setSelectedSentimentType}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full">
                <Map
                  data={data}
                  sentimentType={selectedSentimentType}
                  onRegionClick={setSelectedRegion}
                  onRegionHover={setHoveredRegion}
                />
              </div>
              <div className="mt-4">
                <Legend sentimentType={selectedSentimentType} />
                {hoveredRegion && !selectedRegion && (
                  <div className="mt-2 p-2 border-t border-gray-200">
                    <h3 className="font-medium">{hoveredRegion.name}</h3>
                    <p className="text-sm text-gray-600">
                      {hoveredRegion.region ? `${hoveredRegion.region}, ` : ""}
                      {hoveredRegion.country}
                    </p>
                    <p className="text-sm">
                      Sentiment:{" "}
                      <span className={`font-medium ${getSentimentColorClass(hoveredRegion.sentiment)}`}>
                        {getSentimentLabel(hoveredRegion.sentiment)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Region Details Sidebar */}
        <div className="md:col-span-1">
          {selectedRegion ? (
            <Card>
              <CardHeader>
                <CardTitle>Region Details</CardTitle>
                <CardDescription>Detailed sentiment analysis</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <RegionDetails region={selectedRegion} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Region Details</CardTitle>
                <CardDescription>Click on a region to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Select a country or region on the map to view detailed sentiment analysis and statistics.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Additional Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.length}</div>
                <p className="text-xs text-muted-foreground">Across all countries</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((data.filter((d) => d.sentiment > 0.33).length / data.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Of all regions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Neutral Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  {Math.round(
                    (data.filter((d) => d.sentiment >= -0.33 && d.sentiment <= 0.33).length / data.length) * 100,
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Of all regions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Negative Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {Math.round((data.filter((d) => d.sentiment < -0.33).length / data.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Of all regions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trends</CardTitle>
              <CardDescription>Historical sentiment analysis would be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trend analysis features would be implemented here with time-series data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Automated insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI-powered insights and recommendations would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper functions
function getSentimentLabel(value: number): string {
  if (value < -0.33) return "Negative";
  if (value < 0.33) return "Neutral";
  return "Positive";
}

function getSentimentColorClass(value: number): string {
  if (value < -0.33) return "text-red-600";
  if (value < 0.33) return "text-amber-500";
  return "text-green-600";
}
