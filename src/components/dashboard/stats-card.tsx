import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Globe } from "lucide-react";
import type { SentimentData } from "@/types";

interface StatsCardsProps {
  data: SentimentData[];
}

export function StatsCards({ data }: StatsCardsProps) {
  const totalRegions = data.length;
  const positiveCount = data.filter((d) => d.sentiment > 0.33).length;
  const negativeCount = data.filter((d) => d.sentiment < -0.33).length;
  // const neutralCount = totalRegions - positiveCount - negativeCount;

  const averageSentiment = data.reduce((sum, d) => sum + d.sentiment, 0) / totalRegions;
  const positivePercentage = (positiveCount / totalRegions) * 100;
  const negativePercentage = (negativeCount / totalRegions) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRegions}</div>
          <p className="text-xs text-muted-foreground">Across all countries</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Sentiment</CardTitle>
          {averageSentiment > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${averageSentiment > 0 ? "text-green-600" : "text-red-600"}`}>
            {averageSentiment > 0 ? "+" : ""}
            {(averageSentiment * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">{averageSentiment > 0 ? "Positive trend" : "Negative trend"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Positive Regions</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{positivePercentage.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {positiveCount} of {totalRegions} regions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Negative Regions</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{negativePercentage.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {negativeCount} of {totalRegions} regions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
