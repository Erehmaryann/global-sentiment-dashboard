import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div
      className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure your dashboard preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings and configuration options would be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
