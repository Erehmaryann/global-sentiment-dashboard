import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div
      style={{ margin: "20px 0px" }}
      className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>Generate and export sentiment reports</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Report generation and export features would be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
