import CreatePoll from "@/components/forms/createPoll";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-8">
      <Card className="w-full max-w-xl mx-auto rounded">
        <CardHeader>
          <CardTitle>Create New Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <CreatePoll />
        </CardContent>
      </Card>
    </div>
  );
}
