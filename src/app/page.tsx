import CreatePoll from "@/components/forms/createPoll";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Poll } from "@prisma/client";
import Link from "next/link";

const getPublicPolls = async () => {
  const res = await fetch("http:localhost:3000/api/polls", {
    next: {
      tags: ["public"],
    },
  });
  const data = await res.json();
  return data;
};

export default async function Home() {
  const polls = await getPublicPolls();

  return (
    <div className="flex flex-row h-full gap-10 p-4 py-8">
      <aside className="h-full p-6 rounded-md shadow-lg w-60">
        <h4 className="mb-4 text-sm font-medium leading-none">
          Create New Poll
        </h4>
        <CreatePoll />
      </aside>

      <div className="flex-1">
        {!polls.length ? (
          <p>Display Public Polls Here</p>
        ) : (
          polls.map((poll: Poll) => (
            <Card key={poll.id} className="p-6 bg-gray-200 rounded">
              <CardTitle>{poll.title}</CardTitle>
              <CardContent>
                <Link href={`/polls/${poll.id}`}>see details</Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
